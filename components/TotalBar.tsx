
import React from 'react';
import { Translation } from '../i18n';

interface TotalBarProps {
  subTotalPrice: number;
  finalTotalPrice: number;
  discount: number;
  discountPercentage: number;
  onSendEmail: () => void;
  language: 'ar' | 'en';
  t: Translation;
  isActionInProgress: boolean;
}

const TotalBar: React.FC<TotalBarProps> = ({
  subTotalPrice,
  finalTotalPrice,
  discount,
  discountPercentage,
  onSendEmail,
  language,
  t,
  isActionInProgress,
}) => {
  if (finalTotalPrice <= 0) {
    return null;
  }

  const getDiscountText = () => {
    if (discountPercentage >= 30) return t.discount30;
    if (discountPercentage >= 20) return t.discount20;
    if (discountPercentage >= 10) return t.discount10;
    return null;
  }
  const discountText = getDiscountText();

  return (
    <div className="sticky bottom-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-slate-700 shadow-lg print:hidden">
      <div className={`max-w-4xl mx-auto p-4 flex flex-col sm:flex-row items-center justify-between gap-4 ${language === 'ar' ? 'sm:flex-row-reverse' : ''}`}>
        <div className={`flex-grow ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-medium text-gray-600 dark:text-gray-300">{t.totalPrice}:</span>
            <span className="text-3xl font-bold text-[#0f2e4d] dark:text-white">${finalTotalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            {discount > 0 && (
              <span className="text-base font-medium text-gray-500 dark:text-gray-400 line-through">${subTotalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            )}
          </div>
          {discountText && (
             <p className="text-sm text-green-600 dark:text-green-400 mt-1">{discountText}</p>
          )}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
          <button
            onClick={onSendEmail}
            disabled={isActionInProgress}
            className="w-full sm:w-auto flex-1 justify-center items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {isActionInProgress ? t.sending : t.sendEmail}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalBar;