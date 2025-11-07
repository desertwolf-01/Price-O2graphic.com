import React from 'react';
import { Translation } from '../i18n';

type Language = 'ar' | 'en';

interface TermsAndConditionsProps {
  t: Translation;
  language: Language;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ t, language }) => {
  const isPrinting = !!document.getElementById('printable-content');

  if (isPrinting) {
    return (
      <section className={`text-[8px] leading-tight text-gray-600`}>
        <ul className={`space-y-1 ${language === 'ar' ? 'pr-4' : 'pl-4'} list-disc`}>
            <li><strong className="font-semibold">{t.term1Title}:</strong> {t.term1Desc}</li>
            <li><strong className="font-semibold">{t.term2Title}:</strong> {t.term2Desc}</li>
            <li><strong className="font-semibold">{t.term3Title}:</strong> {t.term3Desc}</li>
            <li><strong className="font-semibold">{t.term4Title}:</strong> {t.term4Desc}</li>
            <li><strong className="font-semibold">{t.term5Title}:</strong> {t.term5Desc}</li>
            <li><strong className="font-semibold">{t.term6Title}:</strong> {t.term6Desc}</li>
        </ul>
      </section>
    );
  }

  return (
    <section className={`text-xs print:hidden`}>
      <h3 className="text-sm font-bold text-[#0f2e4d] dark:text-white mb-2">{t.termsTitle}</h3>
      <ul className={`text-gray-700 dark:text-gray-300 space-y-1 list-disc ${language === 'ar' ? 'list-inside pr-1' : 'ml-4'}`}>
          <li><strong>{t.term1Title}:</strong> {t.term1Desc}</li>
          <li><strong>{t.term2Title}:</strong> {t.term2Desc}</li>
          <li><strong>{t.term3Title}:</strong> {t.term3Desc}</li>
          <li><strong>{t.term4Title}:</strong> {t.term4Desc}</li>
          <li><strong>{t.term5Title}:</strong> {t.term5Desc}</li>
          <li><strong>{t.term6Title}:</strong> {t.term6Desc}</li>
      </ul>
    </section>
  );
};

export default TermsAndConditions;