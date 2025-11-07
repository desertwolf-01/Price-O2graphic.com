import React from 'react';
import PricingOption from './PricingOption';
import type { ServiceCategory } from '../types';
import type { Translation } from '../i18n';

interface PricingCategoryProps {
  category: ServiceCategory;
  selectedIds: string[];
  onServiceToggle: (optionId: string, category: ServiceCategory) => void;
  quantities: { [id: string]: number };
  onQuantityChange: (optionId: string, newQuantity: number) => void;
  language: 'ar' | 'en';
  t: Translation;
  isClientMode: boolean;
}

const PricingCategory: React.FC<PricingCategoryProps> = ({
  category,
  selectedIds,
  onServiceToggle,
  quantities,
  onQuantityChange,
  language,
  t,
  isClientMode,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 print:shadow-none print:border-0 overflow-hidden">
      <div className={`p-6 bg-slate-50/50 border-b border-slate-200/80 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <h3 className="text-2xl font-bold text-slate-800">{category.name}</h3>
        {category.description && <p className="mt-2 text-md text-slate-600">{category.description}</p>}
      </div>

      <div className="p-6 space-y-4">
        {category.options.map((option) => (
          <PricingOption
            key={option.id}
            option={option}
            isSelected={selectedIds.includes(option.id)}
            onToggle={() => onServiceToggle(option.id, category)}
            quantity={quantities[option.id] || 1}
            onQuantityChange={(newQuantity) => onQuantityChange(option.id, newQuantity)}
            isRadio={category.isRadio}
            language={language}
            t={t}
            isClientMode={isClientMode}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingCategory;