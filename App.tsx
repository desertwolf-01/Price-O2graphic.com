import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StaticSection from './components/StaticSection';
import PricingSection from './components/PricingSection';
import TotalBar from './components/TotalBar';
import TermsAndConditions from './components/TermsAndConditions';
import { getServiceCategories } from './constants';
import { translations } from './i18n';
import type { ServiceOption, ServiceCategory } from './types';
import PrintHeader from './components/PrintHeader';
import SuccessScreen from './components/SuccessScreen';
import { isEmailConfigured, sendProposalEmails } from './email';

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
    if (IS_CLIENT_MODE) {
        return {
            name: URL_PARAMS.get('name') || '',
            phone: URL_PARAMS.get('phone') || '',
            email: URL_PARAMS.get('email') || '',
            countryCode: URL_PARAMS.get('countryCode') || '+90',
        };
    }
    return { name: '', phone: '', email: '', countryCode: '+90' };
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
  const [actionType, setActionType] = useState<string | null>(null);
  const [proposalDate] = useState(new Date());
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const t = useMemo(() => translations[language], [language]);
  const serviceCategories = useMemo(() => {
    const allCategories = getServiceCategories(language);
    if (isClientMode && CLIENT_SERVICE_IDS.length > 0) {
      const clientCategories = allCategories
        .map(category => ({
          ...category,
          options: category.options.filter(option => CLIENT_SERVICE_IDS.includes(option.id)),
        }))
        .filter(category => category.options.length > 0);
      return clientCategories;
    }
    return allCategories;
  }, [language, isClientMode]);

  // Language side effect
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
        // Deselect all options in this category first
        category.options.forEach(opt => {
          const index = newIds.indexOf(opt.id);
          if (index > -1) newIds.splice(index, 1);
        });
        // Then select the new one if it wasn't selected
        if (!isSelected) {
          newIds.push(optionId);
        }
      } else if (category.isPhased) {
        const selectedOptionIndex = category.options.findIndex(o => o.id === optionId);
        
        // First, clear all selections in this category
        category.options.forEach(opt => {
          const index = newIds.indexOf(opt.id);
          if (index > -1) newIds.splice(index, 1);
        });
        
        // If it was not currently selected, select it and all previous phases.
        // If it was selected, it is now deselected (cleared above).
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
    if (isClientMode) return;
    setSelectedIds([]);
    setQuantities({});
  };

  const selectedOptions = useMemo(() => {
    const allOptions = serviceCategories.flatMap(c => c.options);
    return allOptions.filter(o => selectedIds.includes(o.id));
  }, [selectedIds, serviceCategories]);

  const subTotalPrice = useMemo(() => {
    return selectedOptions.reduce((total, option) => {
      const quantity = !isClientMode && option.hasQuantity ? (quantities[option.id] || 1) : 1;
      return total + (option.price * quantity);
    }, 0);
  }, [selectedOptions, quantities, isClientMode]);

  const discountPercentage = useMemo(() => {
    if (isClientMode) return 0; // No discounts in client mode
    
    // Tiered discount based on number of items
    let basePercentage = 0;
    const count = selectedIds.length;
    if (count >= 10) {
      basePercentage = 30;
    } else if (count >= 8) {
      basePercentage = 20;
    } else if (count >= 4) {
      basePercentage = 10;
    }

    // Additional discount for high total price
    let bonusPercentage = 0;
    if (subTotalPrice > 5000) {
      bonusPercentage = 5;
    }

    return basePercentage + bonusPercentage;
  }, [selectedIds.length, isClientMode, subTotalPrice]);


  const discount = useMemo(() => (subTotalPrice * discountPercentage) / 100, [subTotalPrice, discountPercentage]);
  const finalTotalPrice = useMemo(() => subTotalPrice - discount, [subTotalPrice, discountPercentage]);
  
  const validateAdminInfo = useCallback(() => {
    const { name, phone, email } = clientInfo;
    const isEmailValid = email && !emailError;
    if (!name || !phone || !isEmailValid) {
      setFormError(t.fillInfoAlert);
      return false;
    }
    setFormError('');
    return true;
  }, [clientInfo, emailError, t.fillInfoAlert]);

  const validateClientInfo = useCallback(() => {
      const { name, phone, email } = clientInfo;
      const isEmailValid = email && !emailError;
      if (!name || !phone || !isEmailValid) {
        setFormError(t.fillInfoAlertClient);
        return false;
      }
      setFormError('');
      return true;
  }, [clientInfo, emailError, t.fillInfoAlertClient]);
  
  const handleSendViaWhatsApp = () => {
    setFormError('');
    if (!validateAdminInfo()) return;

    // 1. Format the message
    const formatPrice = (price: number) => `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const fullPhoneNumber = `${clientInfo.countryCode}${clientInfo.phone}`;

    const servicesText = selectedOptions.map(option => {
        const quantity = option.hasQuantity ? (quantities[option.id] || 1) : 1;
        const price = option.price * quantity;
        const quantityText = option.hasQuantity ? ` (${quantity} × ${formatPrice(option.price).replace('$', '')})` : '';
        return `- ${option.name}${quantityText}: *${formatPrice(price)}*`;
    }).join('\n');

    const message = `
*${t.proposalTitle}*

*${t.clientInfoTitle}:*
${t.clientNameLabel}: ${clientInfo.name}
${t.clientPhoneLabel}: ${fullPhoneNumber}
${t.clientEmailLabel}: ${clientInfo.email}

*${t.selectedServicesTitle}:*
${servicesText}

*${t.priceSummaryTitle}:*
${t.subtotal}: ${formatPrice(subTotalPrice)}
${language === 'en' ? t.discountLabel(discountPercentage) : `خصم (${discountPercentage}%)`}: -${formatPrice(discount)}
*${t.totalPrice}: ${formatPrice(finalTotalPrice)}*

${t.proposalTo(clientInfo.name)}
    `.trim().replace(/^\s+/gm, "");

    // 2. Construct WhatsApp URL and open it
    const whatsappNumber = '+905342006606';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};


  const handleClientSubmission = () => {
    setFormError('');
    if (!validateClientInfo() || actionType) return;
    
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
      selectedIds
    })
      .then((response) => {
        console.log('SUCCESS! Both emails sent on client submission.', response);
        setShowSuccessScreen(true);
        setActionType(null);
      }, (err) => {
        console.error('FAILED... EmailJS Error on client submission:', err);
        let userMessage = t.emailSendError;
        if (err && typeof err.status === 'number') {
            if (err.status === 400) {
                userMessage = t.emailSendErrorConfig;
            } else if (err.status === 0) {
                userMessage = t.emailSendErrorNetwork;
            }
        }
        setFormError(userMessage);
        setActionType(null);
      });
  };

  const handleCloseSuccessScreen = () => {
    setShowSuccessScreen(false);
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
          isClientMode={isClientMode}
        />
        <PricingSection
          categories={serviceCategories}
          selectedIds={selectedIds}
          onServiceToggle={handleServiceToggle}
          quantities={quantities}
          onQuantityChange={handleQuantityChange}
          language={language}
          t={t}
          isClientMode={isClientMode}
        />
        <TermsAndConditions t={t} language={language} />
      </main>
      <Footer />
      <TotalBar
        subTotalPrice={subTotalPrice}
        finalTotalPrice={finalTotalPrice}
        discount={discount}
        discountPercentage={discountPercentage}
        onSendEmail={isClientMode ? handleClientSubmission : handleSendViaWhatsApp}
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
            onClose={handleCloseSuccessScreen}
        />
      )}
    </div>
  );
}

export default App;