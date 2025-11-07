import React from 'react';
import { fullLogoBase64 } from '../assets/logo';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: 'ar' | 'en';
  toggleLanguage: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, language, toggleLanguage }) => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm print:hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <img src={fullLogoBase64} alt="O2Graphic Logo" className="h-12" />
          <div className="flex items-center gap-2">
            <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;