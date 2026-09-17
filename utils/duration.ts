import { ServiceOption } from '../types';

export interface ServiceDurationConfig {
  minDays: number;
  maxDays: number;
  labelAr: string;
  labelEn: string;
  isMonthly?: boolean;
}

export const SERVICE_DURATIONS: Record<string, ServiceDurationConfig> = {
  // Visual Identity & Graphic Design
  'visual-strategy': {
    minDays: 4,
    maxDays: 6,
    labelAr: '4 - 6 أيام عمل',
    labelEn: '4 - 6 business days',
  },
  'foundational-logo': {
    minDays: 4,
    maxDays: 6,
    labelAr: '4 - 6 أيام عمل',
    labelEn: '4 - 6 business days',
  },
  'brand-identity': {
    minDays: 8,
    maxDays: 12,
    labelAr: '8 - 12 يوم عمل',
    labelEn: '8 - 12 business days',
  },
  'digital-presence': {
    minDays: 2,
    maxDays: 4,
    labelAr: '2 - 4 أيام عمل',
    labelEn: '2 - 4 business days',
  },
  'stationery': {
    minDays: 4,
    maxDays: 6,
    labelAr: '4 - 6 أيام عمل',
    labelEn: '4 - 6 business days',
  },
  'promotional-materials': {
    minDays: 4,
    maxDays: 6,
    labelAr: '4 - 6 أيام عمل',
    labelEn: '4 - 6 business days',
  },
  'promotional-tools-package': {
    minDays: 5,
    maxDays: 8,
    labelAr: '5 - 8 أيام عمل',
    labelEn: '5 - 8 business days',
  },

  // Exhibition
  'exhibition-package': {
    minDays: 7,
    maxDays: 10,
    labelAr: '7 - 10 أيام عمل',
    labelEn: '7 - 10 business days',
  },

  // Website
  'website-package': {
    minDays: 12,
    maxDays: 16,
    labelAr: '12 - 16 يوم عمل',
    labelEn: '12 - 16 business days',
  },

  // Social Media Packages
  'social-planning': {
    minDays: 3,
    maxDays: 5,
    labelAr: '3 - 5 أيام عمل',
    labelEn: '3 - 5 business days',
  },
  'social-basic-9': {
    minDays: 4,
    maxDays: 6,
    labelAr: '4 - 6 أيام عمل',
    labelEn: '4 - 6 business days',
  },
  'social-emerging-18': {
    minDays: 7,
    maxDays: 10,
    labelAr: '7 - 10 أيام عمل',
    labelEn: '7 - 10 business days',
  },
  'social-advanced-30': {
    minDays: 10,
    maxDays: 14,
    labelAr: '10 - 14 يوم عمل',
    labelEn: '10 - 14 business days',
  },
  'social-intermediate-54': {
    minDays: 14,
    maxDays: 18,
    labelAr: '14 - 18 يوم عمل',
    labelEn: '14 - 18 business days',
  },
  'social-strategic-carousel-6': {
    minDays: 3,
    maxDays: 5,
    labelAr: '3 - 5 أيام عمل',
    labelEn: '3 - 5 business days',
  },
  'social-advanced-72': {
    minDays: 18,
    maxDays: 24,
    labelAr: '18 - 24 يوم عمل',
    labelEn: '18 - 24 business days',
  },
  'social-posting': {
    minDays: 30,
    maxDays: 30,
    labelAr: 'إدارة شهرية مستمرة',
    labelEn: 'Monthly recurring management',
    isMonthly: true,
  },

  // Corporate Materials
  'catalog-design': {
    minDays: 5,
    maxDays: 8,
    labelAr: '5 - 8 أيام عمل',
    labelEn: '5 - 8 business days',
  },
  'company-profile': {
    minDays: 5,
    maxDays: 8,
    labelAr: '5 - 8 أيام عمل',
    labelEn: '5 - 8 business days',
  },
  'presentation-design': {
    minDays: 4,
    maxDays: 6,
    labelAr: '4 - 6 أيام عمل',
    labelEn: '4 - 6 business days',
  },
  'annual-report': {
    minDays: 7,
    maxDays: 10,
    labelAr: '7 - 10 أيام عمل',
    labelEn: '7 - 10 business days',
  },
  'infographic-static': {
    minDays: 2,
    maxDays: 4,
    labelAr: '2 - 4 أيام عمل',
    labelEn: '2 - 4 business days',
  },

  // Video & Motion
  'reels-package': {
    minDays: 5,
    maxDays: 7,
    labelAr: '5 - 7 أيام عمل',
    labelEn: '5 - 7 business days',
  },
  '2d-animation-package': {
    minDays: 8,
    maxDays: 12,
    labelAr: '8 - 12 يوم عمل',
    labelEn: '8 - 12 business days',
  },
  'corporate-intro-video': {
    minDays: 10,
    maxDays: 15,
    labelAr: '10 - 15 يوم عمل',
    labelEn: '10 - 15 business days',
  },

  // Packaging
  'box-design': {
    minDays: 3,
    maxDays: 5,
    labelAr: '3 - 5 أيام عمل',
    labelEn: '3 - 5 business days',
  },
  'bag-design': {
    minDays: 3,
    maxDays: 5,
    labelAr: '3 - 5 أيام عمل',
    labelEn: '3 - 5 business days',
  },
  'sticker-design': {
    minDays: 2,
    maxDays: 3,
    labelAr: '2 - 3 أيام عمل',
    labelEn: '2 - 3 business days',
  },
};

