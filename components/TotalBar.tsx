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
    viewBox="0 0 24 24"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.357 1.846 6.069l-1.29 4.704 4.823-1.266zm7.32-6.56c-.347-.175-2.042-1.013-2.357-1.127-.315-.114-.543-.175-.771.175-.228.349-.891 1.127-1.091 1.354-.2.227-.401.256-.748.082-.347-.175-1.465-.542-2.791-1.725-1.034-.935-1.734-2.09-1.935-2.438-.201-.349-.021-.543.154-.718.159-.16.347-.417.521-.628.174-.21.232-.349.347-.584.114-.236.057-.448-.028-.622-.085-.175-.771-1.849-1.058-2.534-.287-.684-.576-.59-.771-.598-.195-.008-.423-.008-.651-.008-.228 0-.59.083-.891.417-.301.333-1.146 1.127-1.146 2.757 0 1.63 1.17 3.199 1.325 3.426.155.227 2.269 3.639 5.498 4.831 3.229 1.192 3.229.793 3.807.734.578-.059 1.849-.758 2.113-1.481.265-.723.265-1.354.184-1.481-.081-.127-.301-.194-.651-.368z"/>
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