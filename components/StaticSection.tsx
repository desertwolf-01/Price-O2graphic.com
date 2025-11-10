
import React from 'react';
import { Translation } from '../i18n';
import { countries } from '../constants/countries';

interface ClientInfo {
  name: string;
  phone: string;
  email: string;
  countryCode: string;
}

interface StaticSectionProps {
  t: Translation;
  language: 'ar' | 'en';
  clientInfo: ClientInfo;
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
      {/* Introduction Section */}
      <div className={`p-4 md:p-6 bg-white rounded-2xl shadow-lg border border-slate-200/80 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <h1 className="text-3xl font-extrabold text-slate-900">{t.proposalTitle}</h1>
        <div className="mt-4 prose prose-slate max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: t.proposalDescription }} />
      </div>

      {/* Client Info Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80">
        <div className={`p-6 border-b border-slate-200/80 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-2xl font-bold text-slate-800">{t.clientInfoTitle}</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Proposal Date */}
          <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <label className="block text-sm font-medium text-slate-700">{t.proposalDateLabel}</label>
            <p className="mt-1 text-md text-slate-900 font-semibold">{formattedDate}</p>
          </div>

          {/* Spacer for alignment */}
          <div className="hidden md:block"></div>

          {/* Client Name */}
          <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">{t.clientNameLabel}</label>
            <input
              type="text"
              name="name"
              id="name"
              value={clientInfo.name}
              onChange={onClientInfoChange}
              placeholder={t.clientNamePlaceholder}
              disabled={isClientMode}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            />
          </div>

          {/* Client Phone */}
          <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700">{t.clientPhoneLabel}</label>
            <div className="mt-1 flex rounded-md shadow-sm">
                <select
                    name="countryCode"
                    id="countryCode"
                    value={clientInfo.countryCode}
                    onChange={onClientInfoChange}
                    disabled={isClientMode}
                    className={`block appearance-none border border-slate-300 py-2 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 ${language === 'ar' ? 'rounded-r-md border-l-0 pl-3 pr-8' : 'rounded-l-md border-r-0 pr-3 pl-8'}`}
                    style={{ backgroundImage: 'none' }} // Remove default arrow
                >
                    {countries.map(country => (
                        <option key={country.code} value={country.dial_code}>{`${country.code} (${country.dial_code})`}</option>
                    ))}
                </select>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={clientInfo.phone}
                    onChange={onClientInfoChange}
                    placeholder={t.clientPhonePlaceholder}
                    disabled={isClientMode}
                    className={`block w-full flex-1 px-3 py-2 bg-white border border-slate-300 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none ${language === 'ar' ? 'rounded-l-md' : 'rounded-r-md'}`}
                />
            </div>
          </div>
          
          {/* Client Email */}
          <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">{t.clientEmailLabel}</label>
            <input
              type="email"
              name="email"
              id="email"
              value={clientInfo.email}
              onChange={onClientInfoChange}
              placeholder={t.clientEmailPlaceholder}
              disabled={isClientMode}
              className={`mt-1 block w-full px-3 py-2 bg-white border ${emailError ? 'border-red-500' : 'border-slate-300'} rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 ${emailError ? 'focus:ring-red-500' : 'focus:ring-blue-500'} disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none`}
            />
            {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
          </div>

        </div>
      </div>
    </section>
  );
};

export default StaticSection;