const DEFAULT_DURATION: ServiceDurationConfig = {
  minDays: 4,
  maxDays: 6,
  labelAr: '4 - 6 أيام عمل',
  labelEn: '4 - 6 business days',
};

/**
 * Get duration config for an individual service option, factoring in custom quantity if applicable
 */
export function getServiceDuration(optionId: string, quantity = 1): ServiceDurationConfig {
  const base = SERVICE_DURATIONS[optionId] || DEFAULT_DURATION;
  if (base.isMonthly) {
    return base;
  }

  // If quantity is higher than 1, add a modest scaling factor (e.g. pages or items)
  let extraDays = 0;
  if (quantity > 1) {
    if (quantity > 20) extraDays = 3;
    else if (quantity > 10) extraDays = 2;
    else if (quantity > 3) extraDays = 1;
  }

  if (extraDays === 0) {
    return base;
  }

  const minDays = base.minDays + extraDays;
  const maxDays = base.maxDays + extraDays;

  return {
    ...base,
    minDays,
    maxDays,
    labelAr: `${minDays} - ${maxDays} أيام عمل`,
    labelEn: `${minDays} - ${maxDays} business days`,
  };
}

export interface EstimatedTimeline {
  minDays: number;
  maxDays: number;
  formattedText: string;
  formattedWeeksText?: string;
  hasMonthlyService: boolean;
  firstDraftDays: number;
  phases: {
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
    timeAr: string;
    timeEn: string;
    icon: string;
  }[];
}

/**
 * Calculate the overall project timeline with parallel sprint overlaps
 */
