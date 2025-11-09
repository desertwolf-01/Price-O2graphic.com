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
      className="p-2 w-12 h-10 flex items-center justify-center rounded-full text-sm font-bold text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      aria-label="Toggle language"
    >
      {getNextLanguage()}
    </button>
  );
};

export default LanguageToggle;