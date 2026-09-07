import React from 'react';
import { SMART_PRESETS, SmartPreset } from '../smartPresets';
import { Sparkles, Check, ArrowRight, ArrowLeft, Layers, Zap } from 'lucide-react';

interface SmartPresetsBarProps {
  language: 'ar' | 'en';
  selectedIds: string[];
  onApplyPreset: (serviceIds: string[], quantities?: { [id: string]: number }) => void;
  onClearSelection?: () => void;
}

const SmartPresetsBar: React.FC<SmartPresetsBarProps> = ({
  language,
  selectedIds,
  onApplyPreset,
  onClearSelection,
}) => {
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div 
      id="smart-presets-container"
      className="bg-gradient-to-br from-slate-50 to-blue-50/40 dark:from-slate-900/90 dark:to-[#002240]/40 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs transition-colors"
    >
      {/* Header section */}
      <div 
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4"
        style={{ direction: isArabic ? 'rtl' : 'ltr' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#003057] dark:bg-[#50B0CE]/20 text-[#50B0CE] dark:text-[#C5F1FF] flex items-center justify-center shadow-xs">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                {isArabic ? 'الباقات الذكية الجاهزة (Smart Presets)' : 'Smart Presets'}
              </h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                {isArabic ? 'نقرة واحدة' : '1-Click'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isArabic 
                ? 'اختر باقة من الباقات الموصى بها لتفعيل جميع الخدمات المطابقة تلقائياً وتوفير الوقت' 
                : 'Select pre-defined curated bundles that automatically toggle all relevant services on.'}
            </p>
          </div>
        </div>

        {selectedIds.length > 0 && onClearSelection && (
          <button
            type="button"
            onClick={onClearSelection}
            className="text-xs font-semibold text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 self-start sm:self-center transition-colors cursor-pointer"
          >
            {isArabic ? 'إلغاء تحديد الكل' : 'Clear all'}
          </button>
        )}
      </div>

      {/* Preset cards grid */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5"
        style={{ direction: isArabic ? 'rtl' : 'ltr' }}
      >
        {SMART_PRESETS.map((preset) => {
          // Check if all services in this preset are currently active
          const isFullyActive = preset.serviceIds.every(id => selectedIds.includes(id));
          const matchCount = preset.serviceIds.filter(id => selectedIds.includes(id)).length;
          const isPartiallyActive = !isFullyActive && matchCount > 0;

          return (
            <div
              key={preset.id}
              onClick={() => onApplyPreset(preset.serviceIds, preset.quantities)}
              className={`
                group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer select-none
                ${isFullyActive
                  ? 'bg-blue-50/90 dark:bg-[#003057]/90 border-blue-500 dark:border-[#50B0CE] ring-2 ring-blue-500/20 shadow-md scale-[1.01]'
                  : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-blue-400 dark:hover:border-[#50B0CE]/60 hover:shadow-md hover:-translate-y-0.5'
                }
              `}
            >
              {/* Top Row: Badge & Status */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${preset.colorScheme.badgeBg} ${preset.colorScheme.badgeText}`}>
                    {isArabic ? preset.badgeAr : preset.badgeEn}
                  </span>
                  {isFullyActive ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>{isArabic ? 'مُفعّلة' : 'Active'}</span>
                    </span>
                  ) : isPartiallyActive ? (
                    <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-300">
                      {matchCount}/{preset.serviceIds.length} {isArabic ? 'محدد' : 'active'}
                    </span>
                  ) : null}
                </div>

                {/* Preset Title */}
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#50B0CE] transition-colors line-clamp-1">
                  {isArabic ? preset.nameAr : preset.nameEn}
                </h4>

                {/* Subtitle / Services summary */}
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                  {isArabic ? preset.subtitleAr : preset.subtitleEn}
                </p>
              </div>

              {/* Bottom Action Row */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-[11px]">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{preset.serviceIds.length} {isArabic ? 'خدمات' : 'services'}</span>
                </div>

                <div className={`flex items-center gap-1 font-bold text-xs ${isFullyActive ? 'text-blue-600 dark:text-[#50B0CE]' : 'text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-[#50B0CE]'}`}>
                  <span>{isFullyActive ? (isArabic ? 'إعادة التطبيق' : 'Re-apply') : (isArabic ? 'تطبيق الباقة' : 'Apply')}</span>
                  <ArrowIcon className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SmartPresetsBar;
