import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Compass, 
  Vote, 
  HelpCircle, 
  Palette, 
  Share2, 
  Video, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Award, 
  Briefcase, 
  Rocket, 
  Layers, 
  FileText,
  ChevronRight,
  Gift,
  Copy,
  Check
} from 'lucide-react';

interface InteractivePresentationProps {
  language: 'ar' | 'en';
  onNavigateToCategory: (categoryId: string, optionId?: string) => void;
  onApplyCoupon?: (coupon: { code: string; discount: number }) => void;
}

const InteractivePresentation: React.FC<InteractivePresentationProps> = ({
  language,
  onNavigateToCategory,
  onApplyCoupon,
}) => {
  const isArabic = language === 'ar';
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  // Active showcase tab: 'pillars' | 'workflows' | 'poll' | 'quiz'
  const [activeTab, setActiveTab] = useState<'pillars' | 'workflows' | 'hub'>('pillars');

  // Pillar selection
  const [selectedPillar, setSelectedPillar] = useState<number>(0);

  // Workflow selection
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>('launch');

  // Hub subtab: 'poll' | 'quiz'
  const [hubTab, setHubTab] = useState<'poll' | 'quiz'>('poll');

  // Poll state
  const [pollVotes, setPollVotes] = useState<Record<string, number>>({
    brand: 48,
    packaging: 24,
    video: 18,
    web: 10,
  });
  const [userVoted, setUserVoted] = useState<string | null>(null);

  // Quiz state
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<{ goal?: string; timeline?: string; output?: string }>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [couponCopied, setCouponCopied] = useState<boolean>(false);

  const handlePollVote = (key: string) => {
    if (userVoted) return;
    setPollVotes(prev => ({
      ...prev,
      [key]: prev[key] + 1,
    }));
    setUserVoted(key);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleQuizAnswer = (field: 'goal' | 'timeline' | 'output', value: string) => {
    const updated = { ...quizAnswers, [field]: value };
    setQuizAnswers(updated);
    if (quizStep < 2) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 }
      });
      if (onApplyCoupon) {
        onApplyCoupon({ code: 'O2SPECIAL', discount: 15 });
      }
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizFinished(false);
  };

  const copyCoupon = () => {
    navigator.clipboard.writeText('O2SPECIAL');
    setCouponCopied(true);
    setTimeout(() => setCouponCopied(false), 2000);
  };

  // Pillars content
  const pillars = [
    {
      id: 'brand',
      icon: Palette,
      color: 'indigo',
      title: isArabic ? 'الهوية البصرية الشاملة ودليل العلامة' : 'Comprehensive Brand Identity & Guidelines',
      category: 'graphic-design-services',
      targetOptionId: 'brand-identity',
      badge: isArabic ? 'الركيزة الأولى' : 'Pillar 01',
      tagline: isArabic ? 'بناء الثقة من النظرة الأولى وترسيخ التميز في أذهان العملاء' : 'Building instant trust and lasting market resonance',
      deliverables: isArabic ? [
        'نظام شعار مرن (رئيسي، ثانوي، أيقونة رقمية Favicon)',
        'لوحة ألوان رسمية معتمدة (CMYK, RGB, HEX, Pantone)',
        'دليل خطوط وهوية طباعية ورقمية متكاملة',
        'أنماط بصرية متكررة (Patterns) ونظام تغليف منتجات موحد'
      ] : [
        'Versatile logo system (Primary, Secondary, Favicon)',
        'Certified official color palette (CMYK, RGB, HEX, Pantone)',
        'Complete typography system for print & digital',
        'Repeating patterns & unified product packaging system'
      ],
      kpis: [
        { label: isArabic ? 'معدل تمييز العلامة' : 'Brand Recall', val: '+68%' },
        { label: isArabic ? 'الثقة الفورية للعميل' : 'Customer Trust', val: '+85%' },
      ],
      insight: isArabic 
        ? 'العلامات التجارية ذات الهوية المتسقة تحقق عائداً أعلى بنسبة 33% مقارنة بالهويات العشوائية.' 
        : 'Brands with consistent visual presentation see up to 33% higher revenue growth.'
    },
    {
      id: 'social',
      icon: Share2,
      color: 'blue',
      title: isArabic ? 'حملات السوشيال ميديا والكاروسيل الاستراتيجي' : 'Strategic Social Campaigns & Carousels',
      category: 'social-media-design',
      targetOptionId: 'social-posting',
      badge: isArabic ? 'الركيزة الثانية' : 'Pillar 02',
      tagline: isArabic ? 'تحويل المتابعين إلى عملاء فعليين بتصاميم جاذبة وسرد بصري مؤثر' : 'Converting scrollers into loyal customers with visual storytelling',
      deliverables: isArabic ? [
        'خطة محتوى بصري شهرية متناسقة وموجهة للتحويل',
        'تصاميم منشورات فردية وكاروسيل تثقيفي متعدد الشرائح',
        'قوالب ستوري تفاعلية وهايلايت مخصصة للملف الشخصي',
        'أغلفة إعلانية مدروسة متوافقة مع معايير Meta وLinkedIn'
      ] : [
        'Monthly conversion-oriented visual content plan',
        'Single & high-engagement multi-slide educational carousels',
        'Interactive story templates & customized profile highlights',
        'Ad creatives optimized for Meta, LinkedIn, and X algorithms'
      ],
      kpis: [
        { label: isArabic ? 'معدل التفاعل والمشاركة' : 'Engagement Rate', val: '+120%' },
        { label: isArabic ? 'معدل التحويل (CTR)' : 'Click-Through Rate', val: '+42%' },
      ],
      insight: isArabic 
        ? 'منشورات الكاروسيل تحقق معدل حفظ وتفاعل أعلى بـ 3 أضعاف من المنشورات الأحادية.' 
        : 'Carousel posts generate 3x higher saves and shares than static single-image posts.'
    },
    {
      id: 'video',
      icon: Video,
      color: 'rose',
      title: isArabic ? 'الأنيميشن، الريلز والموشن جرافيك' : 'Motion Graphics, Reels & Animation',
      category: 'video-motion-graphics',
      targetOptionId: 'reels-package',
      badge: isArabic ? 'الركيزة الثالثة' : 'Pillar 03',
      tagline: isArabic ? 'تبسيط الأفكار المعقدة وجذب الانتباه في أول 3 ثوانٍ' : 'Hooking attention in the first 3 seconds with dynamic motion',
      deliverables: isArabic ? [
        'مقاطع ريلز وفيديوهات قصيرة عمودية 9:16 بصرية عالية الوتيرة',
        'موشن جرافيك تعريفي للشركات وتوضيح التطبيقات والخدمات',
        'مؤثرات صوتية وموسيقى مرخصة ومزامنة نصية دقيقة',
        'إنترو واوترو متحرك للشعار لاستخدامه في جميع الفيديوهات'
      ] : [
        'Fast-paced 9:16 vertical short-form reels & TikTok content',
        'Explanatory motion graphics for corporate services & SaaS',
        'Licensed sound design, dynamic captions & audio sync',
        'Animated logo stingers (Intro/Outro) for all productions'
      ],
      kpis: [
        { label: isArabic ? 'معدل إكمال المشاهدة' : 'Watch Retention', val: '+74%' },
        { label: isArabic ? 'مدى الوصول الأورجانيك' : 'Organic Reach', val: '+150%' },
      ],
      insight: isArabic 
        ? '82% من حركة الإنترنت موجهة للفيديو، ومقاطع الفيديو القصيرة هي الأعلى في الانتشار الفيروسي.' 
        : '82% of internet traffic is video; short-form reels generate the highest algorithmic reach.'
    },
  ];

  // Workflows content
  const workflows = [
    {
      id: 'launch',
      icon: Rocket,
      badge: isArabic ? 'المسار الأول' : 'Track 01',
      title: isArabic ? 'إطلاق علامة تجارية جديدة من الصفر' : 'Brand Launch from Scratch',
      desc: isArabic ? 'للمشاريع والشركات الناشئة التي تحتاج إلى أساس تسويقي متين ومظهر احترافي يولد الثقة من اليوم الأول.' : 'For startups needing a solid visual foundation and instant market credibility.',
      steps: isArabic ? [
        '1. صياغة الاستراتيجية البصرية ودراسة المنافسين',
        '2. تطوير باقة الشعار التأسيسي أو الهوية الأساسية المتكاملة',
        '3. تجهيز قوالب التواجد الرقمي والقرطاسية الرسمية',
      ] : [
        '1. Visual strategy formulation & competitor audit',
        '2. Core identity development & guideline creation',
        '3. Digital presence templates & stationery launch',
      ],
      targetCategory: 'graphic-design-services',
      targetOption: 'brand-identity',
      buttonText: isArabic ? 'استعراض باقات الهوية والتصميم' : 'Explore Brand Identity Packages',
    },
    {
      id: 'growth',
      icon: TrendingUp,
      badge: isArabic ? 'المسار الثاني' : 'Track 02',
      title: isArabic ? 'تنشيط منصات التواصل وزيادة المبيعات' : 'Social Boost & Growth Engine',
      desc: isArabic ? 'للشركات القائمة التي ترغب في رفع التفاعل وجذب عملاء جدد عبر تصاميم وفيديوهات احترافية مستمرة.' : 'For active brands wanting consistent high-converting visuals and short-form video.',
      steps: isArabic ? [
        '1. تقييم المظهر البصري الحالي للمنصات وتحديد نقاط الضعف',
        '2. تطبيق خطة النشر الشهرية بالكاروسيل والبوستات الجذابة',
        '3. تدعيم الحسابات بريلز وموشن جرافيك ديناميكي سريع',
      ] : [
        '1. Social grid audit and aesthetic enhancement',
        '2. Monthly content calendar with carousels & banners',
        '3. High-hook dynamic reels & motion graphics',
      ],
      targetCategory: 'social-media-design',
      targetOption: 'social-posting',
      buttonText: isArabic ? 'استعراض باقات السوشيال ميديا' : 'Explore Social Media Packages',
    },
    {
      id: 'corporate',
      icon: Briefcase,
      badge: isArabic ? 'المسار الثالث' : 'Track 03',
      title: isArabic ? 'عروض المستثمرين والشركات B2B' : 'B2B & Investor Pitch Profiles',
      desc: isArabic ? 'للشركات التي تقدم عروضاً لمستثمرين، جهات حكومية، أو صفقات B2B كبرى تتطلب مستندات وعروضاً بمستوى عالمي.' : 'For enterprise deals, investor decks, and high-stakes corporate tenders.',
      steps: isArabic ? [
        '1. إعادة صياغة وهيكلة المحتوى التجاري بشكل جذاب ومقنع',
        '2. تصميم البروفايل والعرض التقديمي بإنفوجرافيك مخصص',
        '3. تطوير موقع إلكتروني تعريفي سريع وسهل الاستخدام',
      ] : [
        '1. Narrative restructuring for investor clarity',
        '2. High-impact profile & deck design with infographics',
        '3. Fast, elegant landing page or corporate website',
      ],
      targetCategory: 'corporate-materials',
      targetOption: 'company-profile',
      buttonText: isArabic ? 'استعراض باقات الشركات والعروض' : 'Explore Corporate & Presentation Packages',
    },
    {
      id: 'exhibition',
      icon: Award,
      badge: isArabic ? 'المسار الرابع' : 'Track 04',
      title: isArabic ? 'تجهيز أجنحة المعارض والفعاليات الكبرى' : 'Exhibitions & Event Presence',
      desc: isArabic ? 'للمؤسسات المشاركة في مؤتمرات ومعارض وتحتاج إلى حضور ميداني يخطف الأنظار ويترك أثراً دائماً.' : 'For trade shows, summits, and physical expos where standing out is critical.',
      steps: isArabic ? [
        '1. تصميم خلفيات البوث والرول أب والشاشات التفاعلية',
        '2. إعداد المطبوعات التوزيعية، البروشورات، والكتالوجات',
        '3. تخصيص الهدايا الترويجية وأكياس الهدايا المميزة',
      ] : [
        '1. Booth backdrops, rollups, and digital podiums',
        '2. Handout collateral, brochures, and product catalogs',
        '3. Premium branded merchandise & giveaways',
      ],
      targetCategory: 'exhibition-branding',
      targetOption: 'exhibition-package',
      buttonText: isArabic ? 'استعراض باقات المعارض والفعاليات' : 'Explore Exhibition Packages',
    },
  ];

  const currentPillar = pillars[selectedPillar];
  const currentWorkflow = workflows.find(w => w.id === selectedWorkflow) || workflows[0];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/90 overflow-hidden print:hidden">
      {/* Top Navigation Tabs */}
      <div className="p-3 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm md:text-base font-bold text-slate-800 tracking-tight">
              {isArabic ? 'منصة العرض الاستراتيجية التفاعلية' : 'Interactive Strategic Showcase'}
            </h2>
            <p className="text-[11px] text-slate-500">
              {isArabic ? 'اكتشف الركائز، المسارات الموصى بها، وحدد احتياجك الدقيق' : 'Explore pillars, tailored workflows, and smart package matching'}
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="inline-flex rounded-xl bg-slate-200/70 p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('pillars')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'pillars' 
                ? 'bg-white text-blue-700 shadow-xs font-bold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isArabic ? 'ركائز الخدمات' : 'Core Pillars'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('workflows')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'workflows' 
                ? 'bg-white text-blue-700 shadow-xs font-bold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{isArabic ? 'الموجّه الذكي' : 'Guided Workflow'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('hub')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'hub' 
                ? 'bg-white text-blue-700 shadow-xs font-bold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Vote className="w-3.5 h-3.5" />
            <span>{isArabic ? 'الاستطلاع والاختبار' : 'Poll & Quiz'}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CORE PILLARS */}
      {activeTab === 'pillars' && (
        <div className="p-5 md:p-6 space-y-6">
          {/* Pillar Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pillars.map((p, idx) => {
              const IconComp = p.icon;
              const isSelected = selectedPillar === idx;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPillar(idx)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 text-left ${
                    isArabic ? 'text-right' : 'text-left'
                  } ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-500 shadow-md ring-2 ring-blue-500/20 scale-[1.01]'
                      : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-blue-200/80 text-blue-900' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {p.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {p.tagline}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Pillar Detail Panel */}
          <div className={`p-5 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-blue-50/30 border border-slate-200/90 shadow-sm ${
            isArabic ? 'text-right' : 'text-left'
          }`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentPillar.badge}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">
                  {currentPillar.title}
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                  {currentPillar.tagline}
                </p>
              </div>

              {/* Direct Jump Button */}
              <button
                type="button"
                onClick={() => onNavigateToCategory(currentPillar.category, currentPillar.targetOptionId)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 flex-shrink-0"
              >
                <span>{isArabic ? 'الانتقال المباشر للباقة الموصى بها' : 'Jump Directly to Recommended Package'}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Deliverables & KPIs Grid */}
            <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Deliverables List (2 cols on lg) */}
              <div className="lg:col-span-2 space-y-2.5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{isArabic ? 'المخرجات المعتمدة والمعايير التنفيذية' : 'Certified Deliverables & Standards'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentPillar.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* KPIs & Insight */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>{isArabic ? 'الأثر والمؤشرات المتوقعة' : 'Impact & KPIs'}</span>
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {currentPillar.kpis.map((kpi, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
                      <span className="text-lg md:text-xl font-extrabold text-blue-600 block">
                        {kpi.val}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {kpi.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200/80 text-[11px] text-blue-900 leading-relaxed">
                  <strong>💡 {isArabic ? 'رؤية استراتيجية:' : 'Strategic Insight:'}</strong> {currentPillar.insight}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SMART GUIDED WORKFLOW */}
      {activeTab === 'workflows' && (
        <div className="p-5 md:p-6 space-y-6">
          <div className="text-center max-w-xl mx-auto mb-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 inline-block mb-1">
              {isArabic ? 'اختر غايتك التجارية' : 'Select Your Business Objective'}
            </span>
            <h3 className="text-lg md:text-xl font-extrabold text-slate-900">
              {isArabic ? 'المسارات التفاعلية الموجهة حسب مرحلة مشروعك' : 'Smart Guided Workflows for Every Stage'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isArabic ? 'انقر على أي مسار لعرض الشرح الاستراتيجي وتسلسل الباقات الأنسب لك' : 'Click a track below to view tailored execution steps and matching packages'}
            </p>
          </div>

          {/* Workflow Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {workflows.map((wf) => {
              const IconComp = wf.icon;
              const isSelected = selectedWorkflow === wf.id;
              return (
                <div
                  key={wf.id}
                  onClick={() => setSelectedWorkflow(wf.id)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 ${
                    isArabic ? 'text-right' : 'text-left'
                  } ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400/30'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {wf.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs md:text-sm leading-snug">
                    {wf.title}
                  </h4>
                </div>
              );
            })}
          </div>

          {/* Active Workflow Detail Card */}
          <div className={`p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm ${
            isArabic ? 'text-right' : 'text-left'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-blue-600 block mb-1">
                  {currentWorkflow.badge}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {currentWorkflow.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 mt-1">
                  {currentWorkflow.desc}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigateToCategory(currentWorkflow.targetCategory, currentWorkflow.targetOption)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-bold shadow-sm transition-all transform active:scale-95 flex-shrink-0"
              >
                <span>{currentWorkflow.buttonText}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Execution Steps */}
            <div className="mt-4 pt-1">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                {isArabic ? 'خارطة التنفيذ المرحلية المقترحة:' : 'Recommended Execution Sequence:'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {currentWorkflow.steps.map((step, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 shadow-xs flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-medium">{step.replace(/^[0-9]\.\s*/, '')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: POLL & QUIZ HUB */}
      {activeTab === 'hub' && (
        <div className="p-5 md:p-6 space-y-6">
          {/* Sub Switcher */}
          <div className="flex justify-center mb-2">
            <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setHubTab('poll')}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                  hubTab === 'poll'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Vote className="w-4 h-4" />
                <span>{isArabic ? 'استطلاع مجتمع الأعمال المباشر' : 'Live Community Poll'}</span>
              </button>

              <button
                type="button"
                onClick={() => setHubTab('quiz')}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                  hubTab === 'quiz'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>{isArabic ? 'اختبار مطابقة الباقة المثالية' : 'Package Match Quiz'}</span>
              </button>
            </div>
          </div>

          {/* SUBTAB: POLL */}
          {hubTab === 'poll' && (
            <div className={`max-w-2xl mx-auto p-5 md:p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-sm ${
              isArabic ? 'text-right' : 'text-left'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Vote className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900">
                    {isArabic ? 'ما هو العنصر البصري الأكثر تأثيراً في بناء الثقة الفورية لدى عملائك؟' : 'Which visual element most drives instant client trust in your business?'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isArabic ? 'شارك برأيك وشاهد النتائج الحية لمجتمع رواد الأعمال' : 'Vote below to see real-time statistics from industry peers'}
                  </p>
                </div>
              </div>

              {/* Poll Options */}
              <div className="space-y-2.5">
                {[
                  { key: 'brand', label: isArabic ? '🎨 هوية بصرية متناسقة وشعار احترافي' : '🎨 Consistent brand identity & professional logo' },
                  { key: 'packaging', label: isArabic ? '📦 تغليف منتجات مبتكر وعالي الجودة' : '📦 Premium & innovative product packaging' },
                  { key: 'video', label: isArabic ? '🎬 محتوى فيديو موشن وموشن جرافيك ديناميكي' : '🎬 Dynamic video reels & motion graphics' },
                  { key: 'web', label: isArabic ? '🌐 موقع إلكتروني سريع وتجربة مستخدم عصرية' : '🌐 Fast modern website & seamless digital UX' },
                ].map((opt) => {
                  const totalVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0);
                  const votes = pollVotes[opt.key] || 0;
                  const pct = Math.round((votes / totalVotes) * 100);
                  const isUserPick = userVoted === opt.key;

                  return (
                    <div
                      key={opt.key}
                      onClick={() => handlePollVote(opt.key)}
                      className={`relative overflow-hidden p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isUserPick
                          ? 'border-purple-500 bg-purple-50/50 shadow-sm'
                          : userVoted
                          ? 'border-slate-200 bg-white opacity-85'
                          : 'border-slate-200 bg-white hover:border-purple-300 hover:bg-slate-50'
                      }`}
                    >
                      {/* Percentage background bar */}
                      {userVoted && (
                        <div
                          className={`absolute top-0 bottom-0 ${isArabic ? 'right-0' : 'left-0'} ${
                            isUserPick ? 'bg-purple-200/50' : 'bg-slate-100'
                          } transition-all duration-700 ease-out z-0`}
                          style={{ width: `${pct}%` }}
                        />
                      )}

                      <div className="relative z-10 flex items-center justify-between gap-3 text-xs md:text-sm font-semibold text-slate-800">
                        <span className="flex items-center gap-2">
                          {isUserPick && <Check className="w-4 h-4 text-purple-600 font-bold" />}
                          <span>{opt.label}</span>
                        </span>
                        {userVoted && (
                          <span className="text-xs font-bold text-purple-700">
                            {pct}% ({votes})
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {userVoted && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                  <span>
                    🎉 {isArabic ? 'شكراً لمشاركتك! تم تسجيل صوتك بنجاح.' : 'Thank you for your vote! Your perspective has been recorded.'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigateToCategory('graphic-design-services', 'brand-identity')}
                    className="font-bold underline text-emerald-900 hover:text-emerald-700 text-xs"
                  >
                    {isArabic ? 'استعراض الباقة المرتبطة ←' : 'View related package →'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SUBTAB: QUIZ */}
          {hubTab === 'quiz' && (
            <div className={`max-w-2xl mx-auto p-5 md:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm ${
              isArabic ? 'text-right' : 'text-left'
            }`}>
              {!quizFinished ? (
                <div>
                  {/* Step Indicator */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-blue-600">
                      {isArabic ? `السؤال ${quizStep + 1} من 3` : `Question ${quizStep + 1} of 3`}
                    </span>
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((s) => (
                        <div
                          key={s}
                          className={`w-6 h-1.5 rounded-full ${
                            s <= quizStep ? 'bg-blue-600' : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Question 1: Goal */}
                  {quizStep === 0 && (
                    <div className="space-y-3">
                      <h3 className="text-base md:text-lg font-bold text-slate-900">
                        {isArabic ? '1. ما هو الهدف الأهم الذي تسعى لتحقيقه أولاً؟' : '1. What is the primary milestone you want to achieve first?'}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                        {[
                          { val: 'brand', label: isArabic ? 'تأسيس علامة وهوية جديدة كلياً' : 'Build a new brand & visual identity' },
                          { val: 'social', label: isArabic ? 'مضاعفة المبيعات والتفاعل الرقمي' : 'Scale sales & social media engagement' },
                          { val: 'pitch', label: isArabic ? 'عقد صفقات B2B وعروض مستثمرين' : 'Win B2B enterprise deals & investor pitches' },
                          { val: 'event', label: isArabic ? 'حضور قوي في مؤتمر أو معرض' : 'Stand out at a trade show or exhibition' },
                        ].map((choice) => (
                          <button
                            key={choice.val}
                            type="button"
                            onClick={() => handleQuizAnswer('goal', choice.val)}
                            className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-xs md:text-sm font-semibold text-slate-800 text-left transition-all"
                            style={{ textAlign: isArabic ? 'right' : 'left' }}
                          >
                            {choice.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 2: Timeline */}
                  {quizStep === 1 && (
                    <div className="space-y-3">
                      <h3 className="text-base md:text-lg font-bold text-slate-900">
                        {isArabic ? '2. ما هو الإطار الزمني المرغوب للتسليم؟' : '2. What is your expected project delivery timeline?'}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                        {[
                          { val: 'urgent', label: isArabic ? '⚡ عاجل (3 - 5 أيام عمل)' : '⚡ Urgent (3 - 5 business days)' },
                          { val: 'standard', label: isArabic ? '⏱️ قياسي (7 - 14 يوم عمل)' : '⏱️ Standard (7 - 14 business days)' },
                          { val: 'milestone', label: isArabic ? '📅 مشروع مرحلي متكامل (شهر+)' : '📅 Multi-phase roadmap (1 month+)' },
                        ].map((choice) => (
                          <button
                            key={choice.val}
                            type="button"
                            onClick={() => handleQuizAnswer('timeline', choice.val)}
                            className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-xs md:text-sm font-semibold text-slate-800 text-left transition-all"
                            style={{ textAlign: isArabic ? 'right' : 'left' }}
                          >
                            {choice.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 3: Deliverable Focus */}
                  {quizStep === 2 && (
                    <div className="space-y-3">
                      <h3 className="text-base md:text-lg font-bold text-slate-900">
                        {isArabic ? '3. ما هي المخرجات ذات الأولوية القصوى لديك؟' : '3. Which deliverable format has top priority for you?'}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                        {[
                          { val: 'vector', label: isArabic ? 'ملفات فيكتور للطباعة والهوية' : 'Vector brand guidelines & print files' },
                          { val: 'content', label: isArabic ? 'كاروسيل، ريلز ومحتوى مرئي' : 'Social carousels, reels & video' },
                          { val: 'digital', label: isArabic ? 'بروفايل شركة، موقع وعروض' : 'Company profile, web & deck slides' },
                        ].map((choice) => (
                          <button
                            key={choice.val}
                            type="button"
                            onClick={() => handleQuizAnswer('output', choice.val)}
                            className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-xs md:text-sm font-semibold text-slate-800 text-left transition-all"
                            style={{ textAlign: isArabic ? 'right' : 'left' }}
                          >
                            {choice.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Quiz Result */
                <div className="space-y-4">
                  <div className="text-center pb-2">
                    <span className="text-4xl block mb-2">🎯</span>
                    <h3 className="text-lg md:text-xl font-extrabold text-slate-900">
                      {isArabic ? 'تحليل الاحتياج وتوصية الخبراء جاهزة!' : 'Your Custom Package Recommendation is Ready!'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {isArabic ? 'بناءً على تفضيلاتك، تم تحديد الباقة الأكثر توافقاً وتوليد كوبون هدية خاص بك' : 'Based on your inputs, here is the best package match plus a special reward'}
                    </p>
                  </div>

                  {/* Recommendation Card */}
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-700 uppercase">
                        {isArabic ? 'الباقة الموصى بها لك' : 'Tailored Recommendation'}
                      </span>
                      <span className="text-xs font-bold bg-blue-200 text-blue-900 px-2 py-0.5 rounded-md">
                        98% Match
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-base font-bold text-slate-900">
                          {isArabic ? 'باقة الهوية الأساسية (عمود العلامة التجارية)' : 'Core Identity (Brand Pillar Package)'}
                        </h4>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {isArabic ? 'تشمل الشعار، لوحة الألوان، الخطوط، الأيقونة الرقمية، ودليل الهوية المعتمد.' : 'Includes logo system, color palette, fonts, digital favicon & guidelines.'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onNavigateToCategory('graphic-design-services', 'brand-identity')}
                        className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors whitespace-nowrap"
                      >
                        {isArabic ? 'عرض الباقة ←' : 'View Package →'}
                      </button>
                    </div>
                  </div>

                  {/* Special Coupon Box */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Gift className="w-6 h-6 text-amber-600 flex-shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-amber-900 block">
                          {isArabic ? 'كوبون خصم إضافي خاص (15%):' : 'Exclusive 15% Bonus Coupon:'}
                        </span>
                        <code className="text-sm font-extrabold text-amber-800 tracking-wider">
                          O2SPECIAL
                        </code>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={copyCoupon}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 text-xs font-bold shadow-xs transition-colors"
                      >
                        {couponCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{couponCopied ? (isArabic ? 'تم النسخ!' : 'Copied!') : (isArabic ? 'نسخ الكوبون' : 'Copy Code')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={resetQuiz}
                        className="text-xs text-slate-400 hover:text-slate-600 underline"
                      >
                        {isArabic ? 'إعادة الاختبار' : 'Retake'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractivePresentation;
