
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StaticSection from './components/StaticSection';
import PricingSection from './components/PricingSection';
import TotalBar from './components/TotalBar';
import TermsAndConditions from './components/TermsAndConditions';
import CouponSection from './components/CouponSection';
import SummaryBreakdown from './components/SummaryBreakdown';
import InteractivePresentation from './components/InteractivePresentation';
import FAQSection from './components/FAQSection';
import ProposalProgressBar from './components/ProposalProgressBar';
import SecurityGuard from './components/SecurityGuard';
import ClientFeedbackSection from './components/ClientFeedbackSection';
import { getServiceCategories, getUnitPrice } from './constants';
import { translations } from './i18n';
import type { ServiceOption, ServiceCategory } from './types';
import PrintHeader from './components/PrintHeader';
import SuccessScreen from './components/SuccessScreen';
import DiscountCelebration from './components/DiscountCelebration';
import { isEmailConfigured, sendProposalEmails } from './email';
import { formatCurrency } from './utils/format';
import { 
  getSavedSelectionState, 
  saveSelectionState, 
  clearSavedSelectionState 
} from './utils/selectionStorage';

const URL_PARAMS = new URLSearchParams(window.location.search);
const IS_CLIENT_MODE = URL_PARAMS.get('mode') === 'client' && URL_PARAMS.has('services');
const CLIENT_SERVICE_IDS = (URL_PARAMS.get('services') || '').split(',').filter(Boolean);

interface ClientInfo {
  name: string;
  phone: string;
  email: string;
  countryCode: string;
}

function getInitialLanguage() {
    const savedLang = localStorage.getItem('language');
    if (savedLang === 'en' || savedLang === 'ar') {
        return savedLang;
    }
    return 'ar';
}

function getInitialTheme(): 'light' | 'dark' {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
    }
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

function getInitialClientInfo(): ClientInfo {
    return {
        name: URL_PARAMS.get('name') || '',
        phone: URL_PARAMS.get('phone') || '',
        email: URL_PARAMS.get('email') || '',
        countryCode: URL_PARAMS.get('countryCode') || '+966',
    };
}

