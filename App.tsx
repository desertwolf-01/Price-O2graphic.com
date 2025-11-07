// في البداية
const CLIENT_SERVICE_IDS = (URL_PARAMS.get('services') || '').split(',').filter(Boolean);
const ALL_SERVICES_KEYWORD = 'all';

// في useMemo serviceCategories
const serviceCategories = useMemo(() => {
  const allCategories = getServiceCategories(language);
  if (isClientMode && CLIENT_SERVICE_IDS.length > 0) {
    if (CLIENT_SERVICE_IDS.includes(ALL_SERVICES_KEYWORD)) {
      // إذا كان 'all' في القائمة، أظهر كل الخدمات
      return allCategories;
    }
    // ... الكود الأصلي ...
  }
  // ... الكود الأصلي ...
}, [language, isClientMode]);
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import * as emailjs from '@emailjs/browser';
import Header from './components/Header';
import Footer from './components/Footer';
import StaticSection from './components/StaticSection';
import PricingSection from './components/PricingSection';
import TotalBar from './components/TotalBar';
import TermsAndConditions from './components/TermsAndConditions';
import { getServiceCategories } from './constants';
import { translations } from './i18n';
import type { ServiceOption, ServiceCategory } from './types';
import { EMAILJS_CONFIG } from './config';
import PrintHeader from './components/PrintHeader';
import AnimatedSection from './components/AnimatedSection';

const URL_PARAMS = new URLSearchParams(window.location.search);
const IS_CLIENT_MODE = URL_PARAMS.get('mode') === 'client' && URL_PARAMS.has('services');
const CLIENT_SERVICE_IDS = (URL_PARAMS.get('services') || '').split(',').filter(Boolean);

function getInitialLanguage() {
    const savedLang = localStorage.getItem('language');
    if (savedLang === 'en' || savedLang === 'ar') {
        return savedLang;
    }
    return 'ar';
}

function getInitialClientInfo() {
    if (IS_CLIENT_MODE) {
        return {
            name: URL_PARAMS.get('name') || '',
            phone: URL_PARAMS.get('phone') || '',
            email: URL_PARAMS.get('email') || '',
        };
    }
    return { name: '', phone: '', email: '' };
}


function App() {
  const [language, setLanguage] = useState<'ar' | 'en'>(getInitialLanguage());
  const [isClientMode] = useState(IS_CLIENT_MODE);
  const [clientInfo, setClientInfo] = useState(getInitialClientInfo);
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

  const handleClientInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const finalTotalPrice = useMemo(() => subTotalPrice - discount, [subTotalPrice, discount]);
  
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
  
  const handleSendEmail = () => {
    if (!validateAdminInfo() || actionType) return;
    setActionType('email');

    const servicesText = selectedOptions.map(option => 
        `- ${option.name}: $${(option.price * (option.hasQuantity ? quantities[option.id] || 1 : 1)).toLocaleString()}`
    ).join('\n');

    const summaryText = `
${t.subtotal}: $${subTotalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
${discount > 0 ? `${t.discountLabel(discountPercentage)}: -$${discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ''}
${t.finalTotal}: $${finalTotalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    `;

    const body = `
${t.emailGreeting(clientInfo.name || t.newClient)}

${t.emailIntro}

---
${t.emailServicesHeader}
---
${servicesText}

---
${t.emailSummaryHeader}
---
${summaryText}

---
${t.emailClientHeader}
---
${t.clientNameLabel}: ${clientInfo.name}
${t.clientPhoneLabel}: ${clientInfo.phone}
${t.clientEmailLabel}: ${clientInfo.email}


${t.emailClosing},
${t.emailTeam}
    `;

    const subject = encodeURIComponent(t.emailSubject(clientInfo.name || t.newClient));
    const mailtoLink = `mailto:${clientInfo.email}?subject=${subject}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
    
    setTimeout(() => {
      setActionType(null);
      alert(t.successMessageEmail);
    }, 500);
  };

  const handleClientSubmission = () => {
    if (!validateClientInfo() || actionType) return;

    if (EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' || EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        console.error("EmailJS credentials are not set! Please update them in config.ts.");
        alert(t.emailSendErrorConfig);
        return;
    }

    setActionType('email');

    const servicesText = selectedOptions.map(option => 
        `- ${option.name}: $${option.price.toLocaleString()}`
    ).join('\n');

    const summaryText = `
Subtotal: $${subTotalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Final Total: $${finalTotalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    `;

    const templateParams = {
        client_name: clientInfo.name,
        client_email: clientInfo.email,
        client_phone: clientInfo.phone,
        selected_services: servicesText,
        price_summary: summaryText,
        final_total: `$${finalTotalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    };

    emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams, EMAILJS_CONFIG.PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert(t.successMessageClient);
        setActionType(null);
      }, (err) => {
        console.error('FAILED... EmailJS Error:', err);
        let userMessage = t.emailSendError;
        // EmailJS returns an object with status and text on failure
        if (err && typeof err.status === 'number') {
            if (err.status === 400) {
                // Bad Request - often a config issue like a malformed template param or wrong IDs
                userMessage = t.emailSendErrorConfig;
            } else if (err.status === 0) {
                // This can indicate a network error (CORS, offline, etc.)
                userMessage = t.emailSendErrorNetwork;
            }
        }
        alert(userMessage);
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
        <AnimatedSection>
            <StaticSection 
              t={t}
              language={language}
              clientInfo={clientInfo}
              onClientInfoChange={handleClientInfoChange}
              emailError={emailError}
              proposalDate={proposalDate}
              isClientMode={isClientMode}
            />
        </AnimatedSection>
        <AnimatedSection>
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
        </AnimatedSection>
        <AnimatedSection>
            <TermsAndConditions t={t} language={language} />
        </AnimatedSection>
      </main>
      <Footer />
      <TotalBar
        subTotalPrice={subTotalPrice}
        finalTotalPrice={finalTotalPrice}
        discount={discount}
        discountPercentage={discountPercentage}
        onSendEmail={isClientMode ? handleClientSubmission : handleSendEmail}
        language={language}
        t={t}
        actionType={actionType}
        formError={formError}
        isClientMode={isClientMode}
      />
    </div>
  );
}

export default App;
