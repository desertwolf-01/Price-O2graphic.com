import React from 'react';
import { Translation } from '../i18n';

interface SuccessScreenProps {
  t: Translation;
  onClose: () => void;
  isClientMode: boolean;
  onOpenFeedback?: () => void;
}

const SuccessIcon = () => (
    <svg className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const SuccessScreen: React.FC<SuccessScreenProps> = ({ t, onClose, isClientMode, onOpenFeedback }) => {
  return (
    <div 
        className="fixed inset-0 bg-slate-800 bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        aria-labelledby="success-title"
        role="dialog"
        aria-modal="true"
    >
        <div className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full text-center transform transition-all">
            <SuccessIcon />
            <h2 id="success-title" className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mt-4">
                {t.successMessageTitle}
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300 whitespace-pre-line text-sm md:text-base">
                {isClientMode ? t.successMessageClientBody : t.successMessageEmailBody}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              {onOpenFeedback && (
                <button
                    onClick={() => {
                      onClose();
                      onOpenFeedback();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-amber-300 dark:border-amber-700 text-base font-semibold rounded-xl text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors"
                >
                    <span>⭐ شاركنا تقييمك للعرض</span>
                </button>
              )}
              <button
                  onClick={onClose}
                  className="w-full sm:w-auto justify-center flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-blue-500 transition-colors"
                  aria-label={t.backToProposal}
              >
                  {t.backToProposal}
              </button>
            </div>
        </div>
    </div>
  );
};

export default SuccessScreen;