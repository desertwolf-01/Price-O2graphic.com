import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Lock, Info, X } from 'lucide-react';

interface SecurityBadgeProps {
  language: 'ar' | 'en';
  variant?: 'subtle' | 'card' | 'inline';
}

export const SecurityBadge: React.FC<SecurityBadgeProps> = ({ 
  language, 
  variant = 'subtle' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const isArabic = language === 'ar';

  // Close tooltip on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const title = isArabic 
    ? 'إشعار سرية الأسعار وحماية الملكية الفكرية' 
    : 'Confidentiality & Anti-Scraping Notice';

  const description = isArabic
    ? 'هذا العرض وهياكل الأسعار، الحزم والمعايير التشغيلية الموضحة فيه تمثل أسراراً مهنية وحقوق ملكية فكرية حصرية لـ O2Graphic. يُحظر تماماً النسخ، الاستخراج الآلي (Scraping)، أو إعادة الاستخدام التجاري دون تفويض خطي مسبق.'
    : 'All pricing structures, bundle algorithms, and service specifications in this document are exclusive trade secrets and intellectual property of O2Graphic. Unauthorized copying, automated web scraping, or commercial duplication is strictly prohibited.';

  const complianceBadge = isArabic
    ? 'حماية الملكية الفكرية والسرية التجارية'
    : 'Intellectual Property Protected';

  if (variant === 'card') {
    return (
      <div className="relative inline-block w-full">
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer group flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition-all duration-200 text-xs text-slate-600 dark:text-slate-300 select-none"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Lock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {isArabic ? 'وثيقة تسعير سرية ومحمية' : 'Confidential & Proprietary Rate Card'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            <span>{isArabic ? 'تفاصيل الحماية' : 'Security Details'}</span>
            <Info className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Floating Tooltip */}
        {isOpen && (
          <div 
            ref={tooltipRef}
            className={`absolute z-50 bottom-full mb-2 ${isArabic ? 'right-0' : 'left-0'} w-80 sm:w-96 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 transition-all duration-200`}
            style={{ textAlign: isArabic ? 'right' : 'left' }}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>{title}</span>
              </div>
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="leading-relaxed text-slate-600 dark:text-slate-300 text-[11px] mb-3">
              {description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 dark:text-slate-500">
              <span className="font-mono">IP: O2-PROP-SEC-2026</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">✓ {complianceBadge}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Subtle / Inline variant for Footer
  return (
    <div className="relative inline-block" ref={tooltipRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 transition-colors cursor-pointer"
        aria-label={title}
      >
        <Lock className="w-3 h-3 text-slate-400 dark:text-slate-400" />
        <span>{isArabic ? 'سري ومحمي' : 'Confidential'}</span>
        <Info className="w-3 h-3 text-slate-400" />
      </button>

      {/* Floating Tooltip */}
      {isOpen && (
        <div 
          className={`absolute z-50 bottom-full mb-2 ${isArabic ? 'right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2' : 'left-0 sm:left-1/2 sm:-translate-x-1/2'} w-72 sm:w-80 p-3.5 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 transition-all duration-200 pointer-events-none`}
          style={{ textAlign: isArabic ? 'right' : 'left' }}
        >
          <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold mb-1.5">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>{title}</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
            {description}
          </p>
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
            <span>© O2Graphic Legal</span>
            <span className="text-emerald-600 dark:text-emerald-400">● {complianceBadge}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityBadge;
