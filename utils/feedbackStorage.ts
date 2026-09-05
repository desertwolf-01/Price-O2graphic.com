import { ClientFeedback } from '../types';

const STORAGE_KEY = 'o2graphic_client_feedbacks_v1';

// Pre-seeded high quality reviews reflecting O2Graphic excellence
const DEFAULT_FEEDBACKS: ClientFeedback[] = [
  {
    id: 'fb-1',
    clientName: 'م. راشد الهاجري',
    companyOrRole: 'شركة إتقان للمقاولات والاستثمار',
    rating: 5,
    clarityRating: 5,
    pricingRating: 5,
    speedRating: 5,
    comment: 'عرض سعر احترافي ومنظم لأبعد حد. شفافية تامة في تفصيل أسعار البنود وتدرج الكميات، مما وفر علينا الكثير في ميزانية الهوية والمعرض.',
    date: '2026-08-28',
    timestamp: Date.now() - 8 * 24 * 60 * 60 * 1000,
    projectScope: 'الهوية البصرية وتصميم أجنحة المعارض',
    isVerified: true,
  },
  {
    id: 'fb-2',
    clientName: 'سارة المنصوري',
    companyOrRole: 'مؤسسة أفق التقنية',
    rating: 5,
    clarityRating: 5,
    pricingRating: 4,
    speedRating: 5,
    comment: 'تجربة ممتازة وسريعة للغاية! أعجبني تفصيل كل خدمة واحتساب الخصومات التلقائية بدقة. الفريق متعاون ومبدع.',
    date: '2026-08-15',
    timestamp: Date.now() - 21 * 24 * 60 * 60 * 1000,
    projectScope: 'تصميم الموقع الإلكتروني والمحتوى الرقمي',
    isVerified: true,
  },
  {
    id: 'fb-3',
    clientName: 'Dr. Tarek Al-Khatib',
    companyOrRole: 'Lumina Health Group',
    rating: 5,
    clarityRating: 5,
    pricingRating: 5,
    speedRating: 5,
    comment: 'Extremely clear proposal breakdown with fair and competitive pricing. The tier discounts and package flexibility made our decision seamless.',
    date: '2026-07-30',
    timestamp: Date.now() - 37 * 24 * 60 * 60 * 1000,
    projectScope: 'Corporate Profile & Motion Graphics',
    isVerified: true,
  },
  {
    id: 'fb-4',
    clientName: 'عبدالعزيز العتيبي',
    companyOrRole: 'مجموعة أوتاد العقارية',
    rating: 5,
    clarityRating: 5,
    pricingRating: 5,
    speedRating: 5,
    comment: 'السرعة في إعداد العرض والتفاعل كانت استثنائية. وضوح شروط العمل والدفع أعطانا ثقة تامة في التعاقد.',
    date: '2026-07-12',
    timestamp: Date.now() - 55 * 24 * 60 * 60 * 1000,
    projectScope: 'المطبوعات التجارية وتغليف المنتجات',
    isVerified: true,
  }
];

export function getStoredFeedbacks(): ClientFeedback[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_FEEDBACKS));
      return DEFAULT_FEEDBACKS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_FEEDBACKS;
  } catch (err) {
    console.error('Failed to load feedbacks from localStorage:', err);
    return DEFAULT_FEEDBACKS;
  }
}

export function saveFeedback(
  newFeedback: Omit<ClientFeedback, 'id' | 'date' | 'timestamp'>
): ClientFeedback {
  const feedbacks = getStoredFeedbacks();
  
  const created: ClientFeedback = {
    ...newFeedback,
    id: `fb-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    date: new Date().toISOString().split('T')[0],
    timestamp: Date.now(),
    isVerified: true,
  };

  const updated = [created, ...feedbacks];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Dispatch storage event or custom event for cross-component sync
    window.dispatchEvent(new CustomEvent('o2graphic_feedback_updated', { detail: updated }));
  } catch (err) {
    console.error('Failed to save feedback to localStorage:', err);
  }

  return created;
}

export function deleteFeedback(id: string): void {
  const feedbacks = getStoredFeedbacks();
  const updated = feedbacks.filter(f => f.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('o2graphic_feedback_updated', { detail: updated }));
  } catch (err) {
    console.error('Failed to delete feedback:', err);
  }
}
