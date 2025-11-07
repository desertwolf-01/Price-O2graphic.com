import React from 'react';
import PricingOption from './PricingOption';
import type { ServiceCategory } from '../types';
import type { Translation } from '../i18n';

// FIX: Removed the `isPrinting` prop from the interface below. It was required but not used, causing a compilation error.
// This component is not rendered when printing is active.
interface PricingCategoryProps {
  category: ServiceCategory;
  selectedIds: string[];
  onServiceToggle: (id: string, categoryId: string) => void;
  quantities: { [id: string]: number };
  onQuantityChange: (id: string, quantity: number) => void;
  language: 'ar' | 'en';
  t: Translation;
}

const PricingCategory: React.FC<PricingCategoryProps> = ({
  category,
  selectedIds,
  onServiceToggle,
  quantities,
  onQuantityChange,
  language,
  t,
}) => {
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-gray-200 dark:border-slate-700">
      <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <h3 className="text-xl font-bold text-[#0f2e4d] dark:text-white">{category.name}</h3>
        {category.description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{category.description}</p>}
      </div>

      <div className={`space-y-4 mt-6`}>
        {category.options.map((option) => (
          <PricingOption
            key={option.id}
            option={option}
            isSelected={selectedIds.includes(option.id)}
            onToggle={() => onServiceToggle(option.id, category.id)}
            quantity={quantities[option.id] || 1}
            onQuantityChange={onQuantityChange}
            isRadio={category.isRadio}
            language={language}
            t={t}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingCategory;