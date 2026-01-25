
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StaticSection from './components/StaticSection';
import PricingSection from './components/PricingSection';
import TotalBar from './components/TotalBar';
import TermsAndConditions from './components/TermsAndConditions';
import CouponSection from './components/CouponSection';
import { getServiceCategories, getUnitPrice } from './constants';
import { translations } from './i18n';
import type { ServiceOption, ServiceCategory } from './types';
import PrintHeader from './components/PrintHeader';
import SuccessScreen from './components/SuccessScreen';
import DiscountCelebration from './components/DiscountCelebration';
import { isEmailConfigured, sendProposalEmails } from './email';
import { formatCurrency } from './utils/format';

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
  const [isClientMode] = useState(IS_CLIENT_MODE);
  const [clientInfo, setClientInfo] = useState<ClientInfo>(getInitialClientInfo);
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (IS_CLIENT_MODE) {
      return CLIENT_SERVICE_IDS;
    }
    return [];
  });
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
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
  
  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
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

  const discountPercentage = useMemo(() => {
    // Logic: 5% discount for each active category
    let basePercentage = 0;
    
    serviceCategories.forEach(category => {
        // Check if any option in this category is currently selected
        const isCategoryActive = category.options.some(option => selectedIds.includes(option.id));
        if (isCategoryActive) {
            basePercentage += 5;
        }
    });
    
    // Combine calculated base + coupon
    const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;

    return Math.min(100, basePercentage + couponDiscount);
  }, [selectedIds, serviceCategories, appliedCoupon]);

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

  return (
    <div className="bg-transparent min-h-screen">
      <Header 
        language={language}
        toggleLanguage={toggleLanguage}
      />
      <PrintHeader />
      <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 print:p-0 print:mx-0 print:max-w-full">
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
