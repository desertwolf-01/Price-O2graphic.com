import React from 'react';
import { Translation } from '../i18n';
import { countries } from '../constants/countries';

interface StaticSectionProps {
  t: Translation;
  language: 'ar' | 'en';
  clientInfo: { name: string, phone: string, email: string, countryCode: string };
  onClientInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  emailError: string;
  proposalDate: Date;
  isClientMode: boolean;
}

const StaticSection: React.FC<StaticSectionProps> = ({ 
  t, 
  language, 
  clientInfo, 
  onClientInfoChange,
  emailError,
  proposalDate,
  isClientMode,
}) => {
  const formattedDate = proposalDate.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
  });

  return (
    <section className="space-y-8">
      <div className="p-4 md:p-6 text-center">
        <h1 className="text-4xl font-bold text-slate-800 text-center">{t.proposalTitle}</h1>
        <div 
            className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto text-center" 
            dangerouslySetInnerHTML={{ __html: t.proposalDescription }} 
        />
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-200/80 print:shadow-none print:border-0">
        <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h3 className="text-xl font-bold text-slate-900">{t.clientInfoTitle}</h3>
            <p className="mt-1 text-sm text-slate-500">{t.proposalDateLabel}: {formattedDate}</p>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <label htmlFor="clientName" className="block text-sm font-medium text-slate-700">{t.clientNameLabel}</label>
                <input
                    type="text"
                    name="name"
                    id="clientName"
                    value={clientInfo.name}
                    onChange={onClientInfoChange}
                    placeholder={t.clientNamePlaceholder}
                    className="mt-1 block w-full px-3 py-2 bg-slate-100 border border-transparent rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all duration-200"
                />
            </div>
            <div>
                <label htmlFor="clientPhone" className="block text-sm font-medium text-slate-700">{t.clientPhoneLabel}</label>
                <div className={`mt-1 flex`}>
                    <select
                        name="countryCode"
                        id="countryCode"
                        value={clientInfo.countryCode}
                        onChange={onClientInfoChange}
                        className={`block w-24 appearance-none px-3 py-2 bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all duration-200 ${language === 'ar' ? 'rounded-r-lg rounded-l-none border-l-0' : 'rounded-l-lg rounded-r-none border-r-0'}`}
                        aria-label="Country Code"
                    >
                        {countries.map(country => (
                            <option key={country.code} value={country.dial_code}>
                                {country.code} ({country.dial_code})
                            </option>
                        ))}
                    </select>
                    <input
                        type="tel"
                        name="phone"
                        id="clientPhone"
                        value={clientInfo.phone}
                        onChange={onClientInfoChange}
                        placeholder={t.clientPhonePlaceholder}
                        className={`block w-full px-3 py-2 bg-slate-100 border border-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all duration-200 ${language === 'ar' ? 'rounded-l-lg rounded-r-none' : 'rounded-r-lg rounded-l-none'}`}
                    />
                </div>
            </div>
            <div>
                <label htmlFor="clientEmail" className="block text-sm font-medium text-slate-700">{t.clientEmailLabel}</label>
                <input
                    type="email"
                    name="email"
                    id="clientEmail"
                    value={clientInfo.email}
                    onChange={onClientInfoChange}
                    placeholder={t.clientEmailPlaceholder}
                    className={`mt-1 block w-full px-3 py-2 bg-slate-100 border rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 sm:text-sm transition-all duration-200 ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:ring-blue-500'}`}
                />
                {emailError && <p className="mt-1 text-xs text-red-500">{emailError}</p>}
            </div>
        </div>
      </div>
    </section>
  );
};

export default StaticSection;