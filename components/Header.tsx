import React from 'react';
import LanguageToggle from './LanguageToggle';
import { fullLogoBase64 } from '../assets/logo';

interface HeaderProps {
  language: 'ar' | 'en';
  toggleLanguage: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, toggleLanguage }) => {
  const logo = (
    <a href="https://www.o2graphic.com" target="_blank" rel="noopener noreferrer" aria-label="O2Graphic Main Website">
        <img 
          src={fullLogoBase64}
          alt="O2Graphic Logo" 
          className="h-12 w-auto" 
          style={{ maxHeight: '3rem' }}
        />
    </a>
  );

  const controls = (
    <div className="flex items-center gap-2">
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