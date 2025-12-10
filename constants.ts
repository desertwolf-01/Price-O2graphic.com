
import type { ServiceCategory, ServiceOption } from './types';

export const getUnitPrice = (option: ServiceOption, quantity: number): number => {
    if (!option.priceTiers || option.priceTiers.length === 0) {
        return option.price;
    }
    // Find the applicable tier: highest minQuantity <= quantity
    const tier = option.priceTiers
        .filter(t => t.minQuantity <= quantity)
        .sort((a, b) => b.minQuantity - a.minQuantity)[0];
        
    return tier ? tier.price : option.price;
}

export const SERVICE_CATEGORIES_AR: ServiceCategory[] = [
  {
    id: 'graphic-design-services',
    name: 'خدمات الهوية البصرية والتصميم الجرافيكي',
    description: 'نقدم حلولاً إبداعية ومبتكرة في عالم التصميم لتعزيز علامتك التجارية. تصفح خدماتنا واختر ما يناسب احتياجاتك للحصول على عرض سعر فوري.',
    options: [
      {
        id: 'brand-identity',
        name: '1. الهوية الأساسية (العمود الفقري للعلامة التجارية)',
        price: 500,
        items: [
          'الشعار الرئيسي (النسخة الأساسية المعتمدة)',
          'إصدارات الشعار: تدرجات ألوان، أبيض وأسود، عكسي (سلبي)',
          'أيقونة رقمية (للاستخدام على التطبيقات والمواقع)',
          'لوحة الألوان الرسمية (أساسية + ثانوية)',
          'قيم الألوان: Pantone / CMYK / RGB',
          'دليل ألوان بصري (PDF)',
          'الخطوط المعتمدة (عربية + لاتينية)',
        ],
      },
      {
        id: 'visual-elements',
        name: '2. العناصر البصرية الموسعة (لإثراء اللغة البصرية)',
        price: 100,
        items: [
          'نمط مرئي متكرر (Pattern) للاستخدام في الخلفيات والتغليف',
          'مجموعة أيقونات مخصصة (8-10 أيقونات) تعكس نشاط الشركة',
          'دليل استخدام الأيقونات والأنماط',
        ],
      },
      {
        id: 'stationery',
        name: '3. المواد المكتبية والمراسلات (للاحترافية اليومية داخل المؤسسة)',
        price: 600,
        items: [
          'بطاقات أعمال (5 تصاميم: المدير، المبيعات، الدعم، إلخ.)',
          'ورق مراسلات (A5 + A4)',
          'مظاريف (A4 + A3)',
          'فولدر عرض (A4 + A3)',
          'مذكرة صغيرة',
          'بطاقة باجة للموظفين',
          'بطاقة باجة للزوار',
          'فاتورة مخصصة',
          'سند قبض',
          'سند صرف',
          'تصميم أختام رسمية',
        ],
      },
      {
        id: 'digital-presence',
        name: '4. التواجد الرقمي والسوشيال ميديا (لبناء صورة احترافية على الإنترنت)',
        price: 400,
        items: [
          'غلاف فيسبوك، تويتر، LinkedIn',
          'قالب منشورات سوشيال ميديا (قابل للتخصيص)',
          'توقيع بريد إلكتروني موحد للموظفين',
          'قالب عرض تقديمي (PowerPoint) مخصص',
          'شاشة توقف لأجهزة الموظفين',
        ],
      },
      {
        id: 'promotional-materials',
        name: '5. اللافتات والعروض الترويجية (للفعاليات، المعارض، والمكتب)',
        price: 400,
        items: [
          'اللوحة الخارجية للمكتب',
          'رول أب (Roll-up Banner)',
          'فلاير إعلاني (تصميم قابل للطباعة)',
          'بوستر جداري كبير',
          'بطاقات تهنئة موسمية (رمضان، العيد، رأس السنة)',
          'لوحة إعلانية خارجية (Billboard - تصميم فني فقط)',
        ],
      },
      {
        id: 'promo-tools',
        name: '6. الأدوات الترويجية والهدايا التفاعلية (لبناء الولاء وتعزيز الانتشار)',
        price: 500,
        items: [
          'أقلام',
          'أكواب',
          'طاقية',
          'فلاشة USB',
          'دبوس شعار',
          'أكياس ورقية وبلاستيكية',
          'علم الشركة',
          'ميدالية شعار',
          'مغلف هدايا مخصص',
          'أجندة مكتبية',
          'مفكرة جيب',
          'مظلة تحمل الشعار',
        ],
      },
    ],
  },
  {
    id: 'exhibition-branding',
    name: 'الهوية البصرية للمعرض (Exhibition Branding)',
    description: 'خدمة متكاملة لتصميم وتجهيز هوية بصرية احترافية لجناحكم في المعارض والمؤتمرات.',
    options: [
        {
            id: 'exhibition-package',
            name: 'باقة هوية المعرض المتكاملة',
            price: 3500,
            items: [
                '__1. الهوية البصرية للمعرض__',
                'تطوير شعار فرعي خاص بالمشاركة في المعرض',
                'تحديد لوحة ألوان وخطوط مخصصة لبيئة المعرض',
                '__2. تصميم الجناح والواجهة (Booth Design)__',
                'تخطيط المساحة والتصميم الداخلي للجناح',
                'تصميم الواجهة الخارجية وخلفية رئيسية (Backdrop)',
                '__3. المواد المطبوعة واللافتات__',
                'لافتات تعريفية كبيرة (Roll-up / Pop-up) ولافتات معلقة',
                'ملصقات جدارية وأرضيات مطبوعة',
                '__4. مواد ترويجية وتوزيعات__',
                'بروشورات، كتيبات، وبطاقات عمل للمعرض',
                'هدايا ترويجية (أقلام، دفاتر) وأكياس',
                '__5. العروض الرقمية والتفاعلية__',
                'محتوى للشاشات (فيديوهات تعريفية، عروض متحركة)',
                '__6. زي العاملين (Staff Uniform)__',
                'تصميم ملابس موحدة وبادجات للموظفين',
                '__7. دليل الزائر والتوثيق__',
                'تصميم دليل مصغر للمعرض وتصاميم ما بعد الحدث',
            ]
        }
    ]
  },
  {
    id: 'website-design',
    name: 'خدمات تصميم وتطوير الموقع الإلكتروني',
    description: 'باقة متكاملة لإنشاء حضور رقمي احترافي لشركتك، من التصميم الجذاب إلى التطوير الآمن والمتابعة المستمرة.',
    options: [
      {
        id: 'website-package',
        name: 'باقة الموقع الإلكتروني المتكاملة',
        price: 1200,
        items: [
          '__1. التصميم__',
          'تصميم واجهات مستخدم جذابة وسهلة الاستخدام، متوافقة مع هوية العلامة التجارية، وتدعم جميع الأجهزة (Responsive – متجاوب).',
          '__2. الصفحة الرئيسية (Home)__',
          'واجهة الموقع الرئيسية التي تعرض: رسالة العلامة الأساسية، أبرز الخدمات أو المنتجات، دعوات للتفاعل (Call-to-Action)، شريط تنقل واضح.',
          '__3. من نحن (About Us)__',
          'صفحة تعريفية بالشركة تشمل: نبذة عن القصة والرؤية، القيم والإنجازات، فريق العمل.',
          '__4. منتجاتنا / خدمات (Products / Services)__',
          'عرض منظم للمنتجات أو الخدمات مع: صور عالية الجودة، وصف مختصر، خيارات تصنيف أو فلاتر.',
          '__5. المعرض (Gallery)__',
          'قسم لعرض: صور من المعارض أو المشاريع السابقة، فيديوهات أو ريلز، تنسيق شبكي أو كاروسيل جذاب.',
          '__6. اتصل بنا (Contact Us)__',
          'صفحة تحتوي على: نموذج تواصل مباشر، خريطة تفاعلية (Google Maps)، معلومات الاتصال (هاتف، بريد، عنوان).',
          '__7. المتابعة والصيانة (Support & Maintenance)__',
          'تحديثات دورية للمحتوى (حسب الاتفاق)، مراقبة أداء الموقع، دعم فني لمدة 3 أشهر بعد التسليم.',
          '__8. تأمين الموقع & Hosting Setup (Security & Hosting)__',
          'تركيب شهادة SSL لجعل الموقع آمناً (https://)، إعدادات حماية أساسية ضد الاختراق.',
        ]
      }
    ]
  },
  {
    id: 'social-media-design',
    name: 'تصميمات السوشيال ميديا',
    description: 'نظام متدرج لإدارة المحتوى. اختر مرحلة لتضمينها مع كل المراحل السابقة تلقائيًا.',
    isPhased: true,
    options: [
      {
        id: 'social-strategy',
        name: '1. التخطيط البصري والاستراتيجية (الأساس الذي يضمن فعالية المحتوى)',
        price: 75,
        items: [
            "جلسة تخطيط محتوى شهرية (30 دقيقة)",
            "اقتراح نصوص أولية + توزيع بصري لكل منشور",
            "موودبورد أو سكتشات أولية لـ 15 فكرة",
            "تجديد أنواع المنشورات (ترويج، تعليم، تفاعل، عروض...)",
            "الالتزام الكامل بهوية العلامة (ألوان، خطوط، أنماط)",
        ]
      },
      {
        id: 'social-professional-design',
        name: '2. التصميم الاحترافي (جودة عالية تُنافس كبار العلامات)',
        price: 300,
        items: [
          "تصميم 15 منشورًا احترافيًا (صور ثابتة أو كاروسيلات)",
          "تسليم بصيغ جاهزة للنشر: PNG عالي الجودة + JPG",
          "استخدام عناصر الهوية: شعار، أنماط، أيقونات، خطوط",
          "متوافق مع فيسبوك وإنستغرام (أحجام مثالية)",
        ]
      },
      {
        id: 'social-publishing',
        name: '3. النشر الذكي والجدولة (لضمان الوصول لأكبر جمهور)',
        price: 75,
        items: [
          "جدولة المنشورات في الأوقات المثلى",
          "نشر تلقائي بدون تدخل العميل",
          "تقرير بسيط شهري لأداء أقوى عدد المنشورات لتاريخ النشر",
        ]
      }
    ]
  },
  {
    id: 'corporate-materials',
    name: 'تصميم المواد المؤسسية والتعريفية',
    description: 'خدمات تصميم احترافية للمستندات الهامة التي تعكس هوية شركتك. السعر الموضح هو للصفحة الواحدة.',
    options: [
      {
        id: 'catalog-design',
        name: 'كتالوج المنتجات / الخدمات (Catalog)',
        price: 20,
        hasQuantity: true,
        items: [
          'عرض مرئي منظم للمنتجات أو الخدمات مع صور عالية الجودة، أوصاف واضحة، وأسعار.',
          'يُسلم كملف PDF جاهز للطباعة مع نسخة رقمية اختيارية.',
          'صور عالية الجودة',
          'أوصاف واضحة + مواصفات فنية',
          'أسعار (إن رغب العميل)',
          'شعار الشركة ولوحة ألوان موحدة',
          'التنسيق طباعة (PDF جاهز للطباعة) + نسخة رقمية (اختياري)'
        ]
      },
      {
        id: 'company-profile',
        name: 'بروفايل الشركة (Company Profile)',
        price: 20,
        hasQuantity: true,
        items: [
          'وثيقة احترافية تعكس هوية الشركة وقيمتها السوقية، وتشمل نبذة عن الشركة، إنجازاتها، فريقها، ومعلومات الاتصال.',
          'نبذة عن الشركة (الرؤية، الرسالة، القيم)',
          'أبرز المشاريع أو العملاء',
          'خط زمني للإنجازات (Timeline)',
          'فريق القيادة',
          'يُسلم بصيغتين: رقمي + ملف طباعة (PDF CMYK – 300 DPI)',
          'معلومات الاتصال',
        ]
      },
      {
        id: 'presentation-design',
        name: 'العرض التقديمي (Presentation / Pitch Deck)',
        price: 20,
        hasQuantity: true,
        items: [
          'شرائح احترافية مخصصة لـ Google Slides أو PowerPoint، مثالية لعروض العملاء، المستثمرين، أو الاجتماعات الداخلية.',
          'تصميم موحد مع هوية العلامة',
          'رسوم بيانية (Infographics)',
          'أيقونات وصور داعمة',
          'خلفيات جذابة وسهلة القراءة',
          'مخصصة لعروض العملاء والمستثمرين',
        ]
      },
      {
        id: 'annual-report',
        name: 'التقرير السنوي (Annual Report)',
        price: 20,
        hasQuantity: true,
        items: [
          'وثيقة رسمية تلخص أداء الشركة السنوي، تُصمم بأسلوب يعكس المصداقية والنجاح مع الحفاظ على هوية بصرية جذابة، ويُسلم كملف جاهز للطباعة.',
          'أهداف العام القادم',
          'رسالة من الإدارة',
          'نتائج مالية (جداول، رسوم بيانية)',
          'إنجازات رئيسية',
          'أبرز الأنشطة والفعاليات',
          'يُسلم بصيغة PDF الفاعلي + طباعة',
        ]
      }
    ]
  },
   {
    id: 'video-motion-graphics',
    name: 'تصميم الفيديو والموشن جرافيك',
    description: 'خدمات متخصصة في إنتاج الفيديوهات القصيرة والرسوم المتحركة لتعزيز حضورك الرقمي.',
    options: [
      {
        id: 'reels-package',
        name: 'باقة تصميم ريلز',
        price: 200,
        hasQuantity: true,
        quantityLabel: 'عدد الفيديوهات',
        priceSuffix: 'لكل فيديو',
        priceTiers: [
          { minQuantity: 1, price: 200 },
          { minQuantity: 10, price: 150 },
          { minQuantity: 15, price: 75 },
        ],
        items: [
            '__خدمة مخصصة لتصميم العناصر لمقاطع الريلز/الشورتس/تيك توك — جاهزة للمونتاج أو النشر.__',
            '__تنسيقات التسليم:__',
            'ملف فيديو نهائي بصيغة MP4 عالي الجودة (1080x1920) - جاهز للنشر',
            '__جرافيك متحرك احترافي:__',
            'تصميم إطارات (Scenes) جذابة ومتوافقة مع هوية علامتك البصرية',
            'نصوص متحركة بتأثيرات (Animated Typography) بسيطة وأنيقة',
            'خلفيات، أشكال، أنماط، وأيقونات داعمة تعكس طابع علامتك',
            'دمج الشعار والرسائل الأساسية بشكل بصري متناسق',
            '__عدد المراجعات:__',
            'حتى مرتين تعديل لكل ريلز (تعديل نص، لون، ترتيب المشاهد)',
        ]
      }
    ]
  },
  {
    id: 'packaging-design',
    name: 'تصميم الباكجينج',
    description: 'خدمات تصميم وتعديل التغليف والملصقات لمنتجاتكم.',
    options: [
      {
        id: 'packaging-design-new',
        name: 'تصميم الباكجينيج اكياس او علب لكل منتج',
        price: 500,
        items: [
          'تصميم جرافيكي علب او اكياس احترافي',
          'مراعاة الهوية البصرية متكاملة.',
          'تصميم يناسب طبيعة المنتجات.',
          'مراعاة معايير الجذب البصري والتسويق.',
        ],
      },
      {
        id: 'packaging-design-edit',
        name: 'تعديل التصاميم الحالية للباكجينج اكياس او علب',
        price: 100,
        items: [
          'تطوير التغليف القديم ليكون أكثر عصرية وجاذبية.',
          'تحسين الألوان أو الخطوط أو الصور.',
          'إضافة عناصر جديدة مثل (ختم "جديد"، "عرض محدود"، إلخ).',
        ],
      },
      {
        id: 'sticker-design-new',
        name: 'تصميم الباكجينج للمعليات لكل منتج (Stickers)',
        price: 150,
        items: ['تصميم ملصقات (Stickers)'],
      },
      {
        id: 'sticker-design-edit',
        name: 'تعديل التصاميم الباكجينج للمعليات لكل منتج (Stickers)',
        price: 50,
        items: ['تعديل تصميم ملصقات (Stickers)'],
      },
    ]
  }
];

