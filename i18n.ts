export interface Translation {
  // App.tsx & StaticSection.tsx
  proposalTitle: string;
  proposalDescription: string;
  clientInfoTitle: string;
  proposalDateLabel: string;
  clientNameLabel: string;
  clientNamePlaceholder: string;
  clientPhoneLabel: string;
  clientPhonePlaceholder: string;
  clientEmailLabel: string;
  clientEmailPlaceholder: string;
  emailError: string;
  fillInfoAlert: string;
  fillInfoAlertClient: string;

  // PricingSection.tsx
  selectServicesTitle: string;
  selectServicesDescription: string;

  // PricingOption.tsx
  pagesLabel: string;
  perPageSuffix: string;
  decreaseQuantity: string;
  increaseQuantity: string;
  currentQuantity: string;

  // TotalBar.tsx
  priceSummaryTitle: string;
  selectedServicesTitle: string;
  subtotal: string;
  discountLabel: (percentage: number) => string;
  totalPrice: string;
  totalDiscountApplied: (percentage: number) => string;
  proposalTo: (name: string) => string;
  sendEmail: string;
  sendProposal: string;
  sending: string;
  clearSelection: string;
  emailConfigMissing: string;
  emailSendError: string;
  emailSendErrorConfig: string;
  emailSendErrorNetwork: string;

  // TermsAndConditions.tsx
  termsTitle: string;
  term1Title: string;
  term1Desc: string;
  term2Title: string;
  term2Desc: string;
  term3Title: string;
  term3Desc: string;
  term4Title: string;
  term4Desc: string;
  term5Title: string;
  term5Desc: string;
  term6Title: string;
  term6Desc: string;

  // SuccessScreen.tsx
  successMessageTitle: string;
  successMessageClientBody: string;
  successMessageEmailBody: string;
  backToProposal: string;
}

const en: Translation = {
  proposalTitle: 'Graphic Design Services Price Quote',
  proposalDescription: `
    <p class="font-bold text-lg">From an Idea to an Exceptional Design: We Craft a Visual Identity That Creates a Lasting Impression</p>
    <p class="mt-2">For over 15 years, we have been transforming visions and ideas into tangible visual realities, raising the standards of aesthetics and craftsmanship in every project. We don't just deliver "images"; we create integrated visual experiences that forever establish your brand's identity in the minds of your customers.</p>
    <p class="mt-2">We are proud of our partnerships with a diverse range of brands, from ambitious startups to established institutions, with one goal: to create designs that are not just seen, but inspire emotion, unleash creativity, and achieve the desired transformation.</p>
    <h3 class="font-bold text-md mt-4">Our Comprehensive Services to Build Your Visual World:</h3>
    <ul class="list-disc list-inside mt-2 space-y-1">
      <li><strong>Integrated Visual Identity Design:</strong> We create a logo that encapsulates your story and becomes the unforgettable face of your brand.</li>
      <li><strong>Social Media Campaign Management and Design:</strong> We produce engaging content that moves your audience and builds sustainable loyalty.</li>
      <li><strong>Animation and 3D Content Production:</strong> We give your ideas a new dimension with innovative, breathtaking designs that express your uniqueness.</li>
    </ul>
    <p class="mt-2 font-semibold">You choose, and let us do the rest.</p>
  `,
  clientInfoTitle: 'Client Information',
  proposalDateLabel: 'Proposal Date',
  clientNameLabel: 'Client Name',
  clientNamePlaceholder: 'e.g., John Doe',
  clientPhoneLabel: 'Phone Number',
  clientPhonePlaceholder: '555 123 4567',
  clientEmailLabel: 'Email Address',
  clientEmailPlaceholder: 'e.g., email@example.com',
  emailError: 'Please enter a valid email address.',
  fillInfoAlert: 'Please fill in all client information (Name, Phone, Email) before proceeding.',
  fillInfoAlertClient: 'Please fill in your name, phone, and email to submit your inquiry.',
  selectServicesTitle: 'Select Services',
  selectServicesDescription: 'Choose from the services below to build your custom package. For services with quantities, the price is per page.',
  pagesLabel: 'Pages:',
  perPageSuffix: 'per page',
  decreaseQuantity: 'Decrease quantity',
  increaseQuantity: 'Increase quantity',
  currentQuantity: 'Current quantity',
  priceSummaryTitle: 'Price Summary',
  selectedServicesTitle: 'Selected Services',
  subtotal: 'Subtotal',
  discountLabel: (percentage) => `Discount (${percentage}%)`,
  totalPrice: 'Total Price',
  totalDiscountApplied: (percentage) => `${percentage}% discount applied!`,
  proposalTo: (name) => `A proposal prepared for ${name}.`,
  sendEmail: 'Send via WhatsApp',
  sendProposal: 'Submit Inquiry',
  sending: 'Sending...',
  clearSelection: 'Clear Selection',
  emailConfigMissing: 'The email system is not configured. Please contact support.',
  emailSendError: 'There was an error sending the email. Please try again later or contact support.',
  emailSendErrorConfig: 'There seems to be an issue with our email configuration. Please contact support.',
  emailSendErrorNetwork: 'A network error occurred. Please check your connection and try again.',
  termsTitle: 'Terms & Conditions',
  term1Title: 'Payment Terms',
  term1Desc: 'A 50% deposit is required to start the project, with the remaining balance due upon completion.',
  term2Title: 'Revisions',
  term2Desc: 'Each service includes up to two rounds of revisions. Additional revisions will be billed at an hourly rate.',
  term3Title: 'Timeline',
  term3Desc: 'Project timelines are estimates and may vary based on feedback and revision cycles.',
  term4Title: 'Cancellation',
  term4Desc: 'Projects cancelled after commencement will be billed for the work completed to date.',
  term5Title: 'Ownership',
  term5Desc: 'Upon final payment, the client will own the rights to the final designs.',
  term6Title: 'Confidentiality',
  term6Desc: 'We will treat all project-related information as confidential.',
  successMessageTitle: 'Inquiry Sent!',
  successMessageClientBody: 'Thank you for your interest!\nWe have received your service inquiry and will contact you shortly to discuss the details.',
  successMessageEmailBody: 'The proposal has been sent successfully.',
  backToProposal: 'Back to Proposal',
};

