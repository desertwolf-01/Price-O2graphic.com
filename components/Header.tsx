import React from 'react';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { fullLogoBase64, darkLogoBase64 } from '../assets/logo';
import { HelpCircle, Star } from 'lucide-react';

interface HeaderProps {
  language: 'ar' | 'en';
  toggleLanguage: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, toggleLanguage, theme, toggleTheme }) => {
  const currentLogo = theme === 'dark' ? darkLogoBase64 : fullLogoBase64;

  const logo = (
    <a href="https://www.o2graphic.com" target="_blank" rel="noopener noreferrer" aria-label="O2Graphic Main Website">
        <img 
          src={currentLogo}
          alt="O2Graphic Logo" 
          className="h-12 w-auto transition-opacity duration-200" 
          style={{ maxHeight: '3rem' }}
        />
    </a>
  );

  const controls = (
    <div className="flex items-center gap-2">
      <a
        href="#client-feedback-section"
        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200/80 dark:border-slate-700"
        title={language === 'ar' ? 'آراء وتقييمات العملاء' : 'Client Reviews'}
      >
        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
        <span className="hidden md:inline">{language === 'ar' ? 'التقييمات' : 'Reviews'}</span>
      </a>
      <a
        href="#faq-section"
        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200/80 dark:border-slate-700"
        title={language === 'ar' ? 'الأسئلة الشائعة وضمانات الملكية' : 'FAQ & Guarantees'}
      >
        <HelpCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span className="hidden sm:inline">{language === 'ar' ? 'الأسئلة والضمانات' : 'FAQ & Guarantees'}</span>
      </a>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} language={language} />
      <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
    </div>
  );

  return (
    <header className="bg-white dark:bg-slate-900/95 dark:backdrop-blur-md border-b border-slate-200 dark:border-slate-800 print:hidden shadow-xs transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3.5">
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