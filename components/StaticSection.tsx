import React from 'react';
import { Translation } from '../i18n';

interface StaticSectionProps {
  t: Translation;
  language: 'ar' | 'en';
  clientInfo: { name: string, phone: string, email: string };
  handleClientInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emailError: string;
  isPrinting: boolean;
  proposalDate: Date;
}

const StaticSection: React.FC<StaticSectionProps> = ({ 
  t, 
  language, 
  clientInfo, 
  handleClientInfoChange, 
  emailError,
  isPrinting,
  proposalDate,
}) => {
  const formattedDate = proposalDate.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
  });

  if (isPrinting) {
    return (
      <section className="mt-8 text-sm text-[#0f2e4d]">
        <div className={`grid ${language === 'ar' ? 'grid-cols-[3fr_auto_2fr]' : 'grid-cols-[2fr_auto_3fr]'} gap-x-4 items-start`}>
          
          <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h1 className="text-xl font-bold">{t.proposalTitle}</h1>
            <p className="mt-2 text-base">{t.proposalTo(clientInfo.name || '...')}</p>
          </div>
          
          <div className="h-full w-px bg-gray-300"></div>
          
          <div className={`space-y-1 text-xs ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <p><strong className="font-bold">{t.clientNameLabel}:</strong> {clientInfo.name}</p>
            <p><strong className="font-bold">{t.clientPhoneLabel}:</strong> {clientInfo.phone}</p>
            <p><strong className="font-bold">{t.clientEmailLabel}:</strong> {clientInfo.email}</p>
            <p><strong className="font-bold">{t.proposalDateLabel}:</strong> {formattedDate}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className={`p-4 md:p-6 text-center ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2e4d] dark:text-white">{t.proposalTitle}</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t.proposalDescription}</p>
      </div>

      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-gray-200 dark:border-slate-700">
        <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h3 className="text-xl font-bold text-[#0f2e4d] dark:text-white">{t.clientInfoTitle}</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t.proposalDateLabel}: {formattedDate}</p>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.clientNameLabel}</label>
                <input
                    type="text"
                    name="name"
                    id="clientName"
                    value={clientInfo.name}
                    onChange={handleClientInfoChange}
                    placeholder={t.clientNamePlaceholder}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.clientPhoneLabel}</label>
                <input
                    type="tel"
                    name="phone"
                    id="clientPhone"
                    value={clientInfo.phone}
                    onChange={handleClientInfoChange}
                    placeholder={t.clientPhonePlaceholder}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.clientEmailLabel}</label>
                <input
                    type="email"
                    name="email"
                    id="clientEmail"
                    value={clientInfo.email}
                    onChange={handleClientInfoChange}
                    placeholder={t.clientEmailPlaceholder}
                    className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${emailError ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}
                />
                {emailError && <p className="mt-1 text-xs text-red-500">{emailError}</p>}
            </div>
        </div>
      </div>
    </section>
  );
};

export default StaticSection;