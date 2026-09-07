
import React, { useState, useEffect } from 'react';
import type { ServiceOption } from '../types';
import { getUnitPrice } from '../constants';
import type { Translation } from '../i18n';
import { formatCurrency } from '../utils/format';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  FileCode2, 
  Lock, 
  Sparkles 
} from 'lucide-react';

interface PricingOptionProps {
  option: ServiceOption;
  displayNumber: string;
  isSelected: boolean;
  onToggle: () => void;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  isRadio?: boolean;
  language: 'ar' | 'en';
  t: Translation;
  isClientMode: boolean;
  isMinimalMode?: boolean;
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
            {label && <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>}
            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm bg-white dark:bg-slate-800 overflow-hidden h-9 transition-shadow hover:shadow-md" style={{ minWidth: '120px' }}>
                {/* Plus Button */}
                <button
                    onClick={(e) => { e.stopPropagation(); onQuantityChange(quantity + 1); }}
                    className="w-10 h-full flex items-center justify-center text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 active:scale-90 transition-all font-bold text-xl"
                    aria-label={t.increaseQuantity}
                >
                    +
                </button>
                
                {/* Number Input */}
                <div className="flex-1 bg-white dark:bg-slate-800 h-full flex items-center justify-center border-x border-slate-100 dark:border-slate-700">
                    <input
                        type="number"
                        value={quantity === 0 ? '' : quantity}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full bg-transparent border-none text-slate-900 dark:text-white font-bold text-center text-base focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0 transition-transform ${isPulsing ? 'animate-value-pop' : ''}`}
                        aria-label={t.currentQuantity}
                    />
                </div>

                {/* Minus Button */}
                <button
                    onClick={(e) => { e.stopPropagation(); onQuantityChange(Math.max(1, quantity - 1)); }}
                    disabled={quantity <= 1}
                    className="w-10 h-full flex items-center justify-center text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-red-500 disabled:opacity-20 active:scale-90 transition-all font-bold text-xl"
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
  displayNumber,
  isSelected,
  onToggle,
  quantity,
  onQuantityChange,
  isRadio,
  language,
  t,
  isClientMode,
  isMinimalMode = false,
}) => {
    const [pricePulse, setPricePulse] = useState(false);
    const [showStandards, setShowStandards] = useState(false);
    const selectorType = isRadio ? 'radio' : 'checkbox';
    const currentUnitPrice = getUnitPrice(option, quantity);
    const totalOptionPrice = currentUnitPrice * (option.hasQuantity ? quantity : 1);
    
    // Check if a tier discount is active
    const hasTierDiscount = option.hasQuantity && quantity > 1 && currentUnitPrice < option.price;
    
    // Identify monthly packages
    const isMonthlyService = option.quantityLabel === 'Months' || option.quantityLabel === 'أشهر';

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
            id={option.id}
            onClick={handleToggle}
            className={`
                scroll-mt-28 relative border transition-all duration-300 ease-out transform
                ${isMinimalMode 
                    ? 'p-3 sm:p-3.5 rounded-xl' 
                    : 'p-5 rounded-2xl duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]'
                }
                ${isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-500 dark:border-blue-500 shadow-md scale-[1.01] ring-2 ring-blue-500/20 z-10'
                    : `bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-blue-500/70 hover:shadow-md hover:translate-y-[-1px] hover:bg-slate-50 dark:hover:bg-slate-800`
                }
                ${isClientMode ? 'cursor-default pointer-events-none opacity-90' : 'cursor-pointer'}
            `}
            role={selectorType}
            aria-checked={isSelected}
            aria-label={option.name}
            tabIndex={isClientMode ? -1 : 0}
            onKeyDown={(e) => { if (!isClientMode && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); onToggle(); } }}
        >
            {option.ribbon && !isMinimalMode && (
                <div
                    className={`absolute top-0 ${language === 'ar' ? 'left-0 rounded-br-xl' : 'right-0 rounded-bl-xl'} px-3 py-1 text-[10px] sm:text-xs font-bold z-20 shadow-sm`}
                    style={{ backgroundColor: option.ribbon.color, color: '#0f172a' }}
                >
                    {option.ribbon.text}
                </div>
            )}
            
            <div className={`flex ${isMinimalMode ? 'items-center gap-3 sm:gap-4' : 'items-start gap-5'}`}>
                {/* Custom Checkbox/Radio */}
                <div className={`
                    flex-shrink-0 border-2 flex items-center justify-center transition-all duration-300 ease-out
                    ${isMinimalMode ? 'w-5 h-5' : 'w-6 h-6 mt-1'}
                    ${isRadio ? 'rounded-full' : 'rounded-lg'}
                    ${isSelected ? 'bg-blue-600 border-blue-600 text-white scale-105 shadow-xs shadow-blue-200 dark:shadow-blue-950' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 group-hover:border-blue-400'}
                `}>
                    <div className={`transform transition-all duration-300 ${isSelected ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-45'}`}>
                         {isRadio ? <div className="w-2 h-2 bg-white rounded-full shadow-sm"></div> : <CheckIcon className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                </div>

                <div className="flex-grow min-w-0">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-3">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className={`text-xs font-bold px-1.5 py-0.5 rounded shrink-0 ${isSelected ? 'bg-blue-200 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                                    {displayNumber}
                                </span>
                                <h4 className={`${isMinimalMode ? 'text-sm sm:text-base' : 'text-lg'} font-bold transition-colors duration-300 ${isSelected ? 'text-blue-900 dark:text-blue-200' : 'text-slate-800 dark:text-white'}`}>
                                    {option.name}
                                </h4>
                                {option.ribbon && isMinimalMode && (
                                    <span 
                                        className="text-[10px] font-bold px-2 py-0.5 rounded shrink-0 shadow-2xs"
                                        style={{ backgroundColor: option.ribbon.color, color: '#0f172a' }}
                                    >
                                        {option.ribbon.text}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Price and quantity in minimal mode */}
                        <div className={`flex items-center gap-3 shrink-0 ${language === 'ar' ? 'sm:flex-row-reverse' : 'sm:flex-row'} self-end sm:self-center`}>
                            {isMinimalMode && option.hasQuantity && !isClientMode && (
                                <div className="scale-90 origin-right" onClick={(e) => e.stopPropagation()}>
                                    <QuantitySelector quantity={quantity} onQuantityChange={onQuantityChange} t={t} label={option.quantityLabel} />
                                </div>
                            )}

                            <div className={`transition-all duration-300 ${language === 'ar' ? 'sm:text-left' : 'sm:text-right'}`}>
                                <div className={`${pricePulse ? 'animate-value-pop' : ''}`}>
                                    {option.hasQuantity && quantity > 1 && !isClientMode ? (
                                        <div className="flex flex-col items-end">
                                            <p className={`${isMinimalMode ? 'text-base sm:text-lg' : 'text-xl'} font-black ${isSelected ? 'text-blue-700 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                                                {formatCurrency(totalOptionPrice)}
                                            </p>
                                            <p className="text-[11px] text-slate-400 font-medium mt-0.5 flex items-center justify-end gap-1">
                                                <span>({quantity} ×</span>
                                                {hasTierDiscount && (
                                                    <span className="text-red-400 line-through decoration-red-400/70">
                                                        {formatCurrency(option.price)}
                                                    </span>
                                                )}
                                                <span className={hasTierDiscount ? 'text-green-600 dark:text-green-400 font-bold' : ''}>
                                                    {formatCurrency(currentUnitPrice)}
                                                </span>
                                                <span>)</span>
                                            </p>
                                        </div>
                                    ) : (
                                        <p className={`${isMinimalMode ? 'text-base sm:text-lg' : 'text-xl'} font-black ${isSelected ? 'text-blue-700 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                                            {formatCurrency(currentUnitPrice)}
                                            {option.hasQuantity && <span className="text-xs text-slate-400 font-normal"> {option.priceSuffix || t.perPageSuffix}</span>}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Descriptions and deliverables: HIDDEN in minimal mode */}
                    {!isMinimalMode && option.description && (
                        <div 
                            className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: option.description }}
                        />
                    )}

                    {!isMinimalMode && option.items && (
                        <ul className={`mt-3 text-sm text-slate-600 dark:text-slate-300 space-y-1.5 ${language === 'ar' ? 'pr-4 border-r-2 border-slate-200 dark:border-slate-700' : 'pl-4 border-l-2 border-slate-200 dark:border-slate-700'} transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-85'}`}>
                            {option.items.map((item, index) => (
                                <li 
                                    key={index} 
                                    className="leading-relaxed" 
                                    dangerouslySetInnerHTML={{ __html: item.replace(/__(.*?)__/g, '<strong class="text-slate-800 dark:text-slate-100 font-bold">$1</strong>') }} 
                                />
                            ))}
                        </ul>
                    )}

                    {/* Delivery Standards & Commercial Guarantee Drawer: HIDDEN in minimal mode */}
                    {!isMinimalMode && (
                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowStandards(!showStandards);
                                }}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 cursor-pointer"
                            >
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                <span>{language === 'ar' ? 'معايير التسليم والضمان المعتمدة' : 'Delivery Standards & Quality Guarantee'}</span>
                                {showStandards ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                            </button>

                            {showStandards && (
                                <div 
                                    onClick={(e) => e.stopPropagation()}
                                    className="mt-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2 animate-fadeIn"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <div className="flex items-start gap-2 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200/70 dark:border-slate-700 shadow-xs">
                                            <FileCode2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                                            <span>
                                                <strong className="text-slate-800 dark:text-slate-100">{language === 'ar' ? 'ملفات المصدر الأصلية:' : 'Source Files:'}</strong> {language === 'ar' ? 'تسليم ملفات الفكتور المفتوحة AI, SVG, PSD, PDF بدقة طباعة 300DPI.' : '100% open vector files (AI, SVG, PSD, PDF) at 300 DPI.'}
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-2 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200/70 dark:border-slate-700 shadow-xs">
                                            <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                            <span>
                                                <strong className="text-slate-800 dark:text-slate-100">{language === 'ar' ? 'ملكية تجارية تامة:' : 'Commercial Rights:'}</strong> {language === 'ar' ? 'تنازل كامل عن حقوق الملكية الفكرية والتجارية بدون أي قيود.' : 'Full 100% intellectual & commercial ownership transfer.'}
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-2 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200/70 dark:border-slate-700 shadow-xs">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                                            <span>
                                                <strong className="text-slate-800 dark:text-slate-100">{language === 'ar' ? 'تسليم مرحلي منظم:' : 'Milestone Delivery:'}</strong> {language === 'ar' ? 'مراحل مراجعة وتعديلات مرنة حتى الاعتماد النهائي.' : 'Step-by-step review cycles until 100% sign-off.'}
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-2 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200/70 dark:border-slate-700 shadow-xs">
                                            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                            <span>
                                                <strong className="text-slate-800 dark:text-slate-100">{language === 'ar' ? 'حماية السرية (NDA):' : 'Confidentiality:'}</strong> {language === 'ar' ? 'التزام تام بحماية سرية البيانات وتوقيع اتفاقية سرية عند الطلب.' : 'Strict data confidentiality with NDA available on request.'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Standard Full View Quantity Selector: only in standard mode */}
                    {!isMinimalMode && (
                        <div className="mt-5 flex flex-wrap items-center gap-4">
                            {option.hasQuantity && !isClientMode && (
                                <div className="flex flex-col gap-2">
                                    <QuantitySelector quantity={quantity} onQuantityChange={onQuantityChange} t={t} label={option.quantityLabel} />
                                    {isMonthlyService && (
                                        <div className={`text-xs font-bold flex items-center gap-1.5 transition-colors ${quantity >= 3 ? 'text-green-600' : 'text-orange-500'}`}>
                                            {quantity >= 3 ? (
                                                <>
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {t.monthlyDiscountApplied}
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-3.5 h-3.5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                    {t.monthlyDiscountHint}
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Print-only view */}
            {isSelected && (
                <div className="hidden print:block pt-3 border-t border-slate-100 mt-3">
                    <div className="flex justify-between items-baseline">
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-bold text-gray-400">{displayNumber}</span>
                           <h4 className="font-bold text-sm text-black">{option.name}</h4>
                        </div>
                        <p className="font-semibold text-sm text-black">
                            {option.hasQuantity ? `${quantity} x ${formatCurrency(currentUnitPrice)}` : `${formatCurrency(currentUnitPrice)}`}
                        </p>
                    </div>
                    {option.description && (
                         <div 
                            className="mt-1 text-xs text-gray-500"
                            dangerouslySetInnerHTML={{ __html: option.description }}
                        />
                    )}
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