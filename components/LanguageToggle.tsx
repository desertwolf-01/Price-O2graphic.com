import React from 'react';

type Language = 'ar' | 'en';

interface LanguageToggleProps {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, toggleLanguage }) => {
  const getNextLanguage = () => {
    return language === 'ar' ? 'EN' : 'AR';
  }

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 w-12 h-10 flex items-center justify-center rounded-full text-sm font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-blue-500 transition-colors"
      aria-label="Toggle language"
    >
      {getNextLanguage()}
    </button>
  );
};

export default LanguageToggle;