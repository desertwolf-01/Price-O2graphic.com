
import React from 'react';
import PricingCategory from './PricingCategory';
import { ServiceCategory } from '../types';
import { Translation } from '../i18n';

interface PricingSectionProps {
  categories: ServiceCategory[];
  selectedIds: string[];
  onServiceToggle: (optionId: string, category: ServiceCategory) => void;
  quantities: { [id: string]: number };
  onQuantityChange: (optionId: string, newQuantity: number) => void;
  language: 'ar' | 'en';
  t: Translation;
  isClientMode: boolean;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  categories,
  selectedIds,
  onServiceToggle,
  quantities,
  onQuantityChange,
  language,
  t,
  isClientMode,
}) => {
  return (
    <section className="space-y-8">
      <div className={`p-4 md:p-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <h2 className="text-3xl font-bold text-slate-800">{t.selectServicesTitle}</h2>
        <p className="mt-2 text-md text-slate-600">{t.selectServicesDescription}</p>
      </div>
      <div className="space-y-6">
        {categories.map((category, index) => (
          <PricingCategory
            key={category.id}
            category={category}
            categoryIndex={index + 1}
            selectedIds={selectedIds}
            onServiceToggle={onServiceToggle}
            quantities={quantities}
            onQuantityChange={onQuantityChange}
            language={language}
            t={t}
            isClientMode={isClientMode}
          />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
