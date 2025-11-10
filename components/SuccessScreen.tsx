import React from 'react';
import { Translation } from '../i18n';

interface SuccessScreenProps {
  t: Translation;
  onClose: () => void;
  isClientMode: boolean;
}

const SuccessIcon = () => (
    <svg className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const SuccessScreen: React.FC<SuccessScreenProps> = ({ t, onClose, isClientMode }) => {
  return (
    <div 
        className="fixed inset-0 bg-slate-800 bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        aria-labelledby="success-title"
        role="dialog"
        aria-modal="true"
    >
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full text-center transform transition-all animate-enter">
            <SuccessIcon />
            <h2 id="success-title" className="text-2xl md:text-3xl font-bold text-slate-800 mt-4">
                {t.successMessageTitle}
            </h2>
            <p className="mt-4 text-slate-600 whitespace-pre-line text-sm md:text-base">
                {isClientMode ? t.successMessageClientBody : t.successMessageEmailBody}
            </p>
            <button
                onClick={onClose}
                className="mt-8 w-full sm:w-auto justify-center flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label={t.backToProposal}
            >
                {t.backToProposal}
            </button>
        </div>
    </div>
  );
};

export default SuccessScreen;