
import React, { useMemo } from 'react';
import PricingCategory, { CATEGORY_VISUALS, DEFAULT_VISUAL } from './PricingCategory';
import { ServiceCategory } from '../types';
import { Translation } from '../i18n';
import { Layers } from 'lucide-react';

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
  const categoryStats = useMemo(() => {
    return categories.map((category) => {
      const total = category.options.length;
      const selected = category.options.filter((opt) => selectedIds.includes(opt.id)).length;
      const percent = total > 0 ? Math.round((selected / total) * 100) : 0;
      const isComplete = total > 0 && selected === total;
      const hasSelection = selected > 0;
      const visual = CATEGORY_VISUALS[category.id] || DEFAULT_VISUAL;
      return {
        category,
        total,
        selected,
        percent,
        isComplete,
        hasSelection,
        visual,
      };
    });
  }, [categories, selectedIds]);

  const totalOptions = useMemo(() => {
    return categories.reduce((sum, c) => sum + c.options.length, 0);
  }, [categories]);

  const totalSelected = useMemo(() => {
    return categories.reduce((sum, c) => sum + c.options.filter((opt) => selectedIds.includes(opt.id)).length, 0);
  }, [categories, selectedIds]);

  const overallPercent = totalOptions > 0 ? Math.round((totalSelected / totalOptions) * 100) : 0;

  return (
    <section className="space-y-8">
      <div className={`p-4 md:p-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">{t.selectServicesTitle}</h2>
        <p className="mt-2 text-md text-slate-600 dark:text-slate-300">{t.selectServicesDescription}</p>
      </div>

      {/* Small Category Progress Indicators & Quick Navigation Strip */}
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 md:p-5 shadow-xs transition-colors"
        style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60">
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {language === 'ar' ? 'مؤشر تقدم اختيار الخدمات حسب الأقسام' : 'Category Selection Progress'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 font-mono">
            <span>
              {language === 'ar'
                ? `المحدد إجمالاً: ${totalSelected} من ${totalOptions} (${overallPercent}%)`
                : `Total: ${totalSelected} of ${totalOptions} selected (${overallPercent}%)`}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {categoryStats.map(({ category, total, selected, percent, isComplete, hasSelection, visual }) => (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                const el = document.getElementById(category.id);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              title={language === 'ar' ? `الانتقال إلى ${category.name}` : `Jump to ${category.name}`}
              className={`group flex flex-col justify-between p-2.5 rounded-xl border text-left transition-all hover:scale-[1.02] cursor-pointer ${
                isComplete
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : hasSelection
                  ? 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/80 text-slate-800 dark:text-slate-200'
                  : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
              }`}
              style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
            >
              <div className="flex items-center justify-between gap-1 w-full mb-1.5">
                <span className="font-bold truncate text-[11px] flex items-center gap-1">
                  <span>{visual.emoji}</span>
                  <span className="truncate">{category.name}</span>
                </span>
                <span className="font-mono text-[10px] font-bold flex-shrink-0">
                  {selected}/{total}
                </span>
              </div>
              
              {/* Category Mini Progress Bar */}
              <div 
                className="w-full bg-slate-200/80 dark:bg-slate-700/80 h-1.5 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={selected}
                aria-valuemin={0}
                aria-valuemax={total}
                aria-label={`${category.name} progress`}
              >
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isComplete
                      ? 'bg-emerald-500 dark:bg-emerald-400'
                      : hasSelection
                      ? visual.progressBarColor
                      : 'bg-transparent'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </button>
          ))}
        </div>
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