const ar: Translation = {
  proposalTitle: 'عرض أسعار خدمات التصميم الجرافيكي',
  proposalDescription: `
    <p class="font-bold text-lg">من فكرة إلى تصميم استثنائي: نصنع هويتك البصرية التي تخلق انطباعاً يدوم</p>
    <p class="mt-2">لأكثر من 15 عاماً، ونحن نعمل على تحويل الرؤى والأفكار إلى واقع بصري ملموس، حيث نرفع معايير الجمالية والإتقان في كل مشروع. نحن لا نقدم مجرد "صور"، بل نبتكر تجارب بصرية متكاملة تثبت هوية علامتك التجارية في أذهان عملائك إلى الأبد.</p>
    <p class="mt-2">نفتخر بشراكاتنا مع علامات تجارية متنوعة، بدءاً من الشركات الناشئة الطموحة ووصولاً إلى المؤسسات الراسخة، بهدف واحد: صناعة تصميمات لا تُشاهد فقط، بل تُلهِم المشاعر، تُطلق العنان للإبداع، وتُحقق التحول المنشود.</p>
    <h3 class="font-bold text-md mt-4">خدماتنا الشاملة لبناء عالمك البصري:</h3>
    <ul class="list-disc list-inside mt-2 space-y-1">
      <li><strong>تصميم الهوية البصرية المتكاملة:</strong> نصنع لك شعاراً يختزل قصتك ويكون وجه علامتك التجارية الذي لا يُنسى.</li>
      <li><strong>إدارة وتصميم حملات وسائل التواصل الاجتماعي:</strong> نخلق محتوى جذاباً يحرك جمهورك ويبني ولاءً مستداماً.</li>
      <li><strong>إنتاج رسوم متحركة ومحتوى ثلاثي الأبعاد:</strong> نمنح أفكارك بُعداً جديداً بتصاميم مبتكرة تخطف الأنفاس وتُعبر عن تميزك.</li>
    </ul>
    <p class="mt-2 font-semibold">اختر، ودعنا نكمل الباقي.</p>
  `,
  clientInfoTitle: 'بيانات العميل',
  proposalDateLabel: 'تاريخ العرض',
  clientNameLabel: 'اسم العميل',
  clientNamePlaceholder: 'مثال: جون دو',
  clientPhoneLabel: 'رقم الهاتف',
  clientPhonePlaceholder: '555 123 4567',
  clientEmailLabel: 'البريد الإلكتروني',
  clientEmailPlaceholder: 'مثال: email@example.com',
  emailError: 'الرجاء إدخال عنوان بريد إلكتروني صالح.',
  fillInfoAlert: 'يرجى ملء جميع بيانات العميل (الاسم، الهاتف، البريد الإلكتروني) قبل المتابعة.',
  fillInfoAlertClient: 'يرجى ملء اسمك وهاتفك وبريدك الإلكتروني لإرسال استفسارك.',
  selectServicesTitle: 'اختر الخدمات',
  selectServicesDescription: 'اختر من الخدمات أدناه لبناء باقتك المخصصة. بالنسبة للخدمات ذات الكميات، السعر للصفحة الواحدة.',
  pagesLabel: 'الصفحات:',
  perPageSuffix: 'لكل صفحة',
  decreaseQuantity: 'تقليل الكمية',
  increaseQuantity: 'زيادة الكمية',
  currentQuantity: 'الكمية الحالية',
  priceSummaryTitle: 'ملخص السعر',
  selectedServicesTitle: 'الخدمات المختارة',
  subtotal: 'المجموع الفرعي',
  discountLabel: (percentage) => `خصم (${percentage}%)`,
  totalPrice: 'السعر الإجمالي',
  totalDiscountApplied: (percentage) => `تم تطبيق خصم ${percentage}%!`,
  proposalTo: (name) => `عرض سعر مُعد لـ ${name}.`,
  sendEmail: 'إرسال عبر واتساب',
  sendProposal: 'إرسال الاستفسار',
  sending: 'جارٍ الإرسال...',
  clearSelection: 'مسح الاختيارات',
  emailConfigMissing: 'نظام البريد الإلكتروني غير مهيأ. يرجى الاتصال بالدعم.',
  emailSendError: 'حدث خطأ أثناء إرسال البريد الإلكتروني. يرجى المحاولة مرة أخرى لاحقًا أو الاتصال بالدعم.',
  emailSendErrorConfig: 'يبدو أن هناك مشكلة في إعدادات البريد الإلكتروني لدينا. يرجى الاتصال بالدعم.',
  emailSendErrorNetwork: 'حدث خطأ في الشبكة. يرجى التحقق من اتصالك والمحاولة مرة أخرى.',
  termsTitle: 'الشروط والأحكام',
  term1Title: 'شروط الدفع',
  term1Desc: 'مطلوب دفعة مقدمة 50% لبدء المشروع، ويُستحق الرصيد المتبقي عند الانتهاء.',
  term2Title: 'التعديلات',
  term2Desc: 'تشمل كل خدمة ما يصل إلى جولتين من التعديلات. سيتم محاسبة التعديلات الإضافية بالساعة.',
  term3Title: 'الجدول الزمني',
  term3Desc: 'الجداول الزمنية للمشاريع هي تقديرات وقد تختلف بناءً على الملاحظات ودورات التعديل.',
  term4Title: 'الإلغاء',
  term4Desc: 'المشاريع التي يتم إلغاؤها بعد البدء سيتم محاسبتها على العمل المنجز حتى تاريخه.',
  term5Title: 'الملكية',
  term5Desc: 'عند الدفع النهائي، سيمتلك العميل حقوق التصاميم النهائية.',
  term6Title: 'السرية',
  term6Desc: 'سنتعامل مع جميع المعلومات المتعلقة بالمشروع على أنها سرية.',
  successMessageTitle: 'تم إرسال الاستفسار!',
  successMessageClientBody: 'شكراً لاهتمامك!\nلقد استلمنا استفسارك وسنتصل بك قريباً لمناقشة التفاصيل.',
  successMessageEmailBody: 'تم إرسال عرض السعر بنجاة.',
  backToProposal: 'العودة إلى العرض',
};

export const translations = { en, ar };