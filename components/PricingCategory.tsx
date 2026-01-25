
import React from 'react';
import PricingOption from './PricingOption';
import type { ServiceCategory } from '../types';
import type { Translation } from '../i18n';

interface PricingCategoryProps {
  category: ServiceCategory;
  categoryIndex: number;
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
  categoryIndex,
  selectedIds,
  onServiceToggle,
  quantities,
  onQuantityChange,
  language,
  t,
  isClientMode,
}) => {
  return (
    <div id={category.id} className="scroll-mt-8 bg-white rounded-2xl shadow-lg border border-slate-200/80 print:shadow-none print:border-0 overflow-hidden">
      <div className={`p-6 bg-slate-50/50 border-b border-slate-200/80 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <div className="flex items-center gap-3 mb-1">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold text-lg">
                {categoryIndex}
            </span>
            <h3 className="text-2xl font-bold text-slate-800">{category.name}</h3>
        </div>
        {category.description && (
          <div 
            className="mt-2 text-md text-slate-600 leading-relaxed" 
            dangerouslySetInnerHTML={{ __html: category.description }} 
          />
        )}
      </div>

      <div className="p-6 space-y-4">
        {category.options.map((option, optIdx) => (
          <PricingOption
            key={option.id}
            option={option}
            displayNumber={`${categoryIndex}.${optIdx + 1}`}
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