function App() {
  const [language, setLanguage] = useState<'ar' | 'en'>(getInitialLanguage());
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  const [isClientMode] = useState(IS_CLIENT_MODE);
  const [clientInfo, setClientInfo] = useState<ClientInfo>(getInitialClientInfo);
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (IS_CLIENT_MODE) {
      return CLIENT_SERVICE_IDS;
    }
    const saved = getSavedSelectionState();
    return saved?.selectedIds || [];
  });
  const [quantities, setQuantities] = useState<{ [id: string]: number }>(() => {
    if (IS_CLIENT_MODE) {
      return {};
    }
    const saved = getSavedSelectionState();
    return saved?.quantities || {};
  });
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(() => {
    if (IS_CLIENT_MODE) {
      return null;
    }
    const saved = getSavedSelectionState();
    return saved?.appliedCoupon || null;
  });
  const [hasRestoredSession, setHasRestoredSession] = useState<boolean>(() => {
    if (IS_CLIENT_MODE) return false;
    const saved = getSavedSelectionState();
    return Boolean(saved && saved.selectedIds && saved.selectedIds.length > 0);
  });
  const [actionType, setActionType] = useState<string | null>(null);
  const [proposalDate] = useState(new Date());
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const prevDiscountPercentageRef = useRef(0);

  const t = useMemo(() => translations[language], [language]);
  const serviceCategories = useMemo(() => {
    const allCategories = getServiceCategories(language);
    return allCategories;
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.classList.remove('lang-en', 'lang-ar');
    document.documentElement.classList.add(`lang-${language}`);
  }, [language]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Auto-save selection and quantities state to localStorage
  useEffect(() => {
    if (!isClientMode) {
      if (selectedIds.length > 0 || Object.keys(quantities).length > 0 || appliedCoupon) {
        saveSelectionState(selectedIds, quantities, appliedCoupon);
      } else {
        clearSavedSelectionState();
      }
    }
  }, [selectedIds, quantities, appliedCoupon, isClientMode]);
  
  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };
  
  const validateEmail = (email: string) => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(t.emailError);
    } else {
      setEmailError('');
    }
  };

  const handleClientInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClientInfo(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError('');
    if (name === 'email') {
      validateEmail(value);
    }
  };

  const handleServiceToggle = (optionId: string, category: ServiceCategory) => {
    setSelectedIds(prevIds => {
      let newIds = [...prevIds];
      const isSelected = newIds.includes(optionId);

      if (category.isRadio) {
        category.options.forEach(opt => {
          const index = newIds.indexOf(opt.id);
          if (index > -1) newIds.splice(index, 1);
        });
        if (!isSelected) {
          newIds.push(optionId);
        }
      } else if (category.isPhased) {
        const selectedOptionIndex = category.options.findIndex(o => o.id === optionId);
        category.options.forEach(opt => {
          const index = newIds.indexOf(opt.id);
          if (index > -1) newIds.splice(index, 1);
        });
        if (!isSelected) {
          for (let i = 0; i <= selectedOptionIndex; i++) {
            newIds.push(category.options[i].id);
          }
        }
      } else {
        if (isSelected) {
          newIds = newIds.filter(id => id !== optionId);
        } else {
          newIds.push(optionId);
        }
      }
      return newIds;
    });
  };

  const handleQuantityChange = (optionId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantities(prev => ({ ...prev, [optionId]: newQuantity }));
    }
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
    setQuantities({});
    setAppliedCoupon(null);
    clearSavedSelectionState();
    setHasRestoredSession(false);
  };

  const selectedOptions = useMemo(() => {
    const allOptions = serviceCategories.flatMap(c => c.options);
    return allOptions.filter(o => selectedIds.includes(o.id));
  }, [selectedIds, serviceCategories]);

  const getOptionHierarchy = (optionId: string) => {
    for (let i = 0; i < serviceCategories.length; i++) {
        const cat = serviceCategories[i];
        const optIdx = cat.options.findIndex(o => o.id === optionId);
        if (optIdx !== -1) {
            return `${i + 1}.${optIdx + 1}`;
        }
    }
    return '';
  };

  const subTotalPrice = useMemo(() => {
    return selectedOptions.reduce((total, option) => {
      const quantity = option.hasQuantity ? (quantities[option.id] || 1) : 1;
      const unitPrice = getUnitPrice(option, quantity);
      return total + (unitPrice * quantity);
    }, 0);
  }, [selectedOptions, quantities]);

  const activeCategoriesCount = useMemo(() => {
    return serviceCategories.filter(category =>
      category.options.some(option => selectedIds.includes(option.id))
    ).length;
  }, [selectedIds, serviceCategories]);

  const discountPercentage = useMemo(() => {
    // Logic: 5% discount for each active category
    const basePercentage = activeCategoriesCount * 5;
    
    // Combine calculated base + coupon
    const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;

    return Math.min(100, basePercentage + couponDiscount);
  }, [activeCategoriesCount, appliedCoupon]);

  const discount = useMemo(() => (subTotalPrice * discountPercentage) / 100, [subTotalPrice, discountPercentage]);
  const finalTotalPrice = useMemo(() => subTotalPrice - discount, [subTotalPrice, discountPercentage]);
  
  useEffect(() => {
    if (discountPercentage > prevDiscountPercentageRef.current) {
        setShowCelebration(true);
    }
    prevDiscountPercentageRef.current = discountPercentage;
  }, [discountPercentage]);

  const validateInfo = useCallback(() => {
    const { name, phone, email } = clientInfo;
    const isEmailValid = email && !emailError;
    if (!name || !phone || !isEmailValid) {
      setFormError(t.fillInfoAlert);
      return false;
    }
    setFormError('');
    return true;
  }, [clientInfo, emailError, t.fillInfoAlert]);
  
  const handleSendViaWhatsApp = () => {
    setFormError('');
    if (!validateInfo()) return;

    const formattedDate = proposalDate.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const fullPhoneNumber = `${clientInfo.countryCode}${clientInfo.phone}`;

    const servicesText = selectedOptions.map(option => {
        const quantity = option.hasQuantity ? (quantities[option.id] || 1) : 1;
        const unitPrice = getUnitPrice(option, quantity);
        const price = unitPrice * quantity;
        const quantityText = option.hasQuantity ? ` (${quantity} × ${formatCurrency(unitPrice)})` : '';
        const hierarchy = getOptionHierarchy(option.id);
        return `${hierarchy} - ${option.name}${quantityText}: *${formatCurrency(price)}*`;
    }).join('\n');

    const couponInfo = appliedCoupon ? `\n*الكوبون المطبق:* ${appliedCoupon.code} (${appliedCoupon.discount}% خصم إضافي)` : '';

    const message = `
*${t.proposalTitle}*

*${t.clientInfoTitle}:*
${t.clientNameLabel}: ${clientInfo.name}
${t.clientPhoneLabel}: ${fullPhoneNumber}
${t.clientEmailLabel}: ${clientInfo.email}
${t.proposalDateLabel}: ${formattedDate}

*${t.selectedServicesTitle}:*
${servicesText}
${couponInfo}

*${t.priceSummaryTitle}:*
${t.subtotal}: ${formatCurrency(subTotalPrice)}
${language === 'en' ? t.discountLabel(discountPercentage) : `خصم (${discountPercentage}%)`}: -${formatCurrency(discount)}
*${t.totalPrice}: ${formatCurrency(finalTotalPrice)}*

${t.proposalTo(clientInfo.name)}
    `.trim().replace(/^\s+/gm, "");

    const whatsappNumber = '+905342006606';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};

  const handleSubmission = () => {
    setFormError('');
    if (!validateInfo() || actionType) return;
    
    if (!isEmailConfigured()) {
        setFormError(t.emailConfigMissing);
        return;
    }

    setActionType('email');

    sendProposalEmails({
      clientInfo,
      selectedOptions,
      quantities,
      subTotalPrice,
      discount,
      discountPercentage,
      finalTotalPrice,
      isClientSubmission: true,
      t,
      selectedIds,
      proposalDate
    })
      .then((response) => {
        setShowSuccessScreen(true);
        setActionType(null);
      }, (err) => {
        setFormError(t.emailSendError);
        setActionType(null);
      });
  };

  const handleNavigateToCategory = (categoryId: string, optionId?: string) => {
    const targetElement = optionId ? document.getElementById(optionId) : document.getElementById(categoryId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (optionId) {
        targetElement.classList.add('ring-4', 'ring-blue-500', 'shadow-2xl');
        setTimeout(() => {
          targetElement.classList.remove('ring-4', 'ring-blue-500', 'shadow-2xl');
        }, 3000);
      }
    }
  };

  return (
    <div className="bg-transparent min-h-screen">
      <SecurityGuard language={language} />
      <Header 
        language={language}
        toggleLanguage={toggleLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <ProposalProgressBar
        selectedCount={selectedIds.length}
        activeCategoriesCount={activeCategoriesCount}
        totalCategoriesCount={serviceCategories.length}
        discountPercentage={discountPercentage}
        finalTotalPrice={finalTotalPrice}
        language={language}
      />
      <PrintHeader />
      <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 print:p-0 print:mx-0 print:max-w-full">
        {hasRestoredSession && selectedIds.length > 0 && (
          <div 
            className="bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-2xl p-3.5 flex items-center justify-between text-xs text-blue-900 dark:text-blue-200 shadow-xs transition-all print:hidden"
            style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
              <span className="font-semibold">
                {language === 'ar'
                  ? `تمت استعادة اختياراتك السابقة تلقائياً (${selectedIds.length} خدمة محددة مع الكميات)`
                  : `Your previous proposal selection was restored (${selectedIds.length} services & quantities)`}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleClearSelection}
                className="text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 text-[11px] underline cursor-pointer"
              >
                {language === 'ar' ? 'بدء اختيار جديد' : 'Clear & Start Fresh'}
              </button>
              <button
                type="button"
                onClick={() => setHasRestoredSession(false)}
                className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/60 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-100 font-bold text-[11px] transition-colors cursor-pointer"
              >
                {language === 'ar' ? 'متابعة' : 'Dismiss'}
              </button>
            </div>
          </div>
        )}

        <StaticSection 
          t={t}
          language={language}
          clientInfo={clientInfo}
          onClientInfoChange={handleClientInfoChange}
          emailError={emailError}
          proposalDate={proposalDate}
          isClientMode={false}
          categories={serviceCategories}
        />

        <InteractivePresentation
          language={language}
          onNavigateToCategory={handleNavigateToCategory}
          onApplyCoupon={setAppliedCoupon}
        />
        
        <PricingSection
          categories={serviceCategories}
          selectedIds={selectedIds}
          onServiceToggle={handleServiceToggle}
          quantities={quantities}
          onQuantityChange={handleQuantityChange}
          language={language}
          t={t}
          isClientMode={false}
        />

        <CouponSection 
          t={t}
          language={language}
          onApply={setAppliedCoupon}
          appliedCoupon={appliedCoupon}
        />

        <SummaryBreakdown
          selectedOptions={selectedOptions}
          quantities={quantities}
          categories={serviceCategories}
          subTotalPrice={subTotalPrice}
          discount={discount}
          discountPercentage={discountPercentage}
          appliedCoupon={appliedCoupon}
          finalTotalPrice={finalTotalPrice}
          language={language}
          t={t}
          onServiceToggle={handleServiceToggle}
          onQuantityChange={handleQuantityChange}
        />

        <ClientFeedbackSection
          language={language}
          defaultClientName={clientInfo.name}
          defaultClientEmail={clientInfo.email}
          selectedServicesSummary={selectedOptions.map(o => o.name).slice(0, 3).join('، ')}
        />

        <FAQSection language={language} />

        <TermsAndConditions t={t} language={language} />
      </main>
      <Footer language={language} />
      <TotalBar
        subTotalPrice={subTotalPrice}
        finalTotalPrice={finalTotalPrice}
        discount={discount}
        discountPercentage={discountPercentage}
        onSendEmail={isClientMode ? handleSubmission : handleSendViaWhatsApp}
        onClearSelection={handleClearSelection}
        language={language}
        t={t}
        actionType={actionType}
        formError={formError}
        isClientMode={isClientMode}
      />
      {showSuccessScreen && (
        <SuccessScreen 
            t={t}
            isClientMode={isClientMode}
            onClose={() => setShowSuccessScreen(false)}
            onOpenFeedback={() => {
              const el = document.getElementById('client-feedback-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
        />
      )}
      {showCelebration && (
        <DiscountCelebration 
            t={t}
            discountPercentage={discountPercentage}
            savedAmount={discount}
            onClose={() => setShowCelebration(false)}
        />
      )}
    </div>
  );
}

export default App;
