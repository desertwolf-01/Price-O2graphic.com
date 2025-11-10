import React from 'react';
import { Translation } from '../i18n';

interface TotalBarProps {
  subTotalPrice: number;
  finalTotalPrice: number;
  discount: number;
  discountPercentage: number;
  onSendEmail: () => void;
  onClearSelection: () => void;
  language: 'ar' | 'en';
  t: Translation;
  actionType: string | null;
  formError: string;
  isClientMode: boolean;
}

const TotalBar: React.FC<TotalBarProps> = ({
  subTotalPrice,
  finalTotalPrice,
  discount,
  discountPercentage,
  onSendEmail,
  onClearSelection,
  language,
  t,
  actionType,
  formError,
  isClientMode,
}) => {
  if (finalTotalPrice <= 0 && !formError) {
    return null;
  }

  const discountText = discountPercentage > 0 && !isClientMode
    ? t.totalDiscountApplied(discountPercentage)
    : null;
    
  const isSending = actionType === 'email';

  return (
    <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-slate-200 shadow-lg print:hidden">
      <div className={`max-w-4xl mx-auto p-4 flex flex-col sm:flex-row items-center justify-between gap-4 ${language === 'ar' ? 'sm:flex-row-reverse' : ''}`}>
        <div 
          className={`flex-grow ${language === 'ar' ? 'text-right' : 'text-left'}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {finalTotalPrice > 0 && (
            <>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-medium text-slate-600">{t.totalPrice}:</span>
                <span className="text-4xl font-extrabold text-slate-800">${finalTotalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                {discount > 0 && !isClientMode && (
                  <span className="text-base font-medium text-slate-500 line-through">${subTotalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                )}
              </div>
              {discountText && (
                <p className="text-sm text-blue-600 font-medium mt-1">{discountText}</p>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col gap-2 items-stretch flex-shrink-0 w-full sm:w-auto">
          {formError && (
            <p role="alert" className={`text-sm text-red-600 text-center ${language === 'ar' ? 'sm:text-right' : 'sm:text-left'}`}>
              {formError}
            </p>
          )}
          {finalTotalPrice > 0 && (
              <div className={`flex flex-col sm:flex-row items-center gap-2 ${language === 'ar' ? 'sm:flex-row-reverse' : ''}`}>
                <button
                  onClick={onSendEmail}
                  disabled={isSending}
                  className="w-full sm:w-auto justify-center flex items-center gap-2 px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                >
                  {isSending ? t.sending : (isClientMode ? t.sendProposal : t.sendEmail)}
                </button>
                {!isClientMode && (
                  <button
                    onClick={onClearSelection}
                    className="w-full sm:w-auto justify-center flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                  >
                    {t.clearSelection}
                  </button>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalBar;
