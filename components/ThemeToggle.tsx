
import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language?: 'ar' | 'en';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme, language = 'ar' }) => {
  const isDark = theme === 'dark';
  const isArabic = language === 'ar';

  const label = isDark
    ? (isArabic ? 'تفعيل الوضع المضيء' : 'Switch to Light Mode')
    : (isArabic ? 'تفعيل الوضع الليلي' : 'Switch to Dark Mode');

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer text-xs font-semibold
        border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700
        dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700/80 dark:text-slate-200 dark:hover:border-slate-600
        focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
      aria-label={label}
      title={label}
    >
      {isDark ? (
        <>
          <Sun className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span className="hidden sm:inline text-[11px] text-amber-300">
            {isArabic ? 'النهاري' : 'Light'}
          </span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
          <span className="hidden sm:inline text-[11px] text-slate-600">
            {isArabic ? 'الداكن' : 'Dark'}
          </span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;

