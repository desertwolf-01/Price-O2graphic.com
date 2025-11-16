
import React, { useState } from 'react';
import { Translation } from '../i18n';

interface FAQSectionProps {
  t: Translation;
}

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
        className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
);


const FAQSection: React.FC<FAQSectionProps> = ({ t }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="print:hidden">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">{t.faqTitle}</h3>
                <div className="space-y-4">
                    {t.faqs.map((faq, index) => (
                        <div key={index} className="border-b border-slate-200 last:border-b-0">
                            <button
                                onClick={() => handleToggle(index)}
                                className="w-full flex justify-between items-center py-4 text-left text-lg font-semibold text-slate-800 hover:text-blue-600 focus:outline-none"
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-answer-${index}`}
                            >
                                <span>{faq.q}</span>
                                <ChevronIcon isOpen={openIndex === index} />
                            </button>
                            <div
                                id={`faq-answer-${index}`}
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    openIndex === index ? 'max-h-screen' : 'max-h-0'
                                }`}
                            >
                                <p className="pt-2 pb-4 text-slate-600">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
