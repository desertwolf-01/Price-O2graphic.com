import React, { useState, useEffect } from 'react';
import type { ServiceOption } from '../types';
import { getUnitPrice } from '../constants';
import type { Translation } from '../i18n';
import { formatCurrency } from '../utils/format';

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
    const [isPulsing, setIsPulsing] = useState(false);

    useEffect(() => {
        setIsPulsing(true);
        const timer = setTimeout(() => setIsPulsing(false), 300);
        return () => clearTimeout(timer);
    }, [quantity]);

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
            <div className="flex items-center border border-slate-200 rounded-lg shadow-sm bg-white overflow-hidden h-9 transition-shadow hover:shadow-md" style={{ minWidth: '120px' }}>
                {/* Plus Button */}
                <button
                    onClick={(e) => { e.stopPropagation(); onQuantityChange(quantity + 1); }}
                    className="w-10 h-full flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-blue-600 active:scale-90 transition-all font-bold text-xl"
                    aria-label={t.increaseQuantity}
                >
                    +
                </button>
                
                {/* Number Input */}
                <div className="flex-1 bg-white h-full flex items-center justify-center border-x border-slate-100">
                    <input
                        type="number"
                        value={quantity === 0 ? '' : quantity}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full bg-transparent border-none text-slate-900 font-bold text-center text-base focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0 transition-transform ${isPulsing ? 'animate-value-pop' : ''}`}
                        aria-label={t.currentQuantity}
                    />
                </div>

                {/* Minus Button */}
                <button
                    onClick={(e) => { e.stopPropagation(); onQuantityChange(Math.max(1, quantity - 1)); }}
                    disabled={quantity <= 1}
                    className="w-10 h-full flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-red-500 disabled:opacity-20 active:scale-90 transition-all font-bold text-xl"
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
    const [pricePulse, setPricePulse] = useState(false);
    const selectorType = isRadio ? 'radio' : 'checkbox';
    const currentUnitPrice = getUnitPrice(option, quantity);
    const totalOptionPrice = currentUnitPrice * (option.hasQuantity ? quantity : 1);

    useEffect(() => {
        setPricePulse(true);
        const timer = setTimeout(() => setPricePulse(false), 300);
        return () => clearTimeout(timer);
    }, [totalOptionPrice, isSelected]); // Pulsing on value change OR selection state change

    const handleToggle = () => {
        if (!isClientMode) {
            onToggle();
        }
    };

    return (
        <div
            onClick={handleToggle}
            className={`
                relative p-5 border rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform
                ${isSelected
                    ? 'bg-blue-50 border-blue-500 shadow-xl scale-[1.015] ring-2 ring-blue-500/20 z-10'
                    : `bg-white border-slate-200 hover:border-blue-300 hover:shadow-lg hover:translate-y-[-2px] hover:bg-slate-50`
                }
                ${isClientMode ? 'cursor-default pointer-events-none opacity-90' : 'cursor-pointer'}
            `}
            role={selectorType}
            aria-checked={isSelected}
            aria-label={option.name}
            tabIndex={isClientMode ? -1 : 0}
            onKeyDown={(e) => { if (!isClientMode && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); onToggle(); } }}
        >
            <div className="flex items-start gap-5">
                {/* Custom Checkbox/Radio */}
                <div className={`
                    flex-shrink-0 w-6 h-6 mt-1 border-2 flex items-center justify-center transition-all duration-300 ease-out
                    ${isRadio ? 'rounded-full' : 'rounded-lg'}
                    ${isSelected ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-md shadow-blue-200' : 'bg-white border-slate-300 group-hover:border-blue-400'}
                `}>
                    <div className={`transform transition-all duration-300 ${isSelected ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-45'}`}>
                         {isRadio ? <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm"></div> : <CheckIcon className="h-4 w-4 stroke-[3]" />}
                    </div>
                </div>

                <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
                        <div className="flex-1">
                            <h4 className={`text-lg font-bold transition-colors duration-300 ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                                {option.name}
                            </h4>
                        </div>
                        <div className={`transition-all duration-300 ${language === 'ar' ? 'sm:text-left' : 'sm:text-right'}`}>
                            <div className={`${pricePulse ? 'animate-value-pop' : ''}`}>
                                {option.hasQuantity && quantity > 1 && !isClientMode ? (
                                    <div className="flex flex-col items-end">
                                        <p className={`text-xl font-black ${isSelected ? 'text-blue-700' : 'text-slate-900'}`}>
                                            {formatCurrency(totalOptionPrice)}
                                        </p>
                                        <p className="text-xs text-slate-400 font-medium mt-0.5">
                                            ({quantity} × {formatCurrency(currentUnitPrice)})
                                        </p>
                                    </div>
                                ) : (
                                    <p className={`text-xl font-black ${isSelected ? 'text-blue-700' : 'text-slate-900'}`}>
                                        {formatCurrency(currentUnitPrice)}
                                        {option.hasQuantity && <span className="text-sm text-slate-400 font-normal"> {option.priceSuffix || t.perPageSuffix}</span>}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {option.items && (
                        <ul className={`mt-3 text-sm text-slate-600 space-y-1.5 ${language === 'ar' ? 'pr-4 border-r-2 border-slate-100' : 'pl-4 border-l-2 border-slate-100'} transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-80'}`}>
                            {option.items.map((item, index) => (
                                <li key={index} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item.replace(/__(.*?)__/g, '<strong class="text-slate-800 font-bold">$1</strong>') }} />
                            ))}
                        </ul>
                    )}

                    <div className="mt-5 flex flex-wrap items-center gap-4">
                        {option.hasQuantity && !isClientMode && (
                            <QuantitySelector quantity={quantity} onQuantityChange={onQuantityChange} t={t} label={option.quantityLabel} />
                        )}
                    </div>
                </div>
            </div>

            {/* Print-only view */}
            {isSelected && (
                <div className="hidden print:block pt-3 border-t border-slate-100 mt-3">
                    <div className="flex justify-between items-baseline">
                        <div className="flex items-center gap-2">
                           <h4 className="font-bold text-sm text-black">{option.name}</h4>
                        </div>
                        <p className="font-semibold text-sm text-black">
                            {option.hasQuantity ? `${quantity} x ${formatCurrency(currentUnitPrice)}` : `${formatCurrency(currentUnitPrice)}`}
                        </p>
                    </div>
                    {option.hasQuantity && (
                        <div className="flex justify-end">
                            <p className="font-bold text-sm text-black">= {formatCurrency(totalOptionPrice)}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PricingOption;
