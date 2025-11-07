
import React from 'react';
import type { ServiceOption } from '../types';
import { Translation } from '../i18n';

interface PricingOptionProps {
  option: ServiceOption;
  isSelected: boolean;
  onToggle: () => void;
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
  isRadio?: boolean;
  language: 'ar' | 'en';
  t: Translation;
}

const PricingOption: React.FC<PricingOptionProps> = ({
  option,
  isSelected,
  onToggle,
  quantity,
  onQuantityChange,
  isRadio = false,
  language,
  t,
}) => {
  const inputType = isRadio ? 'radio' : 'checkbox';
  const inputClasses = `h-5 w-5 ${
    isRadio ? 'rounded-full' : 'rounded'
  } border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:checked:bg-blue-500 dark:focus:ring-offset-slate-800`;

  const handleQuantityButtonClick = (amount: number) => {
    onQuantityChange(option.id, quantity + amount);
  };

  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-500'
          : 'bg-gray-50 border-gray-200 hover:border-gray-300 dark:bg-slate-700/50 dark:border-slate-600 dark:hover:border-slate-500'
      }`}
      onClick={onToggle}
    >
      <div className={`flex items-start gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
        <input
          type={inputType}
          id={option.id}
          checked={isSelected}
          onChange={onToggle}
          name={isRadio ? option.id.split('-')[0] : option.id}
          className={`${inputClasses} mt-1`}
          onClick={(e) => e.stopPropagation()} // prevent double toggle
        />
        <div className={`flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="flex justify-between items-start">
            <label htmlFor={option.id} className="font-bold text-gray-800 dark:text-gray-100 cursor-pointer">
              {option.name}
            </label>
            <div className={`text-lg font-bold text-blue-600 dark:text-blue-400 ${language === 'ar' ? 'mr-auto' : 'ml-auto'}`}>
              ${option.price.toLocaleString()}
              {option.hasQuantity && <span className="text-xs text-gray-500 dark:text-gray-400 font-normal"> {t.perPageSuffix}</span>}
            </div>
          </div>
          
          {option.items && isSelected && (
            <ul className={`mt-2 space-y-1 list-disc text-sm text-gray-600 dark:text-gray-300 ${language === 'ar' ? 'pr-6' : 'pl-6'}`}>
              {option.items.map((item, index) => (
                <li key={index}>{item.replace(/__/g, '')}</li>
              ))}
            </ul>
          )}

          {option.hasQuantity && isSelected && (
            <div 
              className="mt-4 flex items-center justify-center w-fit"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">{t.pagesLabel}</span>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityButtonClick(-1)}
                  disabled={quantity <= 1}
                  className="px-3 py-1 border border-gray-300 dark:border-slate-500 bg-white dark:bg-slate-700 rounded-l-md hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={t.decreaseQuantity}
                >
                  -
                </button>
                <span 
                  className="px-4 py-1 border-t border-b border-gray-300 dark:border-slate-500 bg-white dark:bg-slate-700 text-center w-16"
                  aria-label={t.currentQuantity}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityButtonClick(1)}
                  className="px-3 py-1 border border-gray-300 dark:border-slate-500 bg-white dark:bg-slate-700 rounded-r-md hover:bg-gray-50 dark:hover:bg-slate-600"
                  aria-label={t.increaseQuantity}
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingOption;