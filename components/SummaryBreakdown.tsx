import React from 'react';
import type { ServiceOption, ServiceCategory } from '../types';
import type { Translation } from '../i18n';
import { getUnitPrice } from '../constants';
import { formatCurrency } from '../utils/format';
import SecurityBadge from './SecurityBadge';
import { 
  Receipt, 
  ShoppingBag, 
  Tag, 
  Trash2, 
  Percent, 
  Sparkles, 
  ArrowUpRight,
  Minus,
  Plus
} from 'lucide-react';

const CATEGORY_EMOJIS: Record<string, string> = {
  'graphic-design-services': '🎨',
  'exhibition-branding': '🎪',
  'website-design': '🌐',
  'social-media-design': '📱',
  'corporate-materials': '📑',
  'video-motion-graphics': '🎬',
  'packaging-design': '📦',
};

interface SummaryBreakdownProps {
  selectedOptions: ServiceOption[];
  quantities: { [id: string]: number };
  categories: ServiceCategory[];
  subTotalPrice: number;
  discount: number;
  discountPercentage: number;
  appliedCoupon: { code: string; discount: number } | null;
  finalTotalPrice: number;
  language: 'ar' | 'en';
  t: Translation;
  onServiceToggle?: (optionId: string, category: ServiceCategory) => void;
  onQuantityChange?: (optionId: string, newQuantity: number) => void;
}

