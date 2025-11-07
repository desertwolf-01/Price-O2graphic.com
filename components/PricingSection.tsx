
import React from 'react';
import PricingCategory from './PricingCategory';
import { ServiceCategory } from '../types';
import { Translation } from '../i18n';

interface PricingSectionProps {
  categories: ServiceCategory[];
  selectedIds: string[];
  onServiceToggle: (id: string, categoryId: string) => void;
  quantities: { [id: string]: number };
  onQuantityChange: (id: string, quantity: number) => void;
  language: 'ar' | 'en';
  t: Translation;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  categories,
  selectedIds,
  onServiceToggle,
  quantities,
  onQuantityChange,
  language,
  t,
}) => {
  return (
    <section className="space-y-8">
      <div className={`p-4 md:p-6 text-center ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <h2 className="text-3xl font-bold text-[#0f2e4d] dark:text-white">{t.selectServicesTitle}</h2>
        <p className="mt-2 text-md text-gray-600 dark:text-gray-300">{t.selectServicesDescription}</p>
      </div>
      <div className="space-y-6">
        {categories.map((category) => (
          <PricingCategory
            key={category.id}
            category={category}
            selectedIds={selectedIds}
            onServiceToggle={onServiceToggle}
            quantities={quantities}
            onQuantityChange={onQuantityChange}
            language={language}
            t={t}
          />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
