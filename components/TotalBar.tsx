
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

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 448 512"
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

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
    <div className="sticky bottom-0 z-50 bg-white/90 backdrop-blur-md border-t border-slate-200 shadow-lg print:hidden">
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
                  {isClientMode ? (
                      isSending ? t.sending : t.sendProposal
                  ) : (
                    <>
                      <WhatsAppIcon />
                      {t.sendEmail}
                    </>
                  )}
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
