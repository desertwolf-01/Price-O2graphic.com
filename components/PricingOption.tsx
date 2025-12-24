import React from 'react';
import type { ServiceOption } from '../types';
import { getUnitPrice } from '../constants';
import type { Translation } from '../i18n';

interface PricingOptionProps {
  option: ServiceOption;
  isSelected: boolean;
  onToggle: () => void;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  isRadio?: boolean;
  language: 'ar' | 'en';
  t: Translation;
  isClientMode: boolean;
}

const CheckIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const QuantitySelector: React.FC<{
    quantity: number,
    onQuantityChange: (newQuantity: number) => void,
    t: Translation,
    label?: string,
}> = ({ quantity, onQuantityChange, t, label }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val)) {
            onQuantityChange(val);
        } else if (e.target.value === '') {
            onQuantityChange(0); // Allow typing from scratch
        }
    };

    const handleBlur = () => {
        if (quantity < 1) onQuantityChange(1);
    };

    return (
        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
            <div className="flex items-center border border-slate-200 rounded-lg shadow-sm bg-white overflow-hidden h-8" style={{ minWidth: '110px' }}>
                {/* Plus Button (Matches image position) */}
                <button
                    onClick={(e) => { e.stopPropagation(); onQuantityChange(quantity + 1); }}
                    className="w-8 h-full flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-blue-600 transition-colors font-bold text-lg"
                    aria-label={t.increaseQuantity}
                >
                    +
                </button>
                
                {/* Number Input with White Background and Black Text */}
                <div className="flex-1 bg-white h-full flex items-center justify-center border-x border-slate-100">
                    <input
                        type="number"
                        value={quantity === 0 ? '' : quantity}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className="w-full bg-transparent border-none text-slate-900 font-bold text-center text-sm focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0"
                        aria-label={t.currentQuantity}
                    />
                </div>

                {/* Minus Button (Matches image position) */}
                <button
                    onClick={(e) => { e.stopPropagation(); onQuantityChange(Math.max(1, quantity - 1)); }}
                    disabled={quantity <= 1}
                    className="w-8 h-full flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-red-500 disabled:opacity-20 transition-colors font-bold text-lg"
                    aria-label={t.decreaseQuantity}
                >
                    -
                </button>
            </div>
        </div>
    );
};


const PricingOption: React.FC<PricingOptionProps> = ({
  option,
  isSelected,
  onToggle,
  quantity,
  onQuantityChange,
  isRadio,
  language,
  t,
  isClientMode,
}) => {
    const selectorType = isRadio ? 'radio' : 'checkbox';
    const currentUnitPrice = getUnitPrice(option, quantity);
    const totalOptionPrice = currentUnitPrice * (option.hasQuantity ? quantity : 1);

    const handleToggle = () => {
        if (!isClientMode) {
            onToggle();
        }
    };

    return (
        <div
            onClick={handleToggle}
            className={`
                relative p-4 border rounded-xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform
                ${isSelected
                    ? 'bg-blue-50 border-blue-500 shadow-lg scale-[1.02] ring-1 ring-blue-300 z-10'
                    : `bg-white border-slate-200 ${!isClientMode ? 'hover:border-blue-300 hover:shadow-md hover:scale-[1.01] hover:bg-slate-50' : ''}`
                }
                ${isClientMode ? 'cursor-default' : 'cursor-pointer'}
            `}
            role={selectorType}
            aria-checked={isSelected}
            aria-label={option.name}
            tabIndex={isClientMode ? -1 : 0}
            onKeyDown={(e) => { if (!isClientMode && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); onToggle(); } }}
        >
            <div className="flex items-start gap-4">
                {/* Custom Checkbox/Radio */}
                <div className={`
                    flex-shrink-0 w-5 h-5 mt-1 border-2 flex items-center justify-center transition-all duration-300 ease-out
                    ${isRadio ? 'rounded-full' : 'rounded'}
                    ${isSelected ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-sm' : 'bg-white border-slate-300 group-hover:border-blue-400'}
                    ${isClientMode ? 'opacity-70' : ''}
                `}>
                    <div className={`transform transition-all duration-200 ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                         {isRadio ? <div className="w-2 h-2 bg-white rounded-full"></div> : <CheckIcon />}
                    </div>
                </div>

                <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                        <div className="flex items-center gap-3">
                            <h4 className={`font-bold transition-colors duration-300 ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>{option.name}</h4>
                        </div>
                        <div className={`font-semibold transition-colors duration-300 ${isSelected ? 'text-blue-900' : 'text-slate-900'} ${language === 'ar' ? 'sm:text-left' : 'sm:text-right'}`}>
                            {option.hasQuantity && quantity > 1 && !isClientMode ? (
                                <div>
                                    <p className="text-lg">${totalOptionPrice.toLocaleString()}</p>
                                    <p className="text-xs text-slate-500 font-normal mt-1">
                                        ({quantity} &times; ${currentUnitPrice.toLocaleString()})
                                    </p>
                                </div>
                            ) : (
                                <p className="text-lg">
                                    ${currentUnitPrice.toLocaleString()}
                                    {option.hasQuantity && <span className="text-sm text-slate-500 font-normal"> {option.priceSuffix || t.perPageSuffix}</span>}
                                </p>
                            )}
                        </div>
                    </div>
                    
                    {option.items && (
                        <ul className={`mt-2 text-sm text-slate-600 space-y-1 ${language === 'ar' ? 'pr-4' : 'pl-4'} list-disc list-inside`}>
                            {option.items.map((item, index) => (
                                <li key={index} dangerouslySetInnerHTML={{ __html: item.replace(/__(.*?)__/g, '<strong>$1</strong>') }} />
                            ))}
                        </ul>
                    )}

                    <div className="mt-4 flex flex-wrap items-center gap-4">
                        {option.hasQuantity && !isClientMode && (
                            <QuantitySelector quantity={quantity} onQuantityChange={onQuantityChange} t={t} label={option.quantityLabel} />
                        )}
                    </div>
                </div>
            </div>

            {/* Print-only view */}
            {isSelected && (
                <div className="hidden print:block pt-2">
                    <div className="flex justify-between items-baseline">
                        <div className="flex items-center gap-2">
                           <h4 className="font-bold text-sm text-black">{option.name}</h4>
                        </div>
                        <p className="font-semibold text-sm text-black">
                            {option.hasQuantity ? `${quantity} x $${currentUnitPrice.toLocaleString()}` : `$${currentUnitPrice.toLocaleString()}`}
                        </p>
                    </div>
                    {option.hasQuantity && (
                        <div className="flex justify-end">
                            <p className="font-bold text-sm text-black">= ${totalOptionPrice.toLocaleString()}</p>
                        </div>
                    )}
                    {option.items && (
                        <ul className="mt-1 text-xs text-gray-700 space-y-0.5 list-disc list-inside">
                             {option.items.map((item, index) => (
                                <li key={index} dangerouslySetInnerHTML={{ __html: item.replace(/__(.*?)__/g, '<strong>$1</strong>') }} />
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default PricingOption;