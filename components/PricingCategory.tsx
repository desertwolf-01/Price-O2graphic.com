
import React from 'react';
import PricingOption from './PricingOption';
import type { ServiceCategory } from '../types';
import type { Translation } from '../i18n';
import { 
  Palette, 
  Award, 
  Globe, 
  Share2, 
  FileText, 
  Video, 
  Package, 
  Layers,
  LucideIcon,
  Check
} from 'lucide-react';

export interface CategoryVisualConfig {
  icon: LucideIcon;
  emoji: string;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
  progressBarColor: string;
}

export const CATEGORY_VISUALS: Record<string, CategoryVisualConfig> = {
  'graphic-design-services': {
    icon: Palette,
    emoji: '🎨',
    iconBg: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200/80 dark:border-indigo-800/80',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    badgeBg: 'bg-indigo-100/90 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-200 border-indigo-200 dark:border-indigo-800',
    progressBarColor: 'bg-indigo-600 dark:bg-indigo-400',
  },
  'exhibition-branding': {
    icon: Award,
    emoji: '🎪',
    iconBg: 'bg-purple-50 dark:bg-purple-950/60 border-purple-200/80 dark:border-purple-800/80',
    iconColor: 'text-purple-600 dark:text-purple-400',
    badgeBg: 'bg-purple-100/90 dark:bg-purple-950/80 text-purple-900 dark:text-purple-200 border-purple-200 dark:border-purple-800',
    progressBarColor: 'bg-purple-600 dark:bg-purple-400',
  },
  'website-design': {
    icon: Globe,
    emoji: '🌐',
    iconBg: 'bg-teal-50 dark:bg-teal-950/60 border-teal-200/80 dark:border-teal-800/80',
    iconColor: 'text-teal-600 dark:text-teal-400',
    badgeBg: 'bg-teal-100/90 dark:bg-teal-950/80 text-teal-900 dark:text-teal-200 border-teal-200 dark:border-teal-800',
    progressBarColor: 'bg-teal-600 dark:bg-teal-400',
  },
  'social-media-design': {
    icon: Share2,
    emoji: '📱',
    iconBg: 'bg-blue-50 dark:bg-blue-950/60 border-blue-200/80 dark:border-blue-800/80',
    iconColor: 'text-blue-600 dark:text-blue-400',
    badgeBg: 'bg-blue-100/90 dark:bg-blue-950/80 text-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800',
    progressBarColor: 'bg-blue-600 dark:bg-blue-400',
  },
  'corporate-materials': {
    icon: FileText,
    emoji: '📑',
    iconBg: 'bg-slate-100 dark:bg-slate-800 border-slate-300/80 dark:border-slate-700',
    iconColor: 'text-slate-700 dark:text-slate-300',
    badgeBg: 'bg-slate-200/90 dark:bg-slate-800 text-slate-900 dark:text-slate-200 border-slate-300 dark:border-slate-700',
    progressBarColor: 'bg-slate-600 dark:bg-slate-400',
  },
  'video-motion-graphics': {
    icon: Video,
    emoji: '🎬',
    iconBg: 'bg-rose-50 dark:bg-rose-950/60 border-rose-200/80 dark:border-rose-800/80',
    iconColor: 'text-rose-600 dark:text-rose-400',
    badgeBg: 'bg-rose-100/90 dark:bg-rose-950/80 text-rose-900 dark:text-rose-200 border-rose-200 dark:border-rose-800',
    progressBarColor: 'bg-rose-600 dark:bg-rose-400',
  },
  'packaging-design': {
    icon: Package,
    emoji: '📦',
    iconBg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200/80 dark:border-amber-800/80',
    iconColor: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-100/90 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-800',
    progressBarColor: 'bg-amber-600 dark:bg-amber-400',
  },
};

export const DEFAULT_VISUAL: CategoryVisualConfig = {
  icon: Layers,
  emoji: '✨',
  iconBg: 'bg-blue-50 dark:bg-blue-950/60 border-blue-200/80 dark:border-blue-800/80',
  iconColor: 'text-blue-600 dark:text-blue-400',
  badgeBg: 'bg-blue-100/90 dark:bg-blue-950/80 text-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800',
  progressBarColor: 'bg-blue-600 dark:bg-blue-400',
};

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
  const visual = CATEGORY_VISUALS[category.id] || DEFAULT_VISUAL;
  const IconComponent = visual.icon;

  const totalOptions = category.options.length;
  const selectedCount = category.options.filter(opt => selectedIds.includes(opt.id)).length;
  const progressPercentage = totalOptions > 0 ? Math.round((selectedCount / totalOptions) * 100) : 0;
  const isAllSelected = totalOptions > 0 && selectedCount === totalOptions;
  const hasSelection = selectedCount > 0;

  return (
    <div id={category.id} className="scroll-mt-8 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-800 print:shadow-none print:border-0 overflow-hidden transition-colors">
      <div className={`p-6 bg-slate-50/60 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs border ${visual.iconBg} ${visual.iconColor} transition-transform hover:scale-105`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${visual.badgeBg}`}>
                  <span>{visual.emoji}</span>
                  <span>{language === 'ar' ? `القسم ${categoryIndex}` : `Category ${categoryIndex}`}</span>
                </span>
                {category.isRadio && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {language === 'ar' ? 'خيار واحد' : 'Single choice'}
                  </span>
                )}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {category.name}
              </h3>
            </div>
          </div>

          {/* Progress Status Pill */}
          <div className="flex-shrink-0 self-start sm:self-center">
            {isAllSelected ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 shadow-xs">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                <span>{language === 'ar' ? `مكتمل (${selectedCount}/${totalOptions})` : `Completed (${selectedCount}/${totalOptions})`}</span>
              </span>
            ) : hasSelection ? (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${visual.badgeBg}`}>
                <span className="w-2 h-2 rounded-full bg-current opacity-80" />
                <span>{language === 'ar' ? `${selectedCount} من ${totalOptions} محدد` : `${selectedCount} of ${totalOptions} selected`}</span>
                <span className="font-mono text-[11px] font-bold">({progressPercentage}%)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs">
                <span>{language === 'ar' ? `0 من ${totalOptions} محدد` : `0 of ${totalOptions} selected`}</span>
              </span>
            )}
          </div>
        </div>

        {/* Category Progress Bar */}
        <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-700/70">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <span>{language === 'ar' ? 'نسبة اختيار خدمات هذا القسم:' : 'Selected in this category:'}</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {selectedCount} / {totalOptions}
              </span>
            </span>
            <span className={`font-mono font-bold text-xs ${isAllSelected ? 'text-emerald-600 dark:text-emerald-400' : hasSelection ? visual.iconColor : 'text-slate-500 dark:text-slate-400'}`}>
              {progressPercentage}%
            </span>
          </div>
          <div 
            className="w-full bg-slate-200/80 dark:bg-slate-700/80 h-2 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={selectedCount}
            aria-valuemin={0}
            aria-valuemax={totalOptions}
            aria-label={`${category.name} selection progress`}
          >
            <div 
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                isAllSelected 
                  ? 'bg-emerald-500 dark:bg-emerald-400' 
                  : hasSelection 
                  ? visual.progressBarColor 
                  : 'bg-transparent'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {category.description && (
          <div 
            className="mt-3.5 text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed" 
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