export const SERVICE_CATEGORIES_EN: ServiceCategory[] = [
  {
    id: 'graphic-design-services',
    name: 'Visual Identity and Graphic Design Services',
    description: 'We offer creative and innovative solutions in the world of design to enhance your brand. Browse our services and choose what suits your needs to get an instant price quote.',
    options: [
      {
        id: 'brand-identity',
        name: '1. Basic Identity (The Backbone of the Brand)',
        price: 500,
        items: [
          'Main Logo (The approved version)',
          'Logo Variations: color gradients, black and white, inverse (negative)',
          'Digital Icon (For use on apps and websites)',
          'Official Color Palette (Primary + Secondary)',
          'Color Values: Pantone / CMYK / RGB',
          'Visual Color Guide (PDF)',
          'Approved Fonts (Arabic + Latin)',
        ],
      },
      {
        id: 'visual-elements',
        name: '2. Expanded Visual Elements (To enrich the visual language)',
        price: 100,
        items: [
          'Repeating visual pattern for backgrounds and packaging',
          'Custom icon set (8-10 icons) reflecting company activity',
          'Style guide for icons and patterns',
        ],
      },
      {
        id: 'stationery',
        name: '3. Stationery and Correspondence (For daily professionalism within the institution)',
        price: 600,
        items: [
          'Business Cards (5 designs: Manager, Sales, Support, etc.)',
          'Letterhead (A5 + A4)',
          'Envelopes (A4 + A3)',
          'Presentation Folder (A4 + A3)',
          'Small Notepad',
          'Employee Badge',
          'Visitor Badge',
          'Custom Invoice',
          'Receipt Voucher',
          'Payment Voucher',
          'Official Stamp Design',
        ],
      },
      {
        id: 'digital-presence',
        name: '4. Digital and Social Media Presence (To build a professional online image)',
        price: 400,
        items: [
          'Covers for Facebook, Twitter, LinkedIn',
          'Customizable social media post template',
          'Unified email signature for employees',
          'Custom PowerPoint presentation template',
          'Screensaver for employee devices',
        ],
      },
      {
        id: 'promotional-materials',
        name: '5. Signage and Promotional Offers (For events, exhibitions, and the office)',
        price: 400,
        items: [
          'Exterior office sign',
          'Roll-up Banner',
          'Promotional Flyer (Print-ready design)',
          'Large wall poster',
          'Seasonal greeting cards (Ramadan, Eid, New Year)',
          'Outdoor billboard (Artwork design only)',
        ],
      },
      {
        id: 'promo-tools',
        name: '6. Promotional Tools and Interactive Gifts (To build loyalty and enhance spread)',
        price: 500,
        items: [
          'Pens',
          'Mugs',
          'Cap',
          'USB Flash Drive',
          'Logo Pin',
          'Paper and Plastic Bags',
          'Company Flag',
          'Logo Medal',
          'Custom Gift Envelope',
          'Desk Agenda',
          'Pocket Notebook',
          'Umbrella with Logo',
        ],
      },
    ],
  },
  {
    id: 'exhibition-branding',
    name: 'Exhibition Branding',
    description: 'A comprehensive service to design and equip a professional visual identity for your booth at exhibitions and conferences.',
    options: [
        {
            id: 'exhibition-package',
            name: 'Integrated Exhibition Identity Package',
            price: 3500,
            items: [
                '__1. Visual Identity for the Exhibition__',
                'Development of a secondary logo for participation in the exhibition',
                'Selection of a color palette and fonts specific to the exhibition environment',
                '__2. Booth and Facade Design__',
                'Space planning and interior design of the booth',
                'Exterior facade and main backdrop design',
                '__3. Printed Materials and Signage__',
                'Large informational signs (Roll-up / Pop-up) and hanging signs',
                'Printed wall and floor stickers',
                '__4. Promotional Materials and Giveaways__',
                'Brochures, booklets, and business cards for the exhibition',
                'Promotional gifts (pens, notebooks) and bags',
                '__5. Digital and Interactive Displays__',
                'Content for screens (introductory videos, animated offers)',
                '__6. Staff Uniform__',
                'Design of unified clothing and badges for staff',
                '__7. Visitor Guide and Documentation__',
                'Design of a mini guide for the exhibition and post-event designs',
            ]
        }
    ]
  },
  {
    id: 'website-design',
    name: 'Website Design and Development Services',
    description: 'A complete package to establish a professional digital presence for your company, from attractive design to secure development and ongoing support.',
    options: [
      {
        id: 'website-package',
        name: 'Integrated Website Package',
        price: 1200,
        items: [
          '__1. Design__',
          'Attractive and user-friendly interface design, compatible with the brand identity, and responsive across all devices.',
          '__2. Home Page__',
          'Main site interface displaying: brand message, key services/products, calls-to-action, clear navigation bar.',
          '__3. About Us__',
          'A page defining the company including: a brief on the story and vision, values and achievements, the team.',
          '__4. Products / Services__',
          'Organized display of products or services with: high-quality images, brief descriptions, classification or filter options.',
          '__5. Gallery__',
          'A section to display: photos from exhibitions or previous projects, videos or reels, in a grid or carousel layout.',
          '__6. Contact Us__',
          'A page containing: a direct contact form, an interactive map (Google Maps), contact information (phone, email, address).',
          '__7. Support & Maintenance__',
          'Periodic content updates (as agreed), website performance monitoring, technical support for 3 months after delivery.',
          '__8. Security & Hosting Setup__',
          'Installation of an SSL certificate to secure the site (https://), basic security settings against breaches.',
        ]
      }
    ]
  },
  {
    id: 'social-media-design',
    name: 'Social Media Designs',
    description: 'A phased content management system. Select a phase to automatically include all preceding phases.',
    isPhased: true,
    options: [
      {
        id: 'social-strategy',
        name: '1. Visual Planning and Strategy (The foundation that ensures content effectiveness)',
        price: 75,
        items: [
            "Monthly content planning session (30 minutes)",
            "Initial text proposals + visual distribution for each post",
            "Moodboard or initial sketches for 15 ideas",
            "Renewal of post types (promotion, education, interaction, offers...)",
            "Full adherence to brand identity (colors, fonts, styles)",
        ]
      },
      {
        id: 'social-professional-design',
        name: '2. Professional Design (High quality that rivals major brands)',
        price: 300,
        items: [
          "Design of 15 professional posts (static images or carousels)",
          "Delivery in ready-to-publish formats: high-quality PNG + JPG",
          "Use of identity elements: logo, patterns, icons, fonts",
          "Compatible with Facebook and Instagram (ideal sizes)",
        ]
      },
      {
        id: 'social-publishing',
        name: '3. Smart Publishing and Scheduling (To ensure reaching the largest audience)',
        price: 75,
        items: [
          "Scheduling posts at optimal times",
          "Automatic publishing without client intervention",
          "Simple monthly report on the performance of the strongest posts by publication date",
        ]
      }
    ]
  },
  {
    id: 'corporate-materials',
    name: 'Corporate and Informational Materials Design',
    description: 'Professional design services for important documents that reflect your company\'s identity. The price shown is per page.',
    options: [
      {
        id: 'catalog-design',
        name: 'Product / Service Catalog',
        price: 20,
        hasQuantity: true,
        items: [
          'An organized visual display of products or services with high-quality images, clear descriptions, and prices.',
          'Delivered as a print-ready PDF file with an optional digital version.',
          'High-quality images',
          'Clear descriptions + technical specifications',
          'Prices (if the client desires)',
          'Company logo and unified color palette',
          'Print format (print-ready PDF) + digital version (optional)'
        ]
      },
      {
        id: 'company-profile',
        name: 'Company Profile',
        price: 20,
        hasQuantity: true,
        items: [
          'A professional document reflecting the company\'s identity and market value, including a summary of the company, its achievements, team, and contact information.',
          'About the company (vision, mission, values)',
          'Key projects or clients',
          'Timeline of achievements',
          'Leadership team',
          'Delivered in two formats: digital + print file (PDF CMYK – 300 DPI)',
          'Contact information',
        ]
      },
      {
        id: 'presentation-design',
        name: 'Presentation / Pitch Deck',
        price: 20,
        hasQuantity: true,
        items: [
          'Custom professional slides for Google Slides or PowerPoint, ideal for client presentations, investors, or internal meetings.',
          'Design consistent with brand identity',
          'Infographics',
          'Supporting icons and images',
          'Attractive and easy-to-read backgrounds',
          'Customized for client and investor presentations',
        ]
      },
      {
        id: 'annual-report',
        name: 'Annual Report',
        price: 20,
        hasQuantity: true,
        items: [
          'An official document summarizing the company\'s annual performance, designed in a style that reflects credibility and success while maintaining an attractive visual identity.',
          'Goals for the coming year',
          'Message from management',
          'Financial results (tables, charts)',
          'Key achievements',
          'Main activities and events',
          'Delivered as an interactive PDF + print version',
        ]
      }
    ]
  },
   {
    id: 'video-motion-graphics',
    name: 'Video and Motion Graphics Design',
    description: 'Specialized services in producing short videos and animated graphics to enhance your digital presence.',
    options: [
      {
        id: 'reels-package',
        name: 'Reels Design Package',
        price: 200,
        hasQuantity: true,
        quantityLabel: 'Number of Videos',
        priceSuffix: 'per video',
        priceTiers: [
          { minQuantity: 1, price: 200 },
          { minQuantity: 10, price: 150 },
          { minQuantity: 15, price: 75 },
        ],
        items: [
            '__Customized service for designing elements for Reels/Shorts/TikTok clips — ready for editing or publishing.__',
            '__Delivery Formats:__',
            'Final video file in high-quality MP4 format (1080x1920) - ready to publish',
            '__Professional Motion Graphics:__',
            'Design of attractive scenes compatible with your brand\'s visual identity',
            'Animated text with simple and elegant effects (Animated Typography)',
            'Backgrounds, shapes, patterns, and supporting icons that reflect your brand\'s character',
            'Integration of the logo and key messages in a visually consistent manner',
            '__Number of Revisions:__',
            'Up to two revisions per reel (text, color, scene order adjustment)',
        ]
      }
    ]
  },
  {
    id: 'packaging-design',
    name: 'Packaging Design',
    description: 'Services for designing and modifying packaging and labels for your products.',
    options: [
      {
        id: 'packaging-design-new',
        name: 'Packaging Design for Bags or Boxes per Product',
        price: 500,
        items: [
          'Professional graphic design for boxes or bags',
          'Consideration of a complete visual identity.',
          'Design that suits the nature of the products.',
          'Consideration of visual appeal and marketing standards.',
        ],
      },
      {
        id: 'packaging-design-edit',
        name: 'Modification of Current Packaging Designs for Bags or Boxes',
        price: 100,
        items: [
          'Developing old packaging to be more modern and attractive.',
          'Improving colors, fonts, or images.',
          'Adding new elements like (a "new" stamp, "limited offer," etc.).',
        ],
      },
      {
        id: 'sticker-design-new',
        name: 'Packaging Sticker Design per Product',
        price: 150,
        items: ['Sticker Design'],
      },
      {
        id: 'sticker-design-edit',
        name: 'Modification of Packaging Sticker Designs per Product',
        price: 50,
        items: ['Sticker Design Modification'],
      },
    ]
  }
];

export function getServiceCategories(lang: 'ar' | 'en'): ServiceCategory[] {
  switch (lang) {
    case 'ar':
      return SERVICE_CATEGORIES_AR;
    case 'en':
    default:
      return SERVICE_CATEGORIES_EN;
  }
}
