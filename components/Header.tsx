import React from 'react';
import LanguageToggle from './LanguageToggle';
import { fullLogoBase64 } from '../assets/logo';
import { Translation } from '../i18n';

interface HeaderProps {
  language: 'ar' | 'en';
  toggleLanguage: () => void;
  t: Translation;
}

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ language, toggleLanguage, t }) => {
  const logo = (
    <img 
      src={fullLogoBase64}
      alt="O2Graphic Logo" 
      className="h-12 w-auto" 
      style={{ maxHeight: '3rem' }}
    />
  );

  const controls = (
    <div className="flex items-center gap-2">
      <a
        href="https://cal.com/o2-graphic-cdmhch"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <CalendarIcon />
        {t.bookConsultation}
      </a>
      <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
    </div>
  );

  return (
    <header className="bg-white border-b border-slate-200 print:hidden shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {language === 'ar' ? (
            <>
              {controls}
              {logo}
            </>
          ) : (
            <>
              {logo}
              {controls}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;