export function calculateEstimatedTimeline(
  selectedOptions: ServiceOption[],
  quantities: { [id: string]: number } = {},
  language: 'ar' | 'en' = 'ar'
): EstimatedTimeline | null {
  if (!selectedOptions || selectedOptions.length === 0) {
    return null;
  }

  const isArabic = language === 'ar';
  const durations = selectedOptions.map((opt) =>
    getServiceDuration(opt.id, quantities[opt.id] || 1)
  );

  const nonMonthly = durations.filter((d) => !d.isMonthly);
  const hasMonthlyService = durations.some((d) => d.isMonthly);

  if (nonMonthly.length === 0) {
    // Only monthly recurring services selected
    return {
      minDays: 30,
      maxDays: 30,
      formattedText: isArabic ? 'خطة إدارة شهرية مستمرة' : 'Monthly recurring plan',
      hasMonthlyService: true,
      firstDraftDays: 3,
      phases: [
        {
          titleAr: 'الإعداد والاستلام',
          titleEn: 'Onboarding & Setup',
          descAr: 'استلام المتطلبات وإعداد جدول النشر الشهري',
          descEn: 'Gather assets & set up monthly calendar',
          timeAr: 'أول 3 أيام عمل',
          timeEn: 'First 3 business days',
          icon: '🚀',
        },
        {
          titleAr: 'النشر والتفاعل',
          titleEn: 'Publishing & Engagement',
          descAr: 'جدولة المنشورات وإدارة النشر على مدار الشهر',
          descEn: 'Schedule and manage posts throughout the month',
          timeAr: 'طوال الشهر',
          timeEn: 'Ongoing monthly',
          icon: '📈',
        },
      ],
    };
  }

  const maxMin = Math.max(...nonMonthly.map((d) => d.minDays));
  const maxMax = Math.max(...nonMonthly.map((d) => d.maxDays));
  const sumMin = nonMonthly.reduce((sum, d) => sum + d.minDays, 0);
  const sumMax = nonMonthly.reduce((sum, d) => sum + d.maxDays, 0);

  // Agency parallel sprints calculation:
  // Core lead tasks run first, while parallel collateral designers work concurrently
  let minDays: number;
  let maxDays: number;

  if (nonMonthly.length === 1) {
    minDays = maxMin;
    maxDays = maxMax;
  } else {
    // 25% overlap factor for additional items
    minDays = Math.round(maxMin + (sumMin - maxMin) * 0.28);
    maxDays = Math.round(maxMax + (sumMax - maxMax) * 0.38);
    // Ensure maxDays is always greater than minDays
    if (maxDays <= minDays) {
      maxDays = minDays + 2;
    }
  }

  // Estimated first draft milestone (typically around 35-40% into the timeline)
  const firstDraftDays = Math.max(2, Math.round(minDays * 0.4));

  // Human friendly text
  const daysText = isArabic
    ? `من ${minDays} إلى ${maxDays} يوم عمل`
    : `${minDays} - ${maxDays} business days`;

  let weeksText: string | undefined;
  if (minDays >= 8) {
    const minWeeks = (minDays / 5).toFixed(minDays % 5 === 0 ? 0 : 1);
    const maxWeeks = (maxDays / 5).toFixed(maxDays % 5 === 0 ? 0 : 1);
    weeksText = isArabic
      ? `(قرابة ${minWeeks} - ${maxWeeks} أسابيع عمل)`
      : `(~${minWeeks} - ${maxWeeks} work weeks)`;
  }

  const phases = [
    {
      titleAr: 'الانطلاق والدراسة',
      titleEn: 'Discovery & Brief',
      descAr: 'تأكيد المتطلبات وجمع المواد والبدء بالمسودات الاستراتيجية',
      descEn: 'Confirm brief, assets intake, and strategic kickoff',
      timeAr: isArabic ? 'اليوم 1 - 2' : 'Days 1 - 2',
      timeEn: 'Days 1 - 2',
      icon: '🚀',
    },
    {
      titleAr: 'المفاهيم الأولية والمراجعة',
      titleEn: 'Initial Concepts & Review',
      descAr: 'عرض النماذج الإبداعية الأولى ومناقشة التعديلات والتحسينات',
      descEn: 'Presentation of creative concepts & revision iterations',
      timeAr: isArabic ? `خلال ${firstDraftDays} أيام عمل` : `Within ${firstDraftDays} business days`,
      timeEn: `Within ${firstDraftDays} business days`,
      icon: '🎨',
    },
    {
      titleAr: 'التسليم النهائي والملفات المفتوحة',
      titleEn: 'Final Delivery & Handover',
      descAr: 'تجهيز ملفات الطباعة عالية الدقة والملفات الرقمية والمصدرية المفتوحة',
      descEn: 'Production-ready print, digital, and original source files handover',
      timeAr: isArabic ? `بحلول اليوم ${maxDays}` : `By Day ${maxDays}`,
      timeEn: `By Day ${maxDays}`,
      icon: '🏁',
    },
  ];

  return {
    minDays,
    maxDays,
    formattedText: daysText,
    formattedWeeksText: weeksText,
    hasMonthlyService,
    firstDraftDays,
    phases,
  };
}