const SummaryBreakdown: React.FC<SummaryBreakdownProps> = ({
  selectedOptions,
  quantities,
  categories,
  subTotalPrice,
  discount,
  discountPercentage,
  appliedCoupon,
  finalTotalPrice,
  language,
  t,
  onServiceToggle,
  onQuantityChange,
}) => {
  const isArabic = language === 'ar';

  const getCategoryForOption = (optionId: string): ServiceCategory | undefined => {
    return categories.find(cat => cat.options.some(opt => opt.id === optionId));
  };

  const getOptionHierarchy = (optionId: string): string => {
    for (let i = 0; i < categories.length; i++) {
      const cat = categories[i];
      const optIdx = cat.options.findIndex(o => o.id === optionId);
      if (optIdx !== -1) {
        return `${i + 1}.${optIdx + 1}`;
      }
    }
    return '';
  };

  // Base bundle discount (5% per active category)
  let activeCategoriesCount = 0;
  categories.forEach(cat => {
    if (cat.options.some(opt => selectedOptions.some(sel => sel.id === opt.id))) {
      activeCategoriesCount++;
    }
  });
  const categoryDiscountPercent = activeCategoriesCount * 5;
  const categoryDiscountAmount = (subTotalPrice * categoryDiscountPercent) / 100;

  const couponDiscountPercent = appliedCoupon ? appliedCoupon.discount : 0;
  const couponDiscountAmount = (subTotalPrice * couponDiscountPercent) / 100;

  if (selectedOptions.length === 0) {
    return (
      <div 
        id="summary-breakdown-card"
        className={`p-6 md:p-8 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 shadow-sm text-center ${isArabic ? 'text-right' : 'text-left'} print:hidden`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                {isArabic ? 'ملخص الخدمات وتفاصيل التكلفة' : 'Summary Breakdown'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {isArabic 
                  ? 'لم يتم تحديد أي خدمات حتى الآن. حدد الخدمات المناسبة لك من القوائم أعلاه لعرض التفاصيل وحساب الخصم.' 
                  : 'No services selected yet. Choose your preferred packages above to view itemized pricing and savings.'}
              </p>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {isArabic ? 'بانتظار الاختيار' : 'Awaiting selection'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div 
      id="summary-breakdown-card"
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200/90 dark:border-slate-800 overflow-hidden transition-all duration-300"
    >
      {/* Header */}
      <div className={`p-5 md:p-6 bg-gradient-to-r from-slate-50 via-blue-50/20 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 ${isArabic ? 'text-right' : 'text-left'}`}>
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {isArabic ? 'ملخص الخدمات وتفاصيل الحساب' : 'Summary Breakdown'}
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {selectedOptions.length} {isArabic ? 'خدمة مختارة' : 'Selected items'}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/90 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                🔒 {isArabic ? 'عرض أسعار سري' : 'Confidential'}
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {isArabic 
                ? 'قائمة مفصلة بالخدمات المختارة، كمياتها الفردية، والخصومات المستحقة قبل إرسال العرض.'
                : 'Itemized overview of your selected services, individual quantities, and applied discounts.'}
            </p>
          </div>
        </div>

        {discountPercentage > 0 && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            <span>
              {isArabic ? `تم تفعيل خصم إجمالي ${discountPercentage}%` : `Total ${discountPercentage}% Discount Active`}
            </span>
          </div>
        )}
      </div>

      {/* Selected Services Itemized List */}
      <div className="p-5 md:p-6 divide-y divide-slate-100 dark:divide-slate-800">
        <div className="space-y-3 pb-4">
          {selectedOptions.map((option) => {
            const cat = getCategoryForOption(option.id);
            const hierarchy = getOptionHierarchy(option.id);
            const quantity = option.hasQuantity ? (quantities[option.id] || 1) : 1;
            const unitPrice = getUnitPrice(option, quantity);
            const itemTotal = unitPrice * quantity;
            const emoji = cat ? CATEGORY_EMOJIS[cat.id] || '✨' : '✨';

            return (
              <div 
                key={option.id}
                id={`summary-item-${option.id}`}
                className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all duration-200"
              >
                {/* Service Details */}
                <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                  <span className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center flex-shrink-0 shadow-xs">
                    {hierarchy || '•'}
                  </span>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm md:text-base font-bold text-slate-800 dark:text-white tracking-tight">
                        {option.name}
                      </h4>
                      {cat && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-200/70 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          <span>{emoji}</span>
                          <span>{cat.name}</span>
                        </span>
                      )}
                    </div>

                    {/* Quantity Indicator */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {option.hasQuantity ? (
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {isArabic ? 'الكمية:' : 'Quantity:'} <strong className="text-blue-700 dark:text-blue-400 font-bold">{quantity}</strong> {option.quantityLabel || ''} 
                          {quantity > 1 && (
                            <span className="text-slate-400 dark:text-slate-500 text-xs mr-1">
                              ({formatCurrency(unitPrice)} {isArabic ? 'للوحدة' : '/ unit'})
                            </span>
                          )}
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500">
                          {isArabic ? 'خدمة قياسية متكاملة' : 'Single Package'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pricing & Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-slate-700">
                  {/* Inline Quantity Controls if option supports quantity */}
                  {option.hasQuantity && onQuantityChange && (
                    <div className="inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xs p-0.5 print:hidden">
                      <button
                        type="button"
                        onClick={() => onQuantityChange(option.id, Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="p-1 rounded text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-800 dark:text-white">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onQuantityChange(option.id, quantity + 1)}
                        className="p-1 rounded text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Price */}
                  <div className={`text-right ${isArabic ? 'text-left' : 'text-right'}`}>
                    <span className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                      {formatCurrency(itemTotal)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  {onServiceToggle && cat && (
                    <button
                      type="button"
                      onClick={() => onServiceToggle(option.id, cat)}
                      className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors print:hidden"
                      title={isArabic ? 'إزالة الخدمة من العرض' : 'Remove service'}
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Financial Breakdown Subsection */}
        <div className="pt-5 space-y-3">
          {/* Subtotal */}
          <div className="flex items-center justify-between text-sm md:text-base text-slate-700 dark:text-slate-300">
            <span className="font-semibold">
              {t.subtotal || (isArabic ? 'المجموع الفرعي:' : 'Subtotal:')}
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {formatCurrency(subTotalPrice)}
            </span>
          </div>

          {/* Active Categories Bundle Discount */}
          {categoryDiscountPercent > 0 && (
            <div className="flex items-center justify-between text-xs md:text-sm text-emerald-700 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/50 px-3.5 py-2 rounded-xl border border-emerald-200/70 dark:border-emerald-800/70">
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <Percent className="w-4 h-4" />
                <span>
                  {isArabic 
                    ? `خصم حزمة الأقسام المتعددة (${activeCategoriesCount} أقسام × 5% = ${categoryDiscountPercent}%):`
                    : `Multi-Category Bundle Discount (${activeCategoriesCount} categories × 5% = ${categoryDiscountPercent}%):`}
                </span>
              </span>
              <span className="font-bold">
                -{formatCurrency(categoryDiscountAmount)}
              </span>
            </div>
          )}

          {/* Applied Coupon Discount */}
          {appliedCoupon && (
            <div className="flex items-center justify-between text-xs md:text-sm text-blue-700 dark:text-blue-300 bg-blue-50/80 dark:bg-blue-950/50 px-3.5 py-2 rounded-xl border border-blue-200/70 dark:border-blue-800/70">
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <Tag className="w-4 h-4" />
                <span>
                  {isArabic 
                    ? `كوبون الخصم المطبق (${appliedCoupon.code} - ${appliedCoupon.discount}%):`
                    : `Promo Coupon Applied (${appliedCoupon.code} - ${appliedCoupon.discount}%):`}
                </span>
              </span>
              <span className="font-bold">
                -{formatCurrency(couponDiscountAmount)}
              </span>
            </div>
          )}

          {/* Total Discount Summary Line */}
          {discount > 0 && (
            <div className="flex items-center justify-between text-xs md:text-sm text-slate-600 dark:text-slate-400 pt-1">
              <span className="font-medium">
                {isArabic ? `إجمالي الخصومات المستحقة (${discountPercentage}%):` : `Total Applied Savings (${discountPercentage}%):`}
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                -{formatCurrency(discount)}
              </span>
            </div>
          )}

          {/* Final Net Amount */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-base md:text-lg font-bold text-slate-900 dark:text-white block">
                {t.totalPrice || (isArabic ? 'المجموع النهائي الصافي:' : 'Final Net Total:')}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {isArabic ? 'شامل كافة الخدمات والخصومات المحتسبة' : 'All services and discounts included'}
              </span>
            </div>
            <div className={`text-right ${isArabic ? 'text-left' : 'text-right'}`}>
              <span className="text-2xl md:text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
                {formatCurrency(finalTotalPrice)}
              </span>
            </div>
          </div>

          {/* Proprietary & Confidential Rate Card Notice */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <SecurityBadge language={language} variant="card" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryBreakdown;
