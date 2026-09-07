export interface SmartPreset {
  id: string;
  nameAr: string;
  nameEn: string;
  badgeAr: string;
  badgeEn: string;
  subtitleAr: string;
  subtitleEn: string;
  targetAudienceAr: string;
  targetAudienceEn: string;
  serviceIds: string[];
  quantities?: { [id: string]: number };
  popular?: boolean;
  colorScheme: {
    border: string;
    bg: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    iconBg: string;
  };
}

export const SMART_PRESETS: SmartPreset[] = [
  {
    id: 'starter-kit',
    nameAr: 'Starter Kit (باقة الانطلاق السريع)',
    nameEn: 'Starter Kit',
    badgeAr: 'الأكثر طلباً للبداية',
    badgeEn: 'Best for Starters',
    subtitleAr: 'شعار تأسيسي معتمد + قوالب التواجد الرقمي + حزمة القرطاسية والمراسلات الكاملة.',
    subtitleEn: 'Foundational Logo Package + Digital Presence templates + Complete Corporate Stationery.',
    targetAudienceAr: 'المشاريع الناشئة والشركات الجديدة',
    targetAudienceEn: 'Startups & New Ventures',
    popular: true,
    serviceIds: ['foundational-logo', 'digital-presence', 'stationery'],
    quantities: {},
    colorScheme: {
      border: 'border-emerald-500/40 dark:border-emerald-500/50',
      bg: 'bg-emerald-50/70 dark:bg-emerald-950/30',
      text: 'text-emerald-900 dark:text-emerald-200',
      badgeBg: 'bg-emerald-100 dark:bg-emerald-900/60',
      badgeText: 'text-emerald-800 dark:text-emerald-300',
      iconBg: 'bg-emerald-500 text-white',
    },
  },
  {
    id: 'pro-growth',
    nameAr: 'Pro Growth (باقة النمو الاحترافي)',
    nameEn: 'Pro Growth',
    badgeAr: 'باقة التوسع والروّاد',
    badgeEn: 'Recommended for Growth',
    subtitleAr: 'استراتيجية بصرية + هوية أساسية متكاملة + موقع ويب شامل + تخطيط سوشيال ميديا.',
    subtitleEn: 'Visual Strategy + Core Brand Pillar + Full Website + Social Media Framework.',
    targetAudienceAr: 'الشركات الطموحة والمتوسعة في السوق',
    targetAudienceEn: 'Scaling & Established Brands',
    popular: true,
    serviceIds: ['visual-strategy', 'brand-identity', 'website-package', 'digital-presence', 'social-planning'],
    quantities: { 'social-planning': 3 },
    colorScheme: {
      border: 'border-[#50B0CE]/50 dark:border-[#50B0CE]/60',
      bg: 'bg-blue-50/70 dark:bg-[#003057]/40',
      text: 'text-[#003057] dark:text-[#C5F1FF]',
      badgeBg: 'bg-blue-100 dark:bg-[#003057]',
      badgeText: 'text-[#003057] dark:text-[#C5F1FF]',
      iconBg: 'bg-[#50B0CE] text-white',
    },
  },
  {
    id: 'digital-presence',
    nameAr: 'Digital Presence (الحضور الرقمي والويب)',
    nameEn: 'Digital Presence',
    badgeAr: 'المتاجر والمنصات',
    badgeEn: 'E-commerce & Web',
    subtitleAr: 'موقع إلكتروني متكامل + قوالب المنصات الرقمية + استراتيجية وتصاميم شهرية للسوشيال ميديا.',
    subtitleEn: 'Full Website Package + Social Presence Templates + Monthly Content Strategy.',
    targetAudienceAr: 'المتاجر الإلكترونية والخدمات الرقمية',
    targetAudienceEn: 'Online Stores & SaaS',
    serviceIds: ['website-package', 'digital-presence', 'social-planning', 'social-basic-9'],
    quantities: { 'social-planning': 3, 'social-basic-9': 3 },
    colorScheme: {
      border: 'border-purple-400/40 dark:border-purple-500/50',
      bg: 'bg-purple-50/70 dark:bg-purple-950/30',
      text: 'text-purple-900 dark:text-purple-200',
      badgeBg: 'bg-purple-100 dark:bg-purple-900/60',
      badgeText: 'text-purple-800 dark:text-purple-300',
      iconBg: 'bg-purple-600 text-white',
    },
  },
  {
    id: 'corporate-elite',
    nameAr: 'Corporate Elite (الهوية المؤسسية الشاملة)',
    nameEn: 'Corporate Elite',
    badgeAr: 'الحل الشامل 360°',
    badgeEn: 'Complete 360° Suite',
    subtitleAr: 'استراتيجية بصرية + هوية كاملة + قرطاسية + بروفايل شركة + موقع ويب + لافتات المعارض.',
    subtitleEn: 'Visual Strategy + Core Brand + Stationery + Company Profile + Website + Signage.',
    targetAudienceAr: 'المنظمات والمؤسسات والشركات الكبرى',
    targetAudienceEn: 'Enterprises & Corporations',
    serviceIds: ['visual-strategy', 'brand-identity', 'stationery', 'company-profile', 'website-package', 'promotional-materials'],
    quantities: { 'company-profile': 12 },
    colorScheme: {
      border: 'border-amber-400/50 dark:border-amber-500/50',
      bg: 'bg-amber-50/70 dark:bg-amber-950/30',
      text: 'text-amber-900 dark:text-amber-200',
      badgeBg: 'bg-amber-100 dark:bg-amber-900/60',
      badgeText: 'text-amber-800 dark:text-amber-300',
      iconBg: 'bg-amber-500 text-white',
    },
  },
];
