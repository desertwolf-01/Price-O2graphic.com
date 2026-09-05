import React, { useState, useEffect, useMemo } from 'react';
import { 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  Send, 
  User, 
  Building2, 
  ThumbsUp, 
  Sparkles, 
  ShieldCheck, 
  SlidersHorizontal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ClientFeedback } from '../types';
import { getStoredFeedbacks, saveFeedback } from '../utils/feedbackStorage';

interface ClientFeedbackSectionProps {
  language: 'ar' | 'en';
  defaultClientName?: string;
  defaultClientEmail?: string;
  selectedServicesSummary?: string;
}

export const ClientFeedbackSection: React.FC<ClientFeedbackSectionProps> = ({
  language,
  defaultClientName = '',
  defaultClientEmail = '',
  selectedServicesSummary = '',
}) => {
  const isArabic = language === 'ar';

  // Feedbacks state
  const [feedbacks, setFeedbacks] = useState<ClientFeedback[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | '5stars' | 'recent'>('all');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form inputs state
  const [clientName, setClientName] = useState(defaultClientName);
  const [companyOrRole, setCompanyOrRole] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [clarityRating, setClarityRating] = useState<number>(5);
  const [pricingRating, setPricingRating] = useState<number>(5);
  const [speedRating, setSpeedRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [formError, setFormError] = useState('');

  // Update name if default changes
  useEffect(() => {
    if (defaultClientName && !clientName) {
      setClientName(defaultClientName);
    }
  }, [defaultClientName]);

  // Load feedbacks & subscribe to updates
  useEffect(() => {
    setFeedbacks(getStoredFeedbacks());

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<ClientFeedback[]>;
      if (customEvent.detail) {
        setFeedbacks(customEvent.detail);
      } else {
        setFeedbacks(getStoredFeedbacks());
      }
    };

    window.addEventListener('o2graphic_feedback_updated', handleUpdate);
    return () => {
      window.removeEventListener('o2graphic_feedback_updated', handleUpdate);
    };
  }, []);

  // Stats calculation
  const stats = useMemo(() => {
    if (feedbacks.length === 0) {
      return { average: 5.0, count: 0, fiveStarCount: 0, clarityAvg: 5.0, pricingAvg: 5.0, speedAvg: 5.0 };
    }
    const total = feedbacks.reduce((acc, f) => acc + f.rating, 0);
    const fiveStars = feedbacks.filter(f => f.rating === 5).length;
    const clarityTotal = feedbacks.reduce((acc, f) => acc + (f.clarityRating || f.rating), 0);
    const pricingTotal = feedbacks.reduce((acc, f) => acc + (f.pricingRating || f.rating), 0);
    const speedTotal = feedbacks.reduce((acc, f) => acc + (f.speedRating || f.rating), 0);

    return {
      average: Number((total / feedbacks.length).toFixed(1)),
      count: feedbacks.length,
      fiveStarCount: fiveStars,
      clarityAvg: Number((clarityTotal / feedbacks.length).toFixed(1)),
      pricingAvg: Number((pricingTotal / feedbacks.length).toFixed(1)),
      speedAvg: Number((speedTotal / feedbacks.length).toFixed(1)),
    };
  }, [feedbacks]);

  // Filtered list
  const filteredFeedbacks = useMemo(() => {
    if (activeFilter === '5stars') {
      return feedbacks.filter(f => f.rating === 5);
    }
    if (activeFilter === 'recent') {
      return [...feedbacks].sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
    }
    return feedbacks;
  }, [feedbacks, activeFilter]);

  const ratingLabels: Record<number, { ar: string; en: string }> = {
    5: { ar: 'استثنائي وممتاز جداً ⭐⭐⭐⭐⭐', en: 'Exceptional & Highly Recommended' },
    4: { ar: 'جيد جداً واحترافي ⭐⭐⭐⭐', en: 'Very Good & Professional' },
    3: { ar: 'مقبول ويلبي التوقعات ⭐⭐⭐', en: 'Good & Met Expectations' },
    2: { ar: 'يحتاج إلى تحسين ⭐⭐', en: 'Needs Improvement' },
    1: { ar: 'غير راضٍ ⭐', en: 'Unsatisfied' },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setFormError(isArabic ? 'يرجى كتابة الاسم أو اسم الجهة الكريمة' : 'Please enter your name or company name');
      return;
    }
    if (!comment.trim() || comment.trim().length < 5) {
      setFormError(isArabic ? 'يرجى كتابة تقييم موجز عن تجربتك (5 أحرف على الأقل)' : 'Please enter a short review (at least 5 characters)');
      return;
    }

    setFormError('');
    saveFeedback({
      clientName: clientName.trim(),
      companyOrRole: companyOrRole.trim() || undefined,
      rating,
      clarityRating,
      pricingRating,
      speedRating,
      comment: comment.trim(),
      projectScope: selectedServicesSummary || (isArabic ? 'عرض أسعار خدمات التصميم' : 'Design Proposal & Services'),
    });

    setIsSubmitted(true);
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.75 },
    });

    // Reset form after short delay
    setTimeout(() => {
      setComment('');
      setIsFormOpen(false);
      setIsSubmitted(false);
    }, 3500);
  };

  return (
    <section 
      id="client-feedback-section" 
      className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200/90 dark:border-slate-800 overflow-hidden transition-all duration-300 print:hidden"
      style={{ direction: isArabic ? 'rtl' : 'ltr' }}
    >
      {/* Header Banner */}
      <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100/50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-b border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200/60 dark:border-blue-800/60">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{isArabic ? 'آراء وتقييمات العملاء' : 'Client Feedback & Reviews'}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isArabic ? 'تجارب عملائنا مع عروض O2Graphic' : 'What Our Clients Say'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            {isArabic
              ? 'نعتز بثقة شركائنا ونسعى دائماً لتقديم أعلى معايير الشفافية والاحترافية في تصميم وتفصيل عروض الأسعار.'
              : 'Real, verified feedback from businesses and creative partners on our proposal clarity and service execution.'}
          </p>
        </div>

        {/* Action Button to Open Form */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isFormOpen ? (isArabic ? 'إغلاق النموذج' : 'Close Form') : (isArabic ? 'أضف تقييمك للعرض' : 'Write a Review')}</span>
            {isFormOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Interactive Review Submission Form Modal / Accordion */}
      {isFormOpen && (
        <div className="p-6 md:p-8 bg-blue-50/40 dark:bg-slate-850/60 border-b border-slate-200 dark:border-slate-800 animate-fadeIn">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {isArabic ? 'شكراً جزيلاً لتقييمك الكريم!' : 'Thank You for Your Review!'}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                {isArabic 
                  ? 'تم حفظ تقييمك بنجاح في سجل لوحة العروض الموثقة، وملاحظاتك تساهم دوماً في تطوير خدماتنا.' 
                  : 'Your feedback has been recorded successfully in our proposal dashboard.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
              <div className="border-b border-slate-200 dark:border-slate-700 pb-3 mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span>{isArabic ? 'تقييم تجربة العرض والخدمات' : 'Rate Your Experience with This Proposal'}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {isArabic
                    ? 'رأيك يهمنا في وضوح التسعير، تنافسية الباقات، وسرعة إعداد العرض.'
                    : 'Share your honest feedback on our pricing structure, clarity, and design capabilities.'}
                </p>
              </div>

              {/* Overall Star Rating */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isArabic ? 'التقييم العام للعرض والأسعار:' : 'Overall Proposal Rating:'}
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isActive = (hoverRating !== null ? hoverRating : rating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="p-1 rounded-lg hover:scale-110 transition-transform cursor-pointer focus:outline-none"
                          aria-label={`${star} Stars`}
                        >
                          <Star 
                            className={`w-7 h-7 ${isActive ? 'text-amber-400 fill-amber-400 drop-shadow-sm' : 'text-slate-300 dark:text-slate-600'}`} 
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 mr-2">
                    {ratingLabels[hoverRating || rating]?.[language]}
                  </span>
                </div>
              </div>

              {/* Aspect ratings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {/* Clarity */}
                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {isArabic ? 'وضوح تفاصيل البنود' : 'Proposal Clarity'}
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setClarityRating(s)}
                        className={`text-xs p-1 rounded font-bold ${clarityRating >= s ? 'text-amber-500' : 'text-slate-300 dark:text-slate-700'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pricing & Value */}
                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {isArabic ? 'تنافسية الأسعار والخصومات' : 'Pricing & Discounts'}
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setPricingRating(s)}
                        className={`text-xs p-1 rounded font-bold ${pricingRating >= s ? 'text-amber-500' : 'text-slate-300 dark:text-slate-700'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* Speed & Interaction */}
                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {isArabic ? 'سرعة التجاوب والتنظيم' : 'Speed & Organization'}
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSpeedRating(s)}
                        className={`text-xs p-1 rounded font-bold ${speedRating >= s ? 'text-amber-500' : 'text-slate-300 dark:text-slate-700'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isArabic ? 'رأيك وملاحظاتك المكتوبة:' : 'Your Written Review & Comments:'}
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={isArabic 
                    ? 'اكتب انطباعك عن دقة العرض، تفاصيل الخدمات، أو أي اقتراح تود مشاركته معنا...' 
                    : 'Describe your experience with this pricing proposal and the creative services offered...'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Name and Company Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isArabic ? 'الاسم الكريم *:' : 'Your Name *:'}
                  </label>
                  <div className="relative">
                    <User className={`w-4 h-4 text-slate-400 absolute top-3 ${isArabic ? 'right-3' : 'left-3'}`} />
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder={isArabic ? 'مثال: أ. محمد العبدالله' : 'e.g., Alex Johnson'}
                      className={`w-full ${isArabic ? 'pr-9 pl-3.5' : 'pl-9 pr-3.5'} py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isArabic ? 'الشركة أو المسمى (اختياري):' : 'Company or Role (Optional):'}
                  </label>
                  <div className="relative">
                    <Building2 className={`w-4 h-4 text-slate-400 absolute top-3 ${isArabic ? 'right-3' : 'left-3'}`} />
                    <input
                      type="text"
                      value={companyOrRole}
                      onChange={(e) => setCompanyOrRole(e.target.value)}
                      placeholder={isArabic ? 'مثال: شركة الرؤية للتطوير' : 'e.g., Apex Tech Ltd'}
                      className={`w-full ${isArabic ? 'pr-9 pl-3.5' : 'pl-9 pr-3.5'} py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none`}
                    />
                  </div>
                </div>
              </div>

              {formError && (
                <p className="text-xs font-bold text-red-600 dark:text-red-400">
                  {formError}
                </p>
              )}

              {/* Submit button */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  {isArabic ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-98 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'إرسال التقييم وحفظه' : 'Submit Review'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Reviews Dashboard Metrics Bar */}
      <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/30">
        {/* Overall Score */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-black text-2xl border border-amber-500/20 flex-shrink-0">
            {stats.average}
          </div>
          <div>
            <div className="flex items-center gap-0.5 text-amber-400 mb-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {isArabic ? 'التقييم الإجمالي العام' : 'Overall Rating'}
            </div>
            <div className="text-[11px] text-slate-400">
              {isArabic ? `بناءً على ${stats.count} تقييم موثق` : `Based on ${stats.count} verified reviews`}
            </div>
          </div>
        </div>

        {/* Metric 1: Clarity */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              {isArabic ? 'وضوح البنود والتسعير' : 'Proposal Clarity'}
            </span>
            <span className="font-bold text-blue-600 dark:text-blue-400">{stats.clarityAvg}/5</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full" 
              style={{ width: `${(stats.clarityAvg / 5) * 100}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 block">
            {isArabic ? 'شفافية كاملة في الكميات والتدرج' : '100% transparent pricing tiers'}
          </span>
        </div>

        {/* Metric 2: Pricing Value */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              {isArabic ? 'تنافسية الأسعار والخصومات' : 'Pricing & Value'}
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{stats.pricingAvg}/5</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full" 
              style={{ width: `${(stats.pricingAvg / 5) * 100}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 block">
            {isArabic ? 'خصومات باقات وحزم متعددة' : 'Dynamic package & coupon discounts'}
          </span>
        </div>

        {/* Metric 3: Speed & Response */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              {isArabic ? 'سرعة التجاوب والتنظيم' : 'Response & Speed'}
            </span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">{stats.speedAvg}/5</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-indigo-500 rounded-full" 
              style={{ width: `${(stats.speedAvg / 5) * 100}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 block">
            {isArabic ? 'إعداد فوري وإرسال مباشر عبر واتساب' : 'Instant WhatsApp & Email generation'}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 md:px-8 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {isArabic ? 'تصفية الآراء:' : 'Filter:'}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${activeFilter === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
            >
              {isArabic ? `جميع التقييمات (${feedbacks.length})` : `All (${feedbacks.length})`}
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('5stars')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${activeFilter === '5stars' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
            >
              {isArabic ? `5 نجوم (${stats.fiveStarCount})` : `5 Stars (${stats.fiveStarCount})`}
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('recent')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${activeFilter === 'recent' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
            >
              {isArabic ? 'الأحدث' : 'Latest'}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>{isArabic ? 'تقييمات موثقة من شركاء O2Graphic' : 'Verified Client Reviews'}</span>
        </div>
      </div>

      {/* Reviews Cards Grid */}
      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFeedbacks.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-750 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Card Top: Stars + Verified Badge + Date */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {item.isVerified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{isArabic ? 'عميل موثق' : 'Verified'}</span>
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400 font-mono">
                    {item.date}
                  </span>
                </div>
              </div>

              {/* Written Review Quote */}
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                "{item.comment}"
              </p>
            </div>

            {/* Client Info & Project Scope */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {item.clientName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
                    {item.clientName}
                  </h4>
                  {item.companyOrRole && (
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">
                      {item.companyOrRole}
                    </p>
                  )}
                </div>
              </div>

              {item.projectScope && (
                <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-2 py-0.5 rounded-md truncate max-w-[140px]">
                  {item.projectScope}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer reassurance */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <ThumbsUp className="w-3.5 h-3.5 text-blue-500" />
          <span>
            {isArabic 
              ? 'رضا العملاء وشفافية الأسعار هي الركيزة الأساسية في O2Graphic' 
              : 'Client satisfaction and pricing transparency are O2Graphic core values.'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsFormOpen(true);
            window.scrollTo({ top: document.getElementById('client-feedback-section')?.offsetTop, behavior: 'smooth' });
          }}
          className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
        >
          {isArabic ? 'شاركنا تجربتك الآن ←' : 'Leave your feedback →'}
        </button>
      </div>
    </section>
  );
};

export default ClientFeedbackSection;
