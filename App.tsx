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
import { logoBase64 } from './assets/logo';
import html2pdf from 'html2pdf.js';

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedTheme = window.localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      return 'dark';
    }
    if (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

function App() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  const [clientInfo, setClientInfo] = useState({ name: 'Energy Outdoor Advertising', phone: '05342006606', email: 'stylesowss@gmail.com' });
  const [emailError, setEmailError] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});
  const [isActionInProgress, setIsActionInProgress] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [proposalDate] = useState(new Date());

  const t = useMemo(() => translations[language], [language]);
  const serviceCategories = useMemo(() => getServiceCategories(language), [language]);

  // Language and theme side effects
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.classList.remove('lang-en', 'lang-ar');
    document.documentElement.classList.add(`lang-${language}`);
  }, [language]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleLanguage = () => setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleClientInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientInfo(prev => ({ ...prev, [name]: value }));
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        setEmailError(t.emailError);
      } else {
        setEmailError('');
      }
    }
  };

  const handleQuantityChange = useCallback((id: string, quantity: number) => {
    if (quantity >= 1) {
      setQuantities(prev => ({ ...prev, [id]: quantity }));
    }
  }, []);

  const handleServiceToggle = useCallback((optionId: string, categoryId: string) => {
    const category = serviceCategories.find(c => c.id === categoryId);
    if (!category) return;

    let newSelectedIds = [...selectedIds];

    if (category.isPhased) {
      const optionIndex = category.options.findIndex(o => o.id === optionId);
      const isSelected = selectedIds.includes(optionId);
      
      if (isSelected) {
        // Deselect this and all subsequent options in the category
        const idsToDeselect = category.options.slice(optionIndex).map(o => o.id);
        newSelectedIds = newSelectedIds.filter(id => !idsToDeselect.includes(id));
      } else {
        // Select this and all preceding options in the category
        const idsToSelect = category.options.slice(0, optionIndex + 1).map(o => o.id);
        idsToSelect.forEach(id => {
          if (!newSelectedIds.includes(id)) {
            newSelectedIds.push(id);
          }
        });
      }
    } else if (category.isRadio) {
      // Deselect all other options in this category
      const categoryOptionIds = category.options.map(o => o.id);
      newSelectedIds = newSelectedIds.filter(id => !categoryOptionIds.includes(id));
      // Select the toggled one
      newSelectedIds.push(optionId);
    } else {
      // Standard checkbox behavior
      if (newSelectedIds.includes(optionId)) {
        newSelectedIds = newSelectedIds.filter(id => id !== optionId);
      } else {
        newSelectedIds.push(optionId);
      }
    }

    setSelectedIds(newSelectedIds);
  }, [selectedIds, serviceCategories]);

  const selectedOptions = useMemo(() => {
    const allOptions = serviceCategories.flatMap(c => c.options);
    return allOptions.filter(o => selectedIds.includes(o.id));
  }, [selectedIds, serviceCategories]);

  const subTotalPrice = useMemo(() => {
    return selectedOptions.reduce((total, option) => {
      const quantity = option.hasQuantity ? (quantities[option.id] || 1) : 1;
      return total + (option.price * quantity);
    }, 0);
  }, [selectedOptions, quantities]);

  const discountPercentage = useMemo(() => {
    const count = selectedIds.length;
    if (count >= 10) return 30;
    if (count >= 8) return 20;
    if (count >= 4) return 10;
    return 0;
  }, [selectedIds.length]);

  const discount = useMemo(() => (subTotalPrice * discountPercentage) / 100, [subTotalPrice, discountPercentage]);
  const finalTotalPrice = useMemo(() => subTotalPrice - discount, [subTotalPrice, discount]);
  
  const validateClientInfo = () => {
    const { name, phone, email } = clientInfo;
    const isEmailValid = email && !emailError;
    if (!name || !phone || !isEmailValid) {
      alert(t.fillInfoAlert);
      return false;
    }
    return true;
  };
  
  const handleDownloadPdf = async () => {
    if (!validateClientInfo() || isActionInProgress) return;
    setIsActionInProgress(true);
    setIsPrinting(true);
    
    setTimeout(() => {
      try {
        const printableElement = document.getElementById('printable-content');
        if (!printableElement) {
            throw new Error('Printable content not found');
        }
        
        html2pdf().from(printableElement).set({
            margin: 0,
            filename: 'O2Graphic-Proposal.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, letterRendering: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }).save().then(() => {
            alert(t.successMessagePdf);
        }).catch((err: any) => {
            console.error('Failed to generate PDF:', err);
            alert(t.pdfErrorMessage);
        }).finally(() => {
            setIsPrinting(false);
            setIsActionInProgress(false);
        });

      } catch (error) {
        console.error('Failed to generate PDF:', error);
        alert(t.pdfErrorMessage);
        setIsPrinting(false);
        setIsActionInProgress(false);
      }
    }, 500);
  };
  
  const handleSendEmail = () => {
    if (!validateClientInfo() || isActionInProgress) return;
    setIsActionInProgress(true);

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
    const mailtoLink = `mailto:info@o2graphic.com?subject=${subject}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
    
    setTimeout(() => {
      setIsActionInProgress(false);
      alert(t.successMessageEmail);
    }, 500);
  };
  
  if (isPrinting) {
      const selectedByCategory: { [key: string]: { category: ServiceCategory, options: ServiceOption[] } } = {};
      selectedOptions.forEach(option => {
          const category = serviceCategories.find(c => c.options.some(o => o.id === option.id));
          if (category) {
              if (!selectedByCategory[category.id]) {
                  selectedByCategory[category.id] = { category, options: [] };
              }
              selectedByCategory[category.id].options.push(option);
          }
      });
      const orderedSelectedCategories = serviceCategories
        .filter(c => selectedByCategory[c.id])
        .map(c => selectedByCategory[c.id]);
      
      let serviceCounter = 0;

      return (
          <div id="printable-content" className={`font-sans bg-white text-[#0f2e4d] ${language === 'ar' ? 'lang-ar' : 'lang-en'}`}
               style={{ width: '210mm', minHeight: '297mm', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}
          >
              <div className="flex-grow px-[12mm] pt-[10mm] pb-[5mm] flex flex-col">
                <header>
                    <div className={`${language === 'ar' ? 'text-left' : 'text-right'}`}>
                        <img src={logoBase64} alt="O2Graphic Logo" className="h-12 inline-block" />
                    </div>
                    <hr className="mt-4 border-t border-gray-400"/>
                </header>

                <StaticSection 
                    t={t}
                    language={language}
                    clientInfo={clientInfo}
                    handleClientInfoChange={handleClientInfoChange}
                    emailError={emailError}
                    isPrinting={isPrinting}
                    proposalDate={proposalDate}
                />

                <main className='mt-6 flex-grow'>
                    {orderedSelectedCategories.map(({ category, options }) => (
                        <div key={category.id} className="mb-5 break-inside-avoid">
                            <h3 className={`text-sm font-bold bg-gray-100 p-2 text-center rounded-sm`}>
                                {category.name}
                            </h3>
                            <div className="mt-2 space-y-2">
                                {options.map(option => {
                                    serviceCounter++;
                                    const quantity = option.hasQuantity ? quantities[option.id] || 1 : 1;
                                    const totalOptionPrice = option.price * quantity;
                                    const pageCountText = option.hasQuantity && quantity > 1 ? ` (${t.pagesLabel.replace(':', '')} ${quantity})` : '';
                                    return (
                                        <div key={option.id} className={`flex justify-between items-start py-1 border-b border-gray-200 text-xs ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                                            <p className={`flex-grow ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                                                <span className="font-bold">{serviceCounter}. </span>
                                                {option.name}
                                                {pageCountText && <span className="text-gray-500">{pageCountText}</span>}
                                            </p>
                                            <p className={`flex-shrink-0 font-medium ${language === 'ar' ? 'text-left' : 'text-right'}`}>
                                                ${totalOptionPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </main>

                <div className="flex-grow" />

                <div className={`mt-auto pt-4 border-t border-gray-400 flex gap-6 ${language === 'ar' ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                    <div className="w-7/12">
                         <div className="space-y-2 text-xs text-[#0f2e4d]">
                            <div className={`flex justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}><span className="text-gray-600">{t.subtotal}</span><strong>${subTotalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></div>
                            {discount > 0 && <div className={`flex justify-between text-green-600 ${language === 'ar' ? 'flex-row-reverse' : ''}`}><span>{t.discountLabel(discountPercentage)}</span><strong>${discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></div>}
                            <hr className="my-1 border-gray-400" />
                            <div className={`flex justify-between text-xl font-bold pt-1 ${language === 'ar' ? 'flex-row-reverse' : ''}`}><span>{t.finalTotal}</span><span>${finalTotalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                        </div>
                    </div>
                    <div className="w-5/12">
                       <TermsAndConditions t={t} language={language} />
                    </div>
                </div>
              </div>

              <footer className="bg-[#0f2e4d] text-white mt-auto">
                <div className="px-[12mm] py-3 text-xs flex justify-between items-center">
                    <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
                        <p>www.o2graphic.com</p>
                        <p>info@o2graphic.com</p>
                    </div>
                    <div className={`flex items-center gap-2 ${language === 'ar' ? 'text-left' : 'text-right'}`}>
                         <img src={logoBase64} alt="O2Graphic Logo" className="h-8" />
                         <span className="font-bold">Breathe Design</span>
                    </div>
                </div>
              </footer>
          </div>
      );
  }


  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen">
      <Header 
        theme={theme}
        toggleTheme={toggleTheme}
        language={language}
        toggleLanguage={toggleLanguage}
      />
      <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
        <StaticSection 
          t={t}
          language={language}
          clientInfo={clientInfo}
          handleClientInfoChange={handleClientInfoChange}
          emailError={emailError}
          isPrinting={isPrinting}
          proposalDate={proposalDate}
        />
        <PricingSection
          categories={serviceCategories}
          selectedIds={selectedIds}
          onServiceToggle={handleServiceToggle}
          quantities={quantities}
          onQuantityChange={handleQuantityChange}
          language={language}
          t={t}
        />
        <TermsAndConditions t={t} language={language} />
      </main>
      <Footer />
      <TotalBar
        subTotalPrice={subTotalPrice}
        finalTotalPrice={finalTotalPrice}
        discount={discount}
        discountPercentage={discountPercentage}
        onSendEmail={handleSendEmail}
        language={language}
        t={t}
        isActionInProgress={isActionInProgress}
      />
    </div>
  );
}

export default App;