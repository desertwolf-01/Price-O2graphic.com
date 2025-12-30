import React, { useState, useEffect } from 'react';
import { Translation } from '../i18n';
import { formatNumber } from '../utils/format';

interface VisitorCounterProps {
  t: Translation;
  language: 'ar' | 'en';
}

const VisitorCounter: React.FC<VisitorCounterProps> = ({ t, language }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Simulated base count + local increments
    const BASE_COUNT = 14280;
    const storageKey = 'o2_visitor_count_increment';
    
    let localIncrement = parseInt(localStorage.getItem(storageKey) || '0', 10);
    
    // Increment on first load of the session if not already done
    const sessionKey = 'o2_session_visited';
    if (!sessionStorage.getItem(sessionKey)) {
      localIncrement += 1;
      localStorage.setItem(storageKey, localIncrement.toString());
      sessionStorage.setItem(sessionKey, 'true');
    }

    setCount(BASE_COUNT + localIncrement);
  }, []);

  if (count === 0) return null;

  return (
    <div className={`flex items-center gap-2 text-xs font-medium text-slate-400 border-l border-slate-200 pl-4 h-4 ${language === 'ar' ? 'flex-row-reverse border-l-0 pl-0 border-r pr-4' : ''}`}>
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      <span>
        {t.visitorCount}: <span className="text-slate-600 font-bold">{formatNumber(count)}</span>
      </span>
    </div>
  );
};

export default VisitorCounter;
