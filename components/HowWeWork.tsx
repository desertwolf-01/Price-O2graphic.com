import React from 'react';

interface HowWeWorkProps {
  language: 'ar' | 'en';
}

interface StepItem {
  id: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

const STEPS: StepItem[] = [
  {
    id: 1,
    titleAr: 'نفهم',
    titleEn: 'Understand',
    descAr: 'نحدد الهدف الجمهور وطبيعة الفعالية',
    descEn: 'Define the objective, target audience, and project scope',
  },
  {
    id: 2,
    titleAr: 'نصمم',
    titleEn: 'Design',
    descAr: 'نبني الفكرة والتجربة بشكل واضح',
    descEn: 'Shape the concept and user experience clearly',
  },
  {
    id: 3,
    titleAr: 'نخطط',
    titleEn: 'Plan',
    descAr: 'نحوّل الفكرة إلى خطة تنفيذية دقيقة',
    descEn: 'Turn vision into a detailed execution roadmap',
  },
  {
    id: 4,
    titleAr: 'ننفذ',
    titleEn: 'Execute',
    descAr: 'ندير التنفيذ باحترافية وتركيز عالي',
    descEn: 'Deliver flawlessly with high precision and expertise',
  },
  {
    id: 5,
    titleAr: 'نقيس',
    titleEn: 'Measure',
    descAr: 'نحلل النتائج ونطور الأداء',
    descEn: 'Analyze results and continuously elevate performance',
  },
];

const HowWeWork: React.FC<HowWeWorkProps> = ({ language }) => {
  const isArabic = language === 'ar';
  const stepsList = STEPS;

  return (
    <section 
      id="how-we-work-section"
      aria-label={isArabic ? 'كيف نعمل' : 'How We Work'}
      className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-[#50B0CE]/30 shadow-2xl transition-all print:shadow-none print:border-[#003057]"
      style={{
        background: 'radial-gradient(circle at 50% 25%, #003057 0%, #002240 50%, #001426 100%)',
      }}
    >
      {/* Decorative ambient lighting overlays using brand Secondary #50B0CE & Neutral #C5F1FF */}
      <div 
        className="absolute -top-24 left-1/4 w-96 h-96 bg-[#50B0CE]/15 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-24 right-1/4 w-96 h-96 bg-[#C5F1FF]/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative p-6 sm:p-8 md:p-10 text-white">
        {/* Header Title */}
        <div 
          className="mb-8 md:mb-12"
          style={{ direction: isArabic ? 'rtl' : 'ltr' }}
        >
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#50B0CE] shadow-sm shadow-[#50B0CE] animate-pulse" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm font-sans">
              {isArabic ? 'كيف نعمل:' : 'How We Work:'}
            </h2>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-[#C5F1FF]/85 max-w-xl font-medium">
            {isArabic 
              ? 'منهجية عمل متكاملة وواضحة تضمن تحويل رؤيتك إلى واقع ملموس بأعلى درجات الجودة والاحترافية' 
              : 'A transparent, structured workflow designed to turn your vision into impactful reality with flawless execution.'}
          </p>
        </div>

        {/* Desktop & Tablet Timeline View (Horizontal matching brand identity) */}
        <div 
          className="hidden md:block"
          style={{ direction: isArabic ? 'rtl' : 'ltr' }}
        >
          <div className="grid grid-cols-5 gap-2 relative items-start">
            {stepsList.map((step, index) => {
              const isLast = index === stepsList.length - 1;

              return (
                <div 
                  key={step.id} 
                  className="flex flex-col items-center text-center relative group"
                >
                  {/* Connecting Line to next step */}
                  {!isLast && (
                    <div 
                      className={`absolute top-10 h-0.5 z-0 pointer-events-none ${
                        isArabic ? 'left-[-50%] right-[50%]' : 'right-[-50%] left-[50%]'
                      }`}
                      style={{ width: '100%' }}
                    >
                      {/* Base connecting line */}
                      <div className="w-full h-full bg-[#50B0CE]/40 relative">
                        {/* Connecting dot node */}
                        <div 
                          className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white ring-2 ring-[#50B0CE] shadow-sm shadow-[#50B0CE]/50 ${
                            isArabic ? 'left-3' : 'right-3'
                          }`} 
                        />
                      </div>
                    </div>
                  )}

                  {/* Diamond Icon Container in Brand Colors */}
                  <div className="relative z-10 mb-6 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rotate-45 rounded-xl bg-gradient-to-br from-[#50B0CE] via-[#389cb9] to-[#003057] p-0.5 shadow-lg shadow-[#001426]/80 ring-1 ring-[#C5F1FF]/30 group-hover:ring-[#C5F1FF] group-hover:shadow-[#50B0CE]/30 transition-all duration-300 flex items-center justify-center">
                      <div className="w-full h-full rounded-[10px] bg-gradient-to-br from-[#41a3c0] to-[#1c6f8a] flex items-center justify-center">
                        <span className="-rotate-45 font-extrabold text-white text-base sm:text-lg tracking-wide select-none drop-shadow-md">
                          {isArabic ? step.titleAr : step.titleEn}
                        </span>
                      </div>
                    </div>

                    {/* Step number badge */}
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#003057] border border-[#50B0CE] text-[10px] font-bold text-[#C5F1FF] flex items-center justify-center font-mono shadow-xs">
                      {step.id}
                    </div>
                  </div>

                  {/* Description text */}
                  <div className="px-1 min-h-[48px] flex items-start justify-center">
                    <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed drop-shadow-xs max-w-[140px]">
                      {isArabic ? step.descAr : step.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile View (Touch-friendly responsive cards with connected stepper in brand colors) */}
        <div 
          className="md:hidden space-y-4"
          style={{ direction: isArabic ? 'rtl' : 'ltr' }}
        >
          <div className="relative border-s-2 border-[#50B0CE]/40 ms-4 space-y-6 ps-6">
            {stepsList.map((step) => (
              <div 
                key={step.id} 
                className="relative flex items-center gap-4 group"
              >
                {/* Diamond node on the vertical connector line */}
                <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? '-right-[35px]' : '-left-[35px]'}`}>
                  <div className="w-9 h-9 rotate-45 rounded-md bg-gradient-to-br from-[#50B0CE] to-[#1c6f8a] border border-[#C5F1FF]/50 flex items-center justify-center shadow-md">
                    <span className="-rotate-45 text-[10px] font-bold text-white font-mono">
                      {step.id}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex-1 bg-[#003057]/70 hover:bg-[#003057]/90 border border-[#50B0CE]/30 rounded-xl p-3.5 transition-colors shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-extrabold text-base text-white">
                      {isArabic ? step.titleAr : step.titleEn}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#001f3b] text-[#C5F1FF] border border-[#50B0CE]/50">
                      {isArabic ? `المرحلة 0${step.id}` : `Phase 0${step.id}`}
                    </span>
                  </div>
                  <p className="text-xs text-[#C5F1FF]/90 font-medium leading-relaxed">
                    {isArabic ? step.descAr : step.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
