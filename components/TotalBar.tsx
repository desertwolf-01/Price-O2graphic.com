import React, { useState, useEffect } from 'react';
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
        className="h-5 w-5" 
        fill="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
  const [pulseTotal, setPulseTotal] = useState(false);

  useEffect(() => {
    if (finalTotalPrice > 0) {
      setPulseTotal(true);
      const timer = setTimeout(() => setPulseTotal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [finalTotalPrice]);

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
                <span className={`text-4xl font-extrabold text-slate-800 transition-transform inline-block ${pulseTotal ? 'animate-value-pop' : ''}`}>
                    ${finalTotalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
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
                  className="w-full sm:w-auto justify-center flex items-center gap-2 px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 transition-transform active:scale-95"
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
                    className="w-full sm:w-auto justify-center flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
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