
import React, { useMemo, useState } from 'react';
import PricingCategory, { CATEGORY_VISUALS, DEFAULT_VISUAL } from './PricingCategory';
import SmartPresetsBar from './SmartPresetsBar';
import { ServiceCategory } from '../types';
import { Translation } from '../i18n';
import { Layers, Search, X, Filter, SearchX, SlidersHorizontal } from 'lucide-react';

interface PricingSectionProps {
  categories: ServiceCategory[];
  selectedIds: string[];
  onServiceToggle: (optionId: string, category: ServiceCategory) => void;
  quantities: { [id: string]: number };
  onQuantityChange: (optionId: string, newQuantity: number) => void;
  language: 'ar' | 'en';
  t: Translation;
  isClientMode: boolean;
  isMinimalMode?: boolean;
  onToggleMinimalMode?: () => void;
  onApplyPreset?: (serviceIds: string[], quantities?: { [id: string]: number }) => void;
  onClearSelection?: () => void;
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
  isMinimalMode = false,
  onToggleMinimalMode,
  onApplyPreset,
  onClearSelection,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const isSearchActive = normalizedQuery.length > 0;

  // Search matches per category
  const categoryMatches = useMemo(() => {
    return categories.map((category, index) => {
      if (!isSearchActive) {
        return {
          category,
          originalIndex: index + 1,
          matchingOptionIds: category.options.map((o) => o.id),
          matchCount: category.options.length,
          hasMatches: true,
        };
      }

      const categoryNameMatches = category.name.toLowerCase().includes(normalizedQuery);

      const matchingOptionIds = category.options
        .filter((opt) => {
          if (categoryNameMatches) return true;
          const nameMatch = opt.name.toLowerCase().includes(normalizedQuery);
          const descMatch = opt.description?.toLowerCase().includes(normalizedQuery) || false;
          const itemsMatch = opt.items?.some((it) => it.toLowerCase().includes(normalizedQuery)) || false;
          return nameMatch || descMatch || itemsMatch;
        })
        .map((opt) => opt.id);

      return {
        category,
        originalIndex: index + 1,
        matchingOptionIds,
        matchCount: matchingOptionIds.length,
        hasMatches: matchingOptionIds.length > 0,
      };
    });
  }, [categories, normalizedQuery, isSearchActive]);

  const totalOptions = useMemo(() => {
    return categories.reduce((sum, c) => sum + c.options.length, 0);
  }, [categories]);

  const totalMatchingServices = useMemo(() => {
    if (!isSearchActive) return totalOptions;
    return categoryMatches.reduce((sum, cm) => sum + cm.matchCount, 0);
  }, [categoryMatches, isSearchActive, totalOptions]);

  const displayedCategories = useMemo(() => {
    if (!isSearchActive) return categoryMatches;
    return categoryMatches.filter((cm) => cm.hasMatches);
  }, [categoryMatches, isSearchActive]);

  const categoryStats = useMemo(() => {
    return categories.map((category) => {
      const total = category.options.length;
      const selected = category.options.filter((opt) => selectedIds.includes(opt.id)).length;
      const percent = total > 0 ? Math.round((selected / total) * 100) : 0;
      const isComplete = total > 0 && selected === total;
      const hasSelection = selected > 0;
      const visual = CATEGORY_VISUALS[category.id] || DEFAULT_VISUAL;
      const matchInfo = categoryMatches.find((cm) => cm.category.id === category.id);
      return {
        category,
        total,
        selected,
        percent,
        isComplete,
        hasSelection,
        visual,
        matchCount: matchInfo ? matchInfo.matchCount : total,
        hasMatches: matchInfo ? matchInfo.hasMatches : true,
      };
    });
  }, [categories, selectedIds, categoryMatches]);

  const totalSelected = useMemo(() => {
    return categories.reduce((sum, c) => sum + c.options.filter((opt) => selectedIds.includes(opt.id)).length, 0);
  }, [categories, selectedIds]);

  const overallPercent = totalOptions > 0 ? Math.round((totalSelected / totalOptions) * 100) : 0;

  const quickSearchTags = useMemo(() => {
    if (language === 'ar') {
      return [
        { label: 'هوية بصرية', query: 'هوية' },
        { label: 'شعار', query: 'شعار' },
        { label: 'موقع إلكتروني', query: 'موقع' },
        { label: 'سوشيال ميديا', query: 'سوشيال' },
        { label: 'فيديو وموشن', query: 'فيديو' },
        { label: 'مطبوعات ورقية', query: 'مطبوعات' },
        { label: 'تصميم تغليف', query: 'تغليف' },
      ];
    }
    return [
      { label: 'Brand Identity', query: 'identity' },
      { label: 'Logo', query: 'logo' },
      { label: 'Website', query: 'website' },
      { label: 'Social Media', query: 'social' },
      { label: 'Video & Motion', query: 'video' },
      { label: 'Stationery', query: 'stationery' },
      { label: 'Packaging', query: 'packaging' },
    ];
  }, [language]);

  return (
    <section className="space-y-6 md:space-y-8">
      {/* Section Header & Minimal Mode Toggle */}
      <div 
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 sm:p-4 bg-white/60 dark:bg-slate-900/60 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-2xs backdrop-blur-xs"
        style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
      >
        <div className={language === 'ar' ? 'text-right' : 'text-left'}>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            {t.selectServicesTitle}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.selectServicesDescription}
          </p>
        </div>

