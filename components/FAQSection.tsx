import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  FileCode2, 
  RotateCcw, 
  ShieldCheck, 
  CheckCircle2, 
  MessageCircle,
  Sparkles,
  Lock,
  Layers
} from 'lucide-react';

interface FAQSectionProps {
  language: 'ar' | 'en';
}

interface FAQItem {
  id: string;
  category: 'timeline' | 'ownership' | 'revisions' | 'payment';
  question: { ar: string; en: string };
  answer: { ar: string; en: string };
  highlight?: { ar: string; en: string };
  badge?: { ar: string; en: string };
  icon: typeof Clock;
}

const FAQSection: React.FC<FAQSectionProps> = ({ language }) => {
  const isArabic = language === 'ar';
  const [openId, setOpenId] = useState<string | null>('timeline-1');

  const faqs: FAQItem[] = [
    {
      id: 'timeline-1',
      category: 'timeline',
      icon: Clock,
      badge: { ar: 'المدة الزمنية', en: 'Timeline' },
      question: {
        ar: 'كم يستغرق إنجاز المشروع وما هي المواعيد المتوقعة للتسليم؟',
        en: 'How long does project delivery take and what are the timelines?',
      },
      answer: {
        ar: 'تعتمد مدة العمل على نوع الباقة ومستوى التفاصيل: تصاميم السوشيال ميديا الفردية أو العاجلة تستغرق عادة بين 3 إلى 5 أيام عمل، باقات الهوية البصرية الأساسية تستغرق من 7 إلى 10 أيام عمل، والمشاريع الشاملة (مثل البروفايلات الكاملة أو باقات المعارض) تستغرق من 10 إلى 14 يوم عمل. يتم تحديد جدول زمني مرحلي دقيق ومكتوب قبل بدء التنفيذ.',
        en: 'Timelines vary by scope: urgent or individual social creatives take 3–5 business days, core visual identities take 7–10 business days, and comprehensive packages (full corporate profiles, exhibition branding) take 10–14 business days. A structured phase-by-phase calendar is locked before kickoff.',
      },
      highlight: {
        ar: '⚡ خدمة التسليم العاجل (Express Delivery) متاحة للباقات ذات الأولوية خلال 48–72 ساعة.',
        en: '⚡ Express Delivery (48–72 hours) is available for priority & urgent time-sensitive launches.',
      },
    },
    {
      id: 'ownership-1',
      category: 'ownership',
      icon: FileCode2,
      badge: { ar: 'ملفات المصدر', en: 'Source Files' },
      question: {
        ar: 'هل أستلم ملفات المصدر المفتوحة، وما هي حقوق الملكية التجارية للمشروع؟',
        en: 'Do I receive editable source files, and who owns the commercial rights?',
      },
      answer: {
        ar: 'نعم، بكل تأكيد! يحصل العميل بعد الاعتماد النهائي وسداد المستحقات على تنازل كامل 100% عن حقوق الملكية الفكرية والتجارية دون أي شروط خفية. نقوم بتسليم حزمة ملفات رقمية وطباعية مفتوحة بالكامل تشمل صيغ الفيكتور (AI, SVG, EPS) وملفات التحرير (PSD) وملفات الطباعة فائقة الدقة (PDF 300 DPI جاهزة للمطبعة) بالإضافة إلى ملفات الاستخدام الرقمي (PNG بخلفية شفافة وWebP وJPG).',
        en: 'Yes, 100%! Upon final project approval and clearance, full commercial and intellectual property rights are transferred to your organization with zero recurring royalties. You receive the complete master archive including open vector files (AI, SVG, EPS), editable design files (PSD), high-resolution print-ready PDFs (300 DPI CMYK), and optimized digital exports (transparent PNG, WebP, JPG).',
      },
      highlight: {
        ar: '🔒 تنازل ملكية تجاري كامل وموثق مع تسليم ملفات المصدر الأصلية بالكامل.',
        en: '🔒 Full commercial IP transfer guarantee with all raw editable source files.',
      },
    },
    {
      id: 'revisions-1',
      category: 'revisions',
      icon: RotateCcw,
      badge: { ar: 'التعديلات والمرونة', en: 'Revisions' },
      question: {
        ar: 'كيف تتم آلية المراجعة والتعديل، وكم عدد جولات التعديلات المتاحة؟',
        en: 'How does the revision process work and how many rounds are included?',
      },
      answer: {
        ar: 'نعتمد منهجية مراجعة مرحلية منظمة لتفادي إضاعة الوقت؛ تُعرض المسودات الأولية والمفاهيم المقترحة لأخذ ملاحظاتك التفصيلية. تشمل كل باقة من 2 إلى 3 جولات تعديل رئيسية مجانية تشمل تعديل الألوان، الخطوط، التراكيب، وتفاصيل العناصر. هدفنا هو الوصول للرضا التام والاعتماد الموثوق قبل استخراج الملفات النهائية.',
        en: 'We use an agile, milestone-based feedback loop: initial concepts and drafts are shared for your consolidated review. Every package includes 2 to 3 comprehensive revision rounds covering typography, color nuances, spatial layouts, and content tweaks. Our commitment is reaching complete satisfaction before master file delivery.',
      },
      highlight: {
        ar: '🎯 تعديلات مرنة وملاحظات مرحلية تضمن مطابقة المخرجات لتطلعاتك قبل التسليم النهائي.',
        en: '🎯 Structured revision cycles guarantee the output meets your strategic expectations.',
      },
    },
    {
      id: 'payment-1',
      category: 'payment',
      icon: ShieldCheck,
      badge: { ar: 'الدفع والأمان', en: 'Payment & Terms' },
      question: {
        ar: 'ما هي آلية السداد والضمانات المالية المتبعة؟',
        en: 'What are the payment milestones and commercial guarantees?',
      },
      answer: {
        ar: 'تتم عملية التعاقد باحترافية وأمان مالي: يتم سداد دفعة أولى (50%) عند اعتماد مقترح العمل وبدء التنفيذ، وتُسدد الدفعة المتبقية (50%) بعد استعراض التصاميم واعتمادها النهائي وقبل تسليم حزمة ملفات المصدر الأصلية. نوفر فواتير ضريبية رسمية ووسائل دفع معتمدة وسريعة.',
        en: 'Payments follow international agency standards: 50% mobilization deposit upon quote sign-off to initiate production, and the remaining 50% balance upon final visual sign-off prior to releasing the unlocked source files. Certified commercial invoices and bank-grade payment channels are provided.',
      },
    },
    {
      id: 'ownership-2',
      category: 'ownership',
      icon: Lock,
      badge: { ar: 'السرية والـ NDA', en: 'NDA & Privacy' },
      question: {
        ar: 'هل يتم الحفاظ على سرية معلومات مشروعي وبيانات علامتي قبل الإطلاق؟',
        en: 'Will our proprietary project data and launch details be kept strictly confidential?',
      },
      answer: {
        ar: 'نلتزم التزاماً صارماً بأعلى معايير الخصوصية والأمان؛ جميع ملفاتك، بياناتك، واستراتيجياتك تخضع لسرية تامة ولا تتم مشاركتها مع أي أطراف خارجية. نرحب بتوقيع اتفاقية عدم إفصاح رسمية (Non-Disclosure Agreement - NDA) ملزمة قانونياً قبل بدء أي مشروع.',
        en: 'Strict non-disclosure is an uncompromising standard. All brand assets, upcoming campaign plans, and business insights remain strictly confidential. We readily execute legally binding Non-Disclosure Agreements (NDAs) prior to receiving proprietary project materials.',
      },
      highlight: {
        ar: '🛡️ جاهزون لتوقيع اتفاقية سرية (NDA) فورية عند الطلب لحماية مشروعك.',
        en: '🛡️ Ready to countersign a binding NDA immediately upon request.',
      },
    },
    {
      id: 'timeline-2',
      category: 'timeline',
      icon: Layers,
      badge: { ar: 'المخرجات والطباعة', en: 'Print Standards' },
      question: {
        ar: 'هل المخرجات جاهزة للمطابع وما هي المعايير الفنية المطبقة؟',
        en: 'Are physical outputs calibrated for commercial offset & digital printers?',
      },
      answer: {
        ar: 'كافة التصاميم المعدة للطباعة (هويات، بروفايلات، بروشورات، تغليف، وأجنحة معارض) تُصمم وفق أحدث المعايير الصناعية للمطابع: نظام ألوان CMYK معتمد ومحدد بدقة، دقة 300DPI، هوامش قص وأمان مدروسة (Bleed Marks & Safe Margins)، وخطوط محولة لـ Outlines لتفادي أي خطأ أثناء الطباعة.',
        en: 'All physical collateral (identities, brochures, packaging, exhibition booths) is engineered to stringent commercial prepress specs: calibrated CMYK color space, 300 DPI resolution, exact bleed/slug safety margins, and vectorized/outlined type to eliminate printing discrepancies.',
      },
    },
  ];

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section 
      id="faq-section"
      className="bg-white rounded-2xl shadow-lg border border-slate-200/90 overflow-hidden my-8 print:hidden"
    >
      {/* Header Banner */}
      <div className="p-6 md:p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isArabic ? 'الشفافية والضمان التجاري' : 'Transparency & Client Assurance'}</span>
          </div>
          <h2 className="text-xl md:text-3xl font-extrabold tracking-tight">
            {isArabic ? 'الأسئلة الشائعة وضمانات العمل' : 'Frequently Asked Questions & Guarantees'}
          </h2>
          <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed">
            {isArabic 
              ? 'إجابات واضحة ودقيقة حول الجداول الزمنية للتسليم، تسليم ملفات المصدر الأصلية، حقوق الملكية الفكرية الكاملة، وآلية جولات المراجعة والتعديل.'
              : 'Clear answers on project turnaround timelines, 100% editable vector source file ownership, revision cycles, and commercial guarantees.'}
          </p>

          {/* Quick Trust Pillars Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6 pt-5 border-t border-slate-700/60">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{isArabic ? 'ملفات المصدر 100%' : '100% Source Files'}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{isArabic ? 'تنازل ملكية تجاري' : 'Full IP Rights'}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{isArabic ? 'جولات تعديل مرنة' : 'Flexible Revisions'}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{isArabic ? 'اتفاقية سرية NDA' : 'Binding NDA on Demand'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion FAQ List - All Questions directly without division */}
      <div className="p-4 md:p-6 space-y-3">
        {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const IconComp = faq.icon;

            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-blue-50/40 border-blue-300 shadow-sm ring-1 ring-blue-400/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                {/* Question Header Button */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className={`w-full p-4 flex items-center justify-between gap-3 text-left transition-colors ${
                    isArabic ? 'text-right' : 'text-left'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                          isOpen ? 'bg-blue-200/80 text-blue-900' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {isArabic ? faq.badge?.ar : faq.badge?.en}
                        </span>
                      </div>
                      <h3 className="text-xs md:text-sm font-bold text-slate-900 leading-snug">
                        {isArabic ? faq.question.ar : faq.question.en}
                      </h3>
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-slate-400 p-1">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className={`px-4 pb-4 pt-1 border-t border-slate-200/60 ${isArabic ? 'text-right' : 'text-left'}`}>
                    <p className="text-xs md:text-sm text-slate-700 leading-relaxed pt-2">
                      {isArabic ? faq.answer.ar : faq.answer.en}
                    </p>

                    {faq.highlight && (
                      <div className="mt-3 p-2.5 rounded-lg bg-white border border-blue-200/80 text-xs font-semibold text-blue-900 flex items-start gap-2 shadow-2xs">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{isArabic ? faq.highlight.ar : faq.highlight.en}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Bottom Direct Inquiry Box */}
      <div className="p-4 md:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <MessageCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span>
            {isArabic 
              ? 'هل لديك استفسار محدد أو متطلب خاص لمشروعك؟ يسعدنا الإجابة فوراً.' 
              : 'Have a specific query or bespoke requirement? Our strategists are ready to help.'}
          </span>
        </div>

        <a
          href="https://wa.me/905342006606?text=Hello%20O2%20Design%20Studio%2C%20I%20have%20a%20question%20about%20the%20packages%20and%20deliverables"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-xs hover:shadow-md whitespace-nowrap"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>{isArabic ? 'محادثة مستشار التصميم' : 'Chat with Design Strategist'}</span>
        </a>
      </div>
    </section>
  );
};

export default FAQSection;
