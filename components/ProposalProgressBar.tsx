import React, { useEffect, useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  ArrowDown, 
  Zap,
  Gift
} from 'lucide-react';
import { formatCurrency } from '../utils/format';

interface ProposalProgressBarProps {
  selectedCount: number;
  activeCategoriesCount: number;
  totalCategoriesCount: number;
  discountPercentage: number;
  finalTotalPrice: number;
  language: 'ar' | 'en';
}

const ProposalProgressBar: React.FC<ProposalProgressBarProps> = ({
  selectedCount,
  activeCategoriesCount,
  totalCategoriesCount,
  discountPercentage,
  finalTotalPrice,
  language,
}) => {
  const isArabic = language === 'ar';
  const [pulse, setPulse] = useState(false);

  // Trigger brief pulse animation on count change
  useEffect(() => {
    if (selectedCount > 0) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 600);
      return () => clearTimeout(timer);
    }
  }, [selectedCount]);

  // Determine progress percentage (4 services or more = 100%)
  const maxTarget = 4;
  const progressPercent = Math.min(100, Math.round((selectedCount / maxTarget) * 100));

  // Determine milestone tier
  const getMilestoneInfo = () => {
    if (selectedCount === 0) {
      return {
        tier: isArabic ? 'ابدأ بتشكيل باقتك' : 'Build Your Proposal',
        status: isArabic 
          ? 'حدد الخدمات الأنسب لمشروعك من الباقات أدناه' 
          : 'Select services below to customize your project scope',
        color: 'text-slate-500',
        badgeBg: 'bg-slate-100 text-slate-700',
        icon: Layers,
      };
    }
    if (selectedCount === 1) {
      return {
        tier: isArabic ? 'الخطوة الأولى: الأساس' : 'Foundation Level',
        status: isArabic 
          ? 'انطلاقة قوية! أضف خدمة من قسم آخر لفتح خصم إضافي +5%' 
          : 'Great kickoff! Add another service to unlock a multi-category discount',
        color: 'text-blue-600',
        badgeBg: 'bg-blue-100 text-blue-800',
        icon: Zap,
      };
    }
    if (selectedCount === 2) {
      return {
        tier: isArabic ? 'المستوى المتوازن' : 'Synergy Level',
        status: isArabic 
          ? `باقة متكاملة (+${activeCategoriesCount * 5}% خصم تعدد الأقسام مفعّل)` 
          : `Active synergy (+${activeCategoriesCount * 5}% multi-category discount unlocked)`,
        color: 'text-indigo-600',
        badgeBg: 'bg-indigo-100 text-indigo-800',
        icon: TrendingUp,
      };
    }
    if (selectedCount === 3) {
      return {
        tier: isArabic ? 'المستوى الاستراتيجي' : 'Strategic Tier',
        status: isArabic 
          ? 'باقة متقدمة وعالية الأثر لتغطية التواجد الرقمي والطباعي' 
          : 'Advanced suite covering print, digital and visual brand presence',
        color: 'text-purple-600',
        badgeBg: 'bg-purple-100 text-purple-800',
        icon: Sparkles,
      };
    }
    return {
      tier: isArabic ? 'الحزمة الشاملة 360°' : '360° Master Suite',
      status: isArabic 
        ? 'أعلى تغطية متكاملة لعلامتك مع أقصى توفير وضمان للنتائج!' 
        : 'Maximum agency solution with peak synergy and full deliverables!',
      color: 'text-emerald-600',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      icon: CheckCircle2,
    };
  };

  const milestone = getMilestoneInfo();
  const MilestoneIcon = milestone.icon;

  const scrollToSummary = () => {
    const el = document.getElementById('summary-breakdown') || document.getElementById('summary-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs print:hidden transition-all">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        {/* Top Info Row */}
        <div className="flex items-center justify-between gap-3 text-xs mb-1.5">
          {/* Milestone & Status */}
          <div className="flex items-center gap-2 min-w-0">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[11px] transition-transform duration-300 ${
              pulse ? 'scale-105' : ''
            } ${milestone.badgeBg}`}>
              <MilestoneIcon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="whitespace-nowrap">{milestone.tier}</span>
            </span>

            <span className="text-slate-500 text-[11px] hidden sm:inline truncate">
              {milestone.status}
            </span>
          </div>

          {/* Right Metrics & Quick Jump */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {selectedCount > 0 ? (
              <>
                {discountPercentage > 0 && (
                  <span className="hidden xs:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    <Gift className="w-3 h-3 text-emerald-600" />
                    <span>-{discountPercentage}%</span>
                  </span>
                )}

                <div className="text-right flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400 hidden md:inline">
                    {isArabic ? 'الإجمالي:' : 'Total:'}
                  </span>
                  <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    {formatCurrency(finalTotalPrice)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={scrollToSummary}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 text-[11px] font-bold transition-colors cursor-pointer"
                  title={isArabic ? 'الانتقال لملخص العرض' : 'Jump to Proposal Summary'}
                >
                  <span className="hidden sm:inline">{isArabic ? 'الملخص' : 'Summary'}</span>
                  <span className="text-blue-600 font-extrabold">({selectedCount})</span>
                  <ArrowDown className="w-3 h-3" />
                </button>
              </>
            ) : (
              <span className="text-[11px] text-slate-400 font-medium">
                {isArabic ? '0 من 4 خدمات مقترحة' : '0 of 4 recommended'}
              </span>
            )}
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          {/* Animated Fill Bar */}
          <div
            className={`h-full transition-all duration-500 ease-out rounded-full ${
              selectedCount >= 4
                ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500'
                : selectedCount >= 2
                ? 'bg-gradient-to-r from-blue-600 to-indigo-500'
                : 'bg-blue-600'
            }`}
            style={{ width: `${progressPercent}%` }}
          />

          {/* Sub-notch markers for 25%, 50%, 75% */}
          <div className="absolute inset-0 flex justify-between px-1 pointer-events-none items-center">
            <div className="w-0.5 h-1 bg-white/70 rounded-full" />
            <div className="w-0.5 h-1 bg-white/70 rounded-full" />
            <div className="w-0.5 h-1 bg-white/70 rounded-full" />
            <div className="w-0.5 h-1 bg-white/70 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalProgressBar;