        {/* Minimal Mode Toggle for Power Users */}
        {onToggleMinimalMode && (
          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              id="minimal-mode-toggle-btn"
              type="button"
              role="switch"
              aria-checked={isMinimalMode}
              onClick={onToggleMinimalMode}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none border ${
                isMinimalMode
                  ? 'bg-[#003057] text-[#C5F1FF] border-[#50B0CE]/60 dark:bg-[#50B0CE] dark:text-[#003057] dark:border-[#50B0CE] shadow-sm'
                  : 'bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-2xs'
              }`}
              title={t.minimalModeDesc}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{t.minimalModeToggle}</span>
              <span 
                className={`w-8 h-4 rounded-full flex items-center transition-colors px-0.5 ${
                  isMinimalMode ? 'bg-[#50B0CE] dark:bg-[#003057] justify-end' : 'bg-slate-300 dark:bg-slate-600 justify-start'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-white shadow-xs"></span>
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Smart Presets Bar */}
      {onApplyPreset && (
        <SmartPresetsBar
          language={language}
          selectedIds={selectedIds}
          onApplyPreset={onApplyPreset}
          onClearSelection={onClearSelection}
        />
      )}

      {/* Global Search Input & Quick Filter Chips */}
      <div 
        id="pricing-search-container"
        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 md:p-5 shadow-xs transition-colors space-y-3"
      >
        <div 
          className="relative flex items-center bg-slate-50 dark:bg-slate-800/90 border border-slate-300/80 dark:border-slate-700 rounded-xl px-3.5 py-2.5 shadow-2xs focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all"
          style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
        >
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
          <input
            id="pricing-global-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchServicesPlaceholder}
            aria-label={t.searchServicesAriaLabel}
            className="w-full bg-transparent border-0 focus:outline-hidden text-sm md:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 px-3"
          />
          {isSearchActive && (
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold font-mono bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {totalMatchingServices} / {totalOptions}
              </span>
              <button
                id="pricing-search-clear-btn"
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label={t.clearSearch}
                title={t.clearSearch}
                className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Quick Filter Chips */}
        <div 
          className="flex items-center gap-2 flex-wrap text-xs"
          style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
        >
          <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'تصفيات سريعة:' : 'Quick filters:'}</span>
          </span>
          {quickSearchTags.map((tag) => {
            const isSelected = normalizedQuery === tag.query.toLowerCase();
            return (
              <button
                key={tag.query}
                type="button"
                onClick={() => setSearchQuery(isSelected ? '' : tag.query)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tag.label}
              </button>
            );
          })}
          {isSearchActive && (
            <button
              id="pricing-reset-filter-link"
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 underline cursor-pointer ms-auto"
            >
              {t.clearSearch}
            </button>
          )}
        </div>

        {/* Active Search Summary */}
        {isSearchActive && (
          <div 
            className="pt-2.5 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-medium"
            style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
          >
            <span>
              {t.searchResultsCount(totalMatchingServices, totalOptions)}
              {displayedCategories.length > 0 && (
                <span className="ms-1 font-semibold text-slate-700 dark:text-slate-300">
                  {language === 'ar'
                    ? `(عبر ${displayedCategories.length} أقسام)`
                    : `(across ${displayedCategories.length} categories)`}
                </span>
              )}
            </span>
            {totalMatchingServices > 0 && (
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {language === 'ar' ? 'يتم عرض الخدمات المطابقة فقط' : 'Showing matching services only'}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Small Category Progress Indicators & Quick Navigation Strip */}
      <div 
        id="pricing-categories-strip"
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
          {categoryStats.map(({ category, total, selected, percent, isComplete, hasSelection, visual, matchCount, hasMatches }) => {
            const isDimmed = isSearchActive && !hasMatches;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  const el = document.getElementById(category.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                disabled={isDimmed}
                title={language === 'ar' ? `الانتقال إلى ${category.name}` : `Jump to ${category.name}`}
                className={`group flex flex-col justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isDimmed
                    ? 'opacity-35 bg-slate-100/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 cursor-not-allowed'
                    : isComplete
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 hover:scale-[1.02]'
                    : hasSelection
                    ? 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/80 text-slate-800 dark:text-slate-200 hover:scale-[1.02]'
                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:scale-[1.02]'
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

                {isSearchActive && (
                  <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1 flex items-center justify-between">
                    <span>{language === 'ar' ? 'مطابق:' : 'Matches:'}</span>
                    <span className={`font-mono font-bold ${hasMatches ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>
                      {matchCount}
                    </span>
                  </div>
                )}
                
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
            );
          })}
        </div>
      </div>

      {/* Render Filtered Categories or Empty Search State */}
      {displayedCategories.length === 0 ? (
        <div 
          id="pricing-no-results-state"
          className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 md:p-12 text-center space-y-4 shadow-xs transition-colors"
          style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs">
            <SearchX className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t.noSearchResultsTitle}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              {t.noSearchResultsDesc(searchQuery)}
            </p>
          </div>
          <div className="pt-2">
            <button
              id="pricing-no-results-clear-btn"
              type="button"
              onClick={() => setSearchQuery('')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all cursor-pointer shadow-xs"
            >
              <X className="w-4 h-4" />
              <span>{t.clearSearch}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {displayedCategories.map(({ category, originalIndex, matchingOptionIds }) => (
            <PricingCategory
              key={category.id}
              category={category}
              categoryIndex={originalIndex}
              selectedIds={selectedIds}
              onServiceToggle={onServiceToggle}
              quantities={quantities}
              onQuantityChange={onQuantityChange}
              language={language}
              t={t}
              isClientMode={isClientMode}
              visibleOptionIds={isSearchActive ? matchingOptionIds : undefined}
              searchQuery={isSearchActive ? normalizedQuery : ''}
              isMinimalMode={isMinimalMode}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default PricingSection;
