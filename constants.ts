
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

export const VALID_COUPONS = [
    { code: 'WELCOME10', discount: 10 },
    { code: 'SAVE20', discount: 15 },
    { code: 'O2SPECIAL', discount: 20 },
    { code: 'FREE', discount: 1 }, // For testing or special cases
];

const CORPORATE_PRICE_TIERS = [
    { minQuantity: 1, price: 20 },
    { minQuantity: 20, price: 18 },
    { minQuantity: 30, price: 15 },
    { minQuantity: 51, price: 12 },
];

const PACKAGING_BAG_PRICE_TIERS = [
    { minQuantity: 1, price: 350 },
    { minQuantity: 6, price: 300 },
    { minQuantity: 15, price: 200 },
];

const PACKAGING_BOX_PRICE_TIERS = [
    { minQuantity: 1, price: 350 },
    { minQuantity: 6, price: 300 },
    { minQuantity: 15, price: 250 },
];

const PACKAGING_STICKER_NEW_PRICE_TIERS = [
    { minQuantity: 1, price: 150 },
    { minQuantity: 6, price: 100 },
    { minQuantity: 15, price: 50 },
];

export const SERVICE_CATEGORIES_EN: ServiceCategory[] = [
  {
    id: 'graphic-design-services',
    name: 'Visual Identity & Graphic Design Services',
    description: 'We offer creative and innovative design solutions to enhance your brand. Browse our services and choose what suits your needs for an instant quote.<br/><br/><strong>🔄 Workflow Summary:</strong><br/>1- Need a clear strategy? → Request "Visual Strategy".<br/>2- Need a logo? → Request "Core Identity".<br/>3- Need digital presence? → Request "Digital Presence".<br/>4- Need internal professionalism? → Request "Stationery".<br/>5- Participating in events? → Request "Signage".<br/>6- Distributing gifts? → Request "Promotional Tools".',
    options: [
      {
        id: 'visual-strategy',
        name: '1. Visual Strategy (The Foundation)',
        price: 300,
        description: '“Don’t start designing before you know who you are, why you are here, and how you differ.” We don’t just draw — we build an identity based on vision.',
        items: [
            '__1. About Brand:__ Who are we? What is our field? Our story?',
            '__2. Values:__ Principles we believe in (e.g., Quality, Trust).',
            '__3. Golden Circle:__ Why → How → What.',
            '__4. Mission:__ What do we strive to achieve daily?',
            '__5. Vision:__ Where are we heading?',
            '__6. Positioning Statement:__ How do we distinguish ourselves from competitors? Who do we serve? And what do we offer them?',
            '__7. Naming:__ Naming rationale and meaning.',
            '__8. Brand Story:__ Founding story and challenges.',
            '__9. Tagline:__ Short phrase expressing the brand essence.',
            '__10. Brand Attributes:__ Personality traits (e.g., Modern, Friendly).'
        ]
      },
      {
        id: 'brand-identity',
        name: '2. Core Identity (The Brand Backbone)',
        price: 500,
        items: [
          '__1. Main Logo:__ Primary approved version.',
          '__2. Logo Variations:__ Full color, Black & White, Negative/Reverse.',
          '__3. Digital Icon:__ Simplified logo for apps/web.',
          '__4. Color Palette:__ Primary and secondary colors.',
          '__5. Color Values:__ CMYK (Print) and RGB (Screen).',
          '__6. Typography:__ Approved Arabic and Latin fonts.',
          '__7. Visual Style Guide (PDF):__ Guidelines for usage.',
          '__8. Pattern:__ Repeatable brand pattern.',
          '__9. Background Pattern:__ For presentations/digital.',
          '__10. Packaging Pattern:__ Adapted for packaging.',
          '__11. Custom Icon Set:__ Unique icons matching brand style.',
        ],
      },
      {
        id: 'digital-presence',
        name: '3. Digital Presence & Social Media',
        price: 350,
        items: [
          '__1. Social Media Covers:__ Facebook, Twitter (X), LinkedIn.',
          '__2. Social Media Template:__ Customizable post design.',
          '__3. Email Signature:__ Unified design for employees.',
          '__4. Presentation Template:__ PowerPoint master slides.',
          '__5. Screensaver:__ Branded desktop background.',
        ],
      },
      {
        id: 'stationery',
        name: '4. Stationery & Correspondence',
        price: 350,
        items: [
          '__1. Business Cards:__ 5 designs for different roles.',
          '__2. Letterhead:__ A4 and A5 versions.',
          '__3. Envelopes:__ A4 and A3 sizes.',
          '__4. Presentation Folder:__ A4 and A3 sizes.',
          '__5. Note Pad:__ Branded memo pad.',
          '__6. ID Cards:__ Employee and Visitor badges.',
          '__7. Financial Documents:__ Invoice, Receipt, Payment Voucher.',
          '__8. Official Stamps:__ Designs ready for production.',
        ],
      },
      {
        id: 'promotional-materials',
        name: '5. Signage & Promotional Displays',
        price: 350,
        items: [
          '__1. Office Outdoor Sign:__ Main storefront signage.',
          '__2. Roll-up Banner:__ For events and entrances.',
          '__3. Flyer/Leaflet:__ Single or double-sided design.',
          '__4. Wall Poster:__ Large format indoor/outdoor.',
          '__5. Greeting Cards:__ Seasonal designs (Eid, New Year).',
          '__6. Billboard Design:__ Visual design for large outdoor ads.',
        ],
      },
      {
        id: 'promotional-tools-package',
        name: '6. Promotional Tools & Giveaways',
        price: 400,
        items: [
            '__1. Pens__', '__2. Mugs__', '__3. Caps__', '__4. USB Drives__',
            '__5. Pin Badges__', '__6. Branded Bags__', '__7. Flags__',
            '__8. Medals__', '__9. Gift Wrapping__', '__10. Agenda/Planner__',
            '__11. Pocket Notebook__', '__12. Umbrellas__', '__13. Mouse Pads__',
            '__14. Tote Bags/Backpacks__', '__15. Power Banks__', '__16. Fridge Magnets__',
            '__17. Loyalty Cards__', '__18. Tissue Boxes__', '__19. Stickers__',
        ]
      },
    ],
  },
  {
    id: 'exhibition-branding',
    name: 'Exhibition Branding',
    description: 'Comprehensive service to design and prepare professional visual identity for your booth at exhibitions and conferences.',
    options: [
        {
            id: 'exhibition-package',
            name: 'Integrated Exhibition Branding Package',
            price: 3500,
            items: [
                '__1. Exhibition Visual Identity__',
                'Development of sub-logo specifically for exhibition participation',
                'Defining color palette and fonts tailored for exhibition environment',
                '__2. Booth Design__',
                'Space planning and interior design of the booth',
                'Exterior facade design and main Backdrop',
                '__3. Print Materials & Signage__',
                'Large identification signage (Roll-up / Pop-up) and hanging banners',
                'Wall stickers and printed flooring',
                '__4. Promotional Materials & Giveaways__',
                'Brochures, booklets, and business cards for the exhibition',
                'Promotional gifts (Pens, Notebooks) and bags',
                '__5. Digital & Interactive Displays__',
                'Screen content (Introductory videos, animated presentations)',
                '__6. Staff Uniform__',
                'Uniform design and badges for staff',
                '__7. Visitor Guide & Documentation__',
                'Mini exhibition guide design and post-event designs',
            ]
        }
    ]
  },
  {
    id: 'website-design',
    name: 'Website Design & Development Services',
    description: 'Complete package to establish professional digital presence for your company, from attractive design to secure development and ongoing support.',
    options: [
      {
        id: 'website-package',
        name: 'Complete Website Package',
        price: 1200,
        items: [
          '__1. Design__',
          'Attractive and user-friendly UI designs, consistent with brand identity, supporting all devices (Responsive).',
          '__2. Home Page__',
          'Main website interface displaying: Core brand message, key services or products, Call-to-Action, clear navigation bar.',
          '__3. About Us__',
          'Company intro page including: Story and Vision, Values and Achievements, Team.',
          '__4. Products / Services__',
          'Organized display of products or services with: High-quality images, brief descriptions, categorization or filter options.',
          '__5. Gallery__',
          'Section to display: Photos from previous exhibitions or projects, Videos or Reels, Attractive grid or carousel layout.',
          '__6. Contact Us__',
          'Page containing: Direct contact form, Interactive map (Google Maps), Contact info (Phone, Email, Address).',
          '__7. Support & Maintenance__',
          'Periodic content updates (as agreed), Site performance monitoring, Technical support for 3 months after delivery.',
          '__8. Security & Hosting Setup__',
          'SSL Certificate installation for secure site (https://), Basic security settings against hacking.',
        ]
      }
    ]
  },
  {
    id: 'social-media-design',
    name: 'Social Media Designs (Monthly Integrated Package)',
    description: 'Packages designed for professional growth of your digital presence. You can choose the components that fit your needs.',
    options: [
      {
        id: 'social-planning',
        name: 'Package 1: Visual Planning & Strategy',
        price: 75,
        items: [
          '__(Foundation ensuring content effectiveness)__',
          'Monthly content planning session (30 mins)',
          'Initial text suggestions + visual distribution for each post',
          'Initial moodboard or sketches for content ideas',
          'Renewal of post types: promo, edu, engagement, offers...',
          '⚠️ This package is required as a basis for any execution package.',
        ]
      },
      {
        id: 'social-basic-9',
        name: 'Package 2: Basic – 9 Initial Designs',
        price: 315,
        items: [
          '9 Professional designs (Static or Carousel)',
          'Delivery in ready-to-publish formats: High-quality PNG + JPG',
          'Compatible with Instagram + Facebook sizes',
          '__Total Posts: 9 Posts (All static)__',
          'Full commitment to brand identity (colors, fonts, patterns)',
        ]
      },
      {
        id: 'social-emerging-18',
        name: 'Package 3: Emerging – 18 Strategic Designs',
        price: 600,
        items: [
          '18 Professional designs (Static or Carousel)',
          'Delivery in ready-to-publish formats: High-quality PNG + JPG',
          'Compatible with Instagram + Facebook sizes',
          '__Total Posts: 18 Posts (All static)__',
          'Full commitment to brand identity (colors, fonts, patterns)',
        ]
      },
      {
        id: 'social-advanced-30',
        name: 'Package 4: Advanced – 30 Monthly Designs',
        price: 900,
        items: [
          '30 Professional designs (Static or Carousel)',
          'Up to 3 rounds of design revisions',
          'Simplified monthly content plan (Distribution based on goals)',
          '__Total Posts: 30 Posts (All static)__',
          'Full commitment to brand identity (colors, fonts, patterns)',
        ]
      },
      {
        id: 'social-posting',
        name: 'Package 5: Smart Posting & Scheduling',
        price: 75,
        items: [
          'Scheduling all posts at optimal times based on audience',
          'Automatic posting without intervention',
          'Simplified monthly performance report (Top 3 posts by reach/engagement)',
        ]
      }
    ]
  },
  {
    id: 'corporate-materials',
    name: 'Corporate & Informational Materials Design',
    description: 'Professional design services for important documents reflecting your company identity. Price shown is per page.',
    options: [
      {
        id: 'catalog-design',
        name: 'Product / Service Catalog',
        price: 20,
        hasQuantity: true,
        priceTiers: CORPORATE_PRICE_TIERS,
        items: [
          'Organized visual display of products or services with high-quality images, clear descriptions, and prices.',
          'Delivered as print-ready PDF with optional digital version.',
          'High-quality images',
          'Clear descriptions + technical specs',
          'Prices (if client desires)',
          'Company logo and unified color palette',
          'Format: Print (Print-ready PDF) + Digital version (Optional)'
        ]
      },
      {
        id: 'company-profile',
        name: 'Company Profile',
        price: 20,
        hasQuantity: true,
        priceTiers: CORPORATE_PRICE_TIERS,
        items: [
          'Professional document reflecting company identity and market value, including company overview, achievements, team, and contact info.',
          'Company Overview (Vision, Mission, Values)',
          'Key Projects or Clients',
          'Timeline of Achievements',
          'Leadership Team',
          'Delivered in two formats: Digital + Print file (PDF CMYK – 300 DPI)',
          'Contact Information',
        ]
      },
      {
        id: 'presentation-design',
        name: 'Presentation / Pitch Deck',
        price: 20,
        hasQuantity: true,
        priceTiers: CORPORATE_PRICE_TIERS,
        items: [
          'Professional slides customized for Google Slides or PowerPoint, ideal for client pitches, investors, or internal meetings.',
          'Unified design with brand identity',
          'Infographics',
          'Icons and supporting images',
          'Attractive and readable backgrounds',
          'Customized for client and investor presentations',
        ]
      },
      {
        id: 'annual-report',
        name: 'Annual Report',
        price: 20,
        hasQuantity: true,
        priceTiers: CORPORATE_PRICE_TIERS,
        items: [
          'Official document summarizing annual company performance, designed to reflect credibility and success while maintaining attractive visual identity, delivered as print-ready file.',
          'Goals for the coming year',
          'Message from Management',
          'Financial Results (Tables, Charts)',
          'Key Achievements',
          'Key Activities and Events',
          'Delivered as PDF Interactive + Print',
        ]
      },
      {
        id: 'infographic-static',
        name: 'Static Infographic Design',
        price: 75,
        hasQuantity: true,
        quantityLabel: 'Number of Designs',
        priceSuffix: 'per design',
        priceTiers: [
            { minQuantity: 1, price: 75 },
            { minQuantity: 10, price: 37.5 }, // 50% discount
            { minQuantity: 15, price: 22.5 }, // 70% discount
        ],
        items: [
          '__Deliverables:__',
          'High-quality JPEG/PNG file (Print and Display)',
          'PDF file for printing and sharing',
          'Editable PSD/AI file (Optional)',
          '__Multiple Sizes:__',
          '2480x3508 pixels (A4 Portrait)',
          '3508x2480 pixels (A4 Landscape)',
          '1080x1920 pixels (For Social Media)',
          'Custom size upon request',
        ]
      }
    ]
  },
   {
    id: 'video-motion-graphics',
    name: 'Video & Motion Graphics Design',
    description: 'Specialized services for short video production and animation to enhance your digital presence.',
    options: [
      {
        id: 'reels-package',
        name: 'Reels Design Package',
        price: 150,
        hasQuantity: true,
        quantityLabel: 'Number of Videos',
        priceSuffix: 'per video',
        priceTiers: [
            { minQuantity: 1, price: 150 },
            { minQuantity: 10, price: 75 }, // 50% discount
            { minQuantity: 15, price: 45 }, // 70% discount
        ],
        items: [
            '__Custom element design for Reels/Shorts/TikTok — ready for editing or publishing.__',
            '__Deliverables:__ Final MP4 video (1080x1920) - Ready to publish.',
            '__Motion Graphics:__ Engaging scenes compatible with brand identity.',
            'Animated Typography with sleek effects.',
            'Backgrounds, shapes, patterns, and icons.',
            '__Revisions:__ Up to 2 rounds.',
        ]
      },
      {
        id: '2d-animation-package',
        name: 'Integrated 2D Animation Package (Concept to Delivery)',
        price: 500,
        hasQuantity: true,
        quantityLabel: 'Minutes',
        priceSuffix: 'per minute',
        priceTiers: [
            { minQuantity: 1, price: 500 },
            { minQuantity: 10, price: 250 }, // 50% discount
            { minQuantity: 15, price: 150 }, // 70% discount
        ],
        items: [
            '__Phase 1: Development:__ Brainstorming, Scriptwriting, Character Dev.',
            '__Phase 2: Visual Design:__ Storyboard, Art Style, Scene Illustration.',
            '__Phase 3: Animation:__ Motion, Rigging, VFX.',
            '__Phase 4: Audio:__ Voiceover, Music, SFX.',
            '__Phase 5: Output:__ HD MP4 + Social Version + Source Files (Optional).',
        ]
      },
      {
        id: 'corporate-intro-video',
        name: 'Corporate Intro / Explainer Video',
        price: 600,
        hasQuantity: true,
        quantityLabel: 'Minutes',
        priceSuffix: 'per minute',
        priceTiers: [
            { minQuantity: 1, price: 600 },
            { minQuantity: 10, price: 300 }, // 50% discount
            { minQuantity: 15, price: 180 }, // 70% discount
        ],
        items: [
            '__Goal:__ Professional short video (60-90s) explaining company identity/services.',
            '__Outputs:__ Final MP4 (Square + Landscape).',
            'Music-free version for multi-language VO.',
            'English/Arabic template.',
            '__Scope:__ Discovery, Script, Storyboard, Custom Visuals, Motion Graphics, VO, Music.',
        ]
      }
    ]
  },
  {
    id: 'packaging-design',
    name: 'Packaging & Box Design',
    description: 'Specialized services for designing product packaging and boxes to ensure appeal and protection.',
    options: [
      {
        id: 'bag-design',
        name: '7.1 Bags Design',
        price: 350,
        hasQuantity: true,
        quantityLabel: 'Number of Designs',
        priceSuffix: 'per design',
        priceTiers: PACKAGING_BAG_PRICE_TIERS,
        items: [
          '__Scope:__ Flexible bag design (plastic, paper, etc.) based on product type.',
          '__Content:__ Harmonious front and back design.',
          '__Print Setup:__ Files prepared in CMYK / Pantone for color accuracy.',
          '__Language Support:__ Design supports both Arabic and English.',
          '__Deliverables:__ Print-ready AI, EPS, PDF files + PNG/JPG for review.',
        ],
      },
      {
        id: 'box-design',
        name: '7.2 Boxes Design',
        price: 350,
        hasQuantity: true,
        quantityLabel: 'Number of Designs',
        priceSuffix: 'per design',
        priceTiers: PACKAGING_BOX_PRICE_TIERS,
        items: [
          '__Scope:__ Carton or rigid box design.',
          '__Structure:__ Full design for all box faces (6 or more).',
          '__Dieline Integration:__ Visual elements integrated with cut and fold lines.',
          '__Artistic Touch:__ Balance between luxury and simplicity per product tier.',
          '__Deliverables:__ AI file with dieline + Print PDF + 3D mockups.',
        ],
      },
      {
        id: 'sticker-design-new',
        name: '7.3 New Sticker Design',
        price: 150,
        hasQuantity: true,
        quantityLabel: 'Number of Designs',
        priceSuffix: 'per design',
        priceTiers: PACKAGING_STICKER_NEW_PRICE_TIERS,
        items: ['Professional product sticker design compatible with brand identity'],
      },
      {
        id: 'sticker-design-edit',
        name: '7.4 Edit Existing Sticker Design',
        price: 50,
        hasQuantity: true,
        quantityLabel: 'Number of Designs',
        priceSuffix: 'per design',
        items: ['Updating or enhancing current sticker data and graphics'],
      },
    ]
  }
];

export const SERVICE_CATEGORIES_AR: ServiceCategory[] = [
  {
    id: 'graphic-design-services',
    name: 'خدمات الهوية البصرية والتصميم الجرافيكي',
    description: 'نقدم حلولاً إبداعية ومبتكرة في عالم التصميم لتعزيز علامتك التجارية. تصفح خدماتنا واختر ما يناسب احتياجاتك للحصول على عرض سعر فوري.<br/><br/><strong>🔄 ملخّص سير العمل من منظور العميل:</strong><br/>1- أريد استراتيجية واضحة ← أطلب "الاستراتيجية البصرية".<br/>2- أريد شعارًا ← أطلب "الهوية الأساسية".<br/>3- أريد حضورًا رقميًّا ← أطلب "التواجد الرقمي".<br/>4- أريد احترافية داخلية ← أطلب "المواد المكتبية".<br/>5- أشارك في معارض أو فعاليات ← أطلب "اللافتات".<br/>6- أوزّع هدايا أو أعزز ولاء العملاء ← أطلب "الأدوات الترويجية".',
    options: [
      {
        id: 'visual-strategy',
        name: '1. الاستراتيجية البصرية — (الأساس الذي يبني عليه كل شيء)',
        price: 300,
        description: '“لا تبدأ بالتصميم قبل أن تعرف من أنت، لماذا أنت هنا، وكيف تختلف عن الآخرين.” نحن لا نرسم فقط — نبني هوية على أساس رؤية واستراتيجية واضحة.',
        items: [
            '__1. About [اسم العلامة]:__<br/>من نحن؟ ما هو مجالنا؟ ما هي قصتنا المؤسسية؟',
            '__2. Values (القيم):__<br/>ما هي المبادئ التي نؤمن بها؟ (مثال: الجودة، الثقة، الابتكار، الاستدامة)',
            '__3. Golden Circle (الدائرة الذهبية):__<br/>Why → How → What — لماذا نوجد؟ كيف نعمل؟ ماذا نقدم؟',
            '__4. Mission (الرسالة):__<br/>ما الغرض من وجودنا؟ ما الذي نسعى لتحقيقه يوميًا؟',
            '__5. Vision (الرؤية):__<br/>إلى أين نتجه؟ ما الذي نريد أن نكون عليه في المستقبل؟',
            '__6. Positioning Statement (بيان الموقع):__<br/>كيف نتميز عن المنافسين؟ ولمن نخدم؟ وما الذي نقدمه لهم؟',
            '__7. Naming (تسميّة العلامة):__<br/>كيف تم اختيار الاسم؟ ما معناه؟ هل له دلالات ثقافية أو لغوية؟ هل هو سهل النطق والحفظ؟',
            '__8. Brand Story (قصة العلامة):__<br/>قصة تأسيس العلامة، التحديات، الإنجازات، الرسالة الإنسانية. تُستخدم في التواصل مع الجمهور.',
            '__9. Tagline (الشعار الترويجي):__<br/>جملة قصيرة تعبر عن جوهر العلامة. (مثال: "نصنع الثقة"، "معك في كل خطوة")',
            '__10. Brand Attributes (صفات العلامة):__<br/>صفات شخصية للعلامة — مثل: موثوقة، عصرية، محلية، فاخرة، ودودة، مبتكرة...'
        ]
      },
      {
        id: 'brand-identity',
        name: '2. الهوية الأساسية (العمود الفقري للعلامة التجارية)',
        price: 500,
        items: [
          '__1. الشعار الرئيسي:__<br/>- النسخة الأساسية المعتمدة للعلامة التجارية',
          '__2. إصدارات الشعار:__<br/>- نسخة بالألوان الكاملة<br/>- نسخة بالأبيض والأسود<br/>- نسخة عكسية (سلبية / negative) للاستخدام على خلفيات داكنة',
          '__3. أيقونة رقمية:__<br/>- تصميم مُبسّط للشعار للاستخدام في التطبيقات والمواقع الإلكترونية',
          '__4. لوحة الألوان الرسمية:__<br/>- ألوان أساسية<br/>- ألوان ثانوية داعمة',
          '__5. قيم الألوان المعيارية:__<br/>- CMYK للطباعة<br/>- RGB للشاشات والرقمي',
          '__6. الخطوط المعتمدة:__<br/>- خط عربي رسمي متناسق مع هوية العلامة،<br/>- خط لاتيني (إنجليزي) متناغم مع خط العربي.',
          '__7. دليل ألوان بصري (PDF):__<br/>- مستند احترافي يوضح استخدام الألوان والخطوط في سياقات مختلفة، معدّ للتحميل والمشاركة مع فرق التصميم والتسويق.',
          '__8. نمط مرئي متكرر (Pattern):__<br/>• تصميم فني مُنسَّق يعكس هوية العلامة، قابل للتكرار دون انقطاع.',
          '__9. نمط خلفيات:__<br/>• نسخة من النمط مُعدة خصيصًا للاستخدام كخلفيات في العروض التقديمية، المواقع، أو المواد الرقمية.',
          '__10. نمط تغليف:__<br/>• نسخة مُعدَّلة من النمط تتناسب مع متطلبات الطباعة والتغليف (مثل العلب، الأكياس، أو المواد الترويجية).',
          '__11. مجموعة أيقونات مخصصة:__<br/>• تتضمن أيقونات فريدة، مصممة بأسلوب متناسق مع الهوية البصرية، تعكس طبيعة نشاط الشركة وخدماتها أو منتجاتها، قابلة للتعديل والاستخدام عبر المنصات الرقمية والطباعية.',
        ],
      },
      {
        id: 'digital-presence',
        name: '3. التواجد الرقمي والسوشيال ميديا (لبناء صورة احترافية على الإنترنت)',
        price: 350,
        items: [
          '__1. أغلفة منصات التواصل الاجتماعي:__<br/>o تصميم موحّد ومتناسق لأغلفة فيسبوك، تويتر (إكس)، وLinkedIn<br/>o متوافق مع الهوية البصرية الثنائية (عربي/إنجليزي)<br/>o مُحسّن للأحجام والنسب الخاصة بكل منصة',
          '__2. قالب منشورات سوشيال ميديا قابل للتخصيص:__<br/>o تصميم مرن يدعم مختلف أنواع المحتوى<br/>o متوافق مع معايير الرؤية على الجوال والشاشة',
          '__3. توقيع بريد إلكتروني موحد للموظفين:__<br/>o يشمل الشعار، الاسم، المسمى الوظيفي، رقم الهاتف، روابط التواصل، والبيانات الأساسية<br/>o متوافق مع عملاء البريد (Outlook، Gmail، إلخ)',
          '__4. قالب عرض تقديمي احترافي (PowerPoint):__<br/>o تصميم مخصص يعكس الهوية البصرية الكاملة (الألوان، الخطوط، العناصر الرسومية)<br/>o قابل للتعديل بسهولة من قبل أي موظف',
          '__5. شاشة توقف لأجهزة الموظفين:__<br/>o تصميم أنيق يعرض شعار الشركة ورسالة هوية موجزة<br/>o متوافق مع أحجام الشاشات الشائعة (16:9، 4:3)<br/>o يعزز الشعور بالانتماء ويوحّد المظهر البصري داخل بيئة العمل الرقمية',
        ],
      },
      {
        id: 'stationery',
        name: '4. المواد المكتبية والمراسلات (للاحترافية اليومية داخل المؤسسة)',
        price: 350,
        items: [
          '__1. بطاقات أعمال:__<br/>• 5 تصاميم مخصصة لأدوار مختلفة (مثل: المدير، فريق المبيعات، الدعم الفني، إلخ)، متوافقة مع الهوية البصرية الثنائية (عربي/إنجليزي).',
          '__2. ورق المراسلات:__<br/>• نسخة بحجم A5<br/>• نسخة بحجم A4<br/>• يتضمن رأس صفحة معتمد للاستخدام الرسمي.',
          '__3. المغلفات:__<br/>• مغلف بحجم A4<br/>• مغلف بحجم A3<br/>• مصممان لتتماشى مع ورق المراسلات والهوية العامة.',
          '__4. فولدر العرض:__<br/>• فولدر بحجم A4<br/>• فولدر بحجم A3<br/>• مصمم لتقديم العروض أو الملفات بطريقة احترافية.',
          '__5. مذكرة صغيرة:__<br/>• تصميم عملي للاستخدام اليومي داخل المكتب، يحمل شعار الشركة وهويتها.',
          '__6. بطاقة باجة:__<br/>• للموظفين (تشمل الاسم، المنصب، الصورة، وتفاصيل التواصل)، بطاقة باجة للزوار (بسهولة التعرف والتسجيل المؤقت).',
          '__7. المستندات المالية المخصصة:__<br/>• فاتورة مخصصة (متوافقة مع الأنظمة المحلية وتدعم اللغتين)<br/>• سند قبض<br/>• سند صرف<br/>• جميعها تحمل العناصر البصرية والبيانات الرسمية للشركة.',
          '__8. أختام رسمية:__<br/>• تصميمات جاهزة للطباعة أو الحفر، تشمل الشعار، الاسم التجاري.<br/>• جميع العناصر أعلاه تُسلَّم بتنسيقات قابلة للتعديل (مثل AI، PSD) وتنسيقات جاهزة للاستخدام (PDF، JPG، PNG).',
        ],
      },
      {
        id: 'promotional-materials',
        name: '5. اللافتات والعروض الترويجية (للفعاليات، المعارض، والمكتب)',
        price: 350,
        items: [
          '__1. اللوحة الخارجية للمكتب:__<br/>o تصميم احترافي يعرض اسم الشركة، الشعار، ونشاطها الرئيسي<br/>o متوافق مع متطلبات الرؤية من مسافات بعيدة<br/>o يراعي التناسق البصري مع الهوية الثنائية',
          '__2. رول أب (Roll-up Banner):__<br/>o تصميم جذاب ومناسب للاستخدام في المعارض, المؤتمرات، أو عند مدخل المكتب<br/>o يحتوي على رسالة رئيسية واضحة، شعار، ومعلومات التواصل<br/>o جاهز للطباعة بأبعاد قياسية (عادةً 85×200 سم)',
          '__3. فلاير إعلاني قابل للطباعة:__<br/>o تصميم مزدوج الوجه (أمامي/خلفي) أو وحيد الوجه حسب الحاجة<br/>o مصمم لعرض عرض خاص، خدمة جديدة، أو معلومات ترويجية موجزة<br/>o متوافق مع معايير الطباعة (CMYK، دقة 300 DPI، هوامش آمنة)',
          '__4. بوستر جداري كبير:__<br/>o تصميم بصري قوي للاستخدام في الجدران الداخلية أو الخارجية<br/>o يركّز على رسالة رئيسية مع دعم بصري جذاب<br/>o جاهز للطباعة بأحجام كبيرة (مثل A1 أو حسب الطلب)',
          '__5. بطاقات تهنئة موسمية:__<br/>o تصميمات مخصصة لمناسبات رئيسية: رمضان، عيد الفطر، عيد الأضحى، رأس السنة الميلادية<br/>o تُطبَع أو تُرسَل رقميًا<br/>o تجمع بين الذوق المحلي والهوية البصرية للشركة',
          '__6. لوحة إعلانية خارجية (Billboard – تصميم فني فقط):__<br/>o تصميم بصري مبسّط وقوي يُركّز على الرسالة الأساسية والشعار<br/>o يراعي مبدأ "القراءة السريعة" من مسافات بعيدة<br/>o يُسلَّم جاهزًا للطباعة من قبل الجهة المنفّذة (بدون تنفيذ طباعي)',
        ],
      },
      {
        id: 'promotional-tools-package',
        name: '6. الأدوات الترويجية والهدايا التفاعلية (لبناء الولاء وتعزيز الانتشار)',
        price: 400,
        items: [
            '__1. أقلام مكتبية:__<br/>تصميم أنيق يحمل شعار الشركة، مناسب للتوزيع في الفعاليات أو كهديا للعملاء.',
            '__2. أكواب (سيراميك / بلاستيك):__<br/>مخصصة للاستخدام اليومي، تحمل الشعار والهوية البصرية بشكل جذاب ودائم.',
            '__3. طاقية (قبعة):__<br/>تصميم عملي ومرن يعزز ظهور العلامة في المناسبات الخارجية أو كجزء من الزي الترويجي.',
            '__4. فلاشة USB:__<br/>هدية ذكية تحمل شعار الشركة، مفيدة للعملاء والشركاء، مع إمكانية تخصيص العبوة.',
            '__5. دبوس شعار (Pin Badge):__<br/>قطعة صغيرة لكنها فعّالة لتمثيل الهوية في الاجتماعات، المؤتمرات، أو كإكسسوار للموظفين.',
            '__6. أكياس تحمل الشعار:__<br/>أكياس ورقية (صديقة للبيئة) وأكياس بلاستيكية (متينة وقابلة لإعادة الاستخدام)، مصممة للاستخدام في التغليف أو التوزيع الترويجي.',
            '__7. علم الشركة:__<br/>تصميم رسمي يُستخدم في المكتب، الفعاليات، أو السيارات، يعكس الهوية الوطنية والمؤسسية.',
            '__8. ميدالية شعار:__<br/>قطعة تذكارية تُستخدم في المناسبات الخاصة أو كجائزة في الفعاليات الداخلية.',
            '__9. مغلف هدايا مخصص:__<br/>تصميم أنيق يُستخدم لتغليف الهدايا أو المستندات المهمة، يعزز الانطباع الراقي بالعلامة.',
            '__10. أجندة مكتبية:__<br/>دليل سنوي يجمع بين الوظيفية والترويج، يحتوي على شعار الشركة وتقويم مخصص.',
            '__11. مفكرة جيب:__<br/>صغيرة الحجم، سهلة الحمل، مثالية للتوزيع الجماعي مع مساحة للشعار والبيانات الأساسية.',
            '__12. مظلة تحمل الشعار:__<br/>هدية عملية تُستخدم يوميًا، وتعزز رؤية العلامة في الأماكن العامة.',
            '__13. وسادة مكتب (Desk Mat / Mouse Pad):__<br/>تحمل الشعار أو نمطًا بصريًّا من الهوية، مفيدة جدًّا للموظفين والعملاء (خاصة المبدعين أو العاملين على الحاسوب)، تُستخدم يوميًّا لضمان عرض متكرر للعلامة.',
            '__14. حقيبة ظهر أو حقيبة يد ترويجية (Tote Bag / Backpack):__<br/>شائعة جدًّا في الفعاليات والمعارض. حقيبة قماش قوية (Tote) تحمل رسالة مستدامة + شعار، أو حقيبة ظهر صغيرة يمكن توزيعها كهدية قيّمة للعملاء المميزين.',
            '__15. شاحن لاسلكي أو باور بانك مخصص:__<br/>هدايا عملية وعصرية، خاصة في عالم رقمي. تُخصّص بطباعة الشعار أو تصميم معدني أنيق لتترك انطباعًا "ذكيًّا" عن علامتك.',
            '__16. مغناطيس ثلاجة (Fridge Magnet):__<br/>صغير، رخيص الإنتاج، لكنه فعّال. يُبقي شعارك في بيوت العملاء (خاصة إذا كنت تقدم خدمات استهلاكية أو يومية).',
            '__17. بطاقة خصم أو عرض حصري (Loyalty Card / VIP Pass):__<br/>مصنوعة من كرتون فاخر أو بلاستيك, تُستخدم لتشجيع التفاعل المتكرر مع العميل (QR Code أو ملموسة).',
            '__18. علبة مناديل صغيرة (مع شعار):__<br/>شائعة في المطاعم، العيادات، والمعارض. عملية وشخصية تُستخدم في لحظات يومية.',
            '__19. ملصقات (Stickers) عالية الجودة:__<br/>شائعة جدًّا بين الجمهور الشاب والمجتمعات الإبداعية. تُلصق على الأجهزة، الدفاتر، السيارات. تكلفة منخفضة، انتشار عالٍ.',
        ]
      },
    ],
  },
  {
    id: 'exhibition-branding',
    name: 'تصميم هوية المعارض',
    description: 'خدمة شاملة لتصميم وإعداد الهوية البصرية الاحترافية لجناحك في المعارض والمؤتمرات.',
    options: [
        {
            id: 'exhibition-package',
            name: 'باقة هوية المعارض المتكاملة',
            price: 3500,
            items: [
                '__1. الهوية البصرية للمعرض__',
                'تطوير شعار فرعي خاص بالمشاركة في المعرض',
                'تحديد لوحة ألوان وخطوط تتناسب مع بيئة المعرض',
                '__2. تصميم الجناح (Booth)__',
                'تخطيط المساحة والتصميم الداخلي للجناح',
                'تصميم الواجهة الخارجية والخلفية الرئيسية (Backdrop)',
                '__3. المطبوعات واللوحات__',
                'لوحات تعريفية كبيرة (Roll-up / Pop-up) ولافتات معلقة',
                'ملصقات جدارية وأرضيات مطبوعة',
                '__4. المواد الترويجية والهدايا__',
                'بروشورات، كتيبات، وبطاقات عمل خاصة بالمعرض',
                'هدايا ترويجية (أقلام، مفكرات) وأكياس',
                '__5. العروض الرقمية والتفاعلية__',
                'محتوى الشاشات (فيديوهات تعريفية، عروض متحركة)',
                '__6. زي الموظفين__',
                'تصميم الزي الموحد (Uniform) والبطاقات التعريفية (Badges)',
                '__7. دليل الزوار والتوثيق__',
                'تصميم دليل مصغر للمعرض وتصاميم ما بعد الحدث',
            ]
        }
    ]
  },
  {
    id: 'website-design',
    name: 'خدمات تصميم وتطوير المواقع الإلكترونية',
    description: 'باقة متكاملة لتأسيس تواجد رقمي احترافي لشركتك، من التصميم الجذاب إلى التطوير الآمن والدعم المستمر.',
    options: [
      {
        id: 'website-package',
        name: 'باقة الموقع الإلكتروني المتكاملة',
        price: 1200,
        items: [
          '__1. التصميم (Design)__',
          'تصاميم واجهة مستخدم (UI) جذابة وسهلة الاستخدام، متوافقة مع الهوية البصرية، وتدعم جميع الأجهزة (Responsive).',
          '__2. الصفحة الرئيسية (Home Page)__',
          'واجهة الموقع الرئيسية تعرض: رسالة العلامة الجوهرية، أبرز الخدمات أو المنتجات، دعوة لاتخاذ إجراء (Call-to-Action)، وشريط تنقل واضح.',
          '__3. من نحن (About Us)__',
          'صفحة تعريفية بالشركة تشمل: القصة والرؤية، القيم والإنجازات، وفريق العمل.',
          '__4. المنتجات / الخدمات (Products / Services)__',
          'عرض منظم للمنتجات أو الخدمات مع: صور عالية الجودة، وصف مختصر، وخيارات تصنيف أو تصفية (Filter).',
          '__5. المعرض (Gallery)__',
          'قسم لعرض: صور من مشاريع سابقة أو معارض، فيديوهات أو ريلز، بتنسيق شبكي جذاب (Grid) أو عرض متتابع (Carousel).',
          '__6. اتصل بنا (Contact Us)__',
          'صفحة تحتوي على: نموذج تواصل مباشر، خريطة تفاعلية (Google Maps)، وبيانات الاتصال (هاتف، بريد، عنوان).',
          '__7. الدعم والصيانة (Support & Maintenance)__',
          'تحديثات دورية للمحتوى (حسب الاتفاق)، مراقبة أداء الموقع، ودعم فني لمدة 3 أشهر بعد التسليم.',
          '__8. إعداد الأمان والاستضافة__',
          'تثبيت شهادة SSL لموقع آمن (https://)، وإعدادات حماية أساسية ضد الاختراق.',
        ]
      }
    ]
  },
  {
    id: 'social-media-design',
    name: 'تصاميم وسائل التواصل الاجتماعي (باقات شهرية)',
    description: 'باقات مصممة للنمو الاحترافي بتواجدك الرقمي. يمكنك اختيار المكونات التي تناسب احتياجاتك.',
    options: [
      {
        id: 'social-planning',
        name: 'الباقة 1: التخطيط البصري والاستراتيجي',
        price: 75,
        items: [
          '__(الأساس لضمان فاعلية المحتوى)__',
          'جلسة تخطيط محتوى شهرية (30 دقيقة)',
          'اقتراحات نصية أولية + توزيع بصري لكل منشور',
          'لوحة إلهام (Moodboard) أو اسكتشات أولية لأفكار المحتوى',
          'تجديد أنواع المنشورات: ترويجي، تعليمي، تفاعلي، عروض...',
          '⚠️ هذه الباقة مطلوبة كأساس لأي باقة تنفيذ.',
        ]
      },
      {
        id: 'social-basic-9',
        name: 'الباقة 2: الأساسية – 9 تصاميم',
        price: 315,
        items: [
          '9 تصاميم احترافية (ثابتة أو كاروسيل)',
          'التسليم بصيغ جاهزة للنشر: PNG + JPG عالية الجودة',
          'متوافقة مع مقاسات إنستغرام + فيسبوك',
          '__إجمالي المنشورات: 9 منشورات (جميعها ثابتة)__',
          'التزام تام بالهوية البصرية (الألوان، الخطوط، الأنماط)',
        ]
      },
      {
        id: 'social-emerging-18',
        name: 'الباقة 3: الناشئة – 18 تصميم استراتيجي',
        price: 600,
        items: [
          '18 تصميم احترافي (ثابتة أو كاروسيل)',
          'التسليم بصيغ جاهزة للنشر: PNG + JPG عالية الجودة',
          'متوافقة مع مقاسات إنستغرام + فيسبوك',
          '__إجمالي المنشورات: 18 منشور (جميعها ثابتة)__',
          'التزام تام بالهوية البصرية (الألوان، الخطوط، الأنماط)',
        ]
      },
      {
        id: 'social-advanced-30',
        name: 'الباقة 4: المتقدمة – 30 تصميم شهري',
        price: 900,
        items: [
          '30 تصميم احترافي (ثابتة أو كاروسيل)',
          'ما يصل إلى 3 جولات من التعديلات على التصميم',
          'خطة محتوى شهرية مبسطة (توزيع بناءً على الأهداف)',
          '__إجمالي المنشورات: 30 منشور (جميعها ثابتة)__',
          'التزام تام بالهوية البصرية (الألوان، الخطوط، الأنماط)',
        ]
      },
      {
        id: 'social-posting',
        name: 'الباقة 5: النشر والجدولة الذكية',
        price: 75,
        items: [
          'جدولة جميع المنشورات في الأوقات المثالية حسب الجمهور',
          'نشر تلقائي دون تدخل منك',
          'تقرير أداء شهري مبسط (أفضل 3 منشورات وصولاً/تفاعلاً)',
        ]
      }
    ]
  },
  {
    id: 'corporate-materials',
    name: 'تصميم المواد المؤسسية والمعلوماتية',
    description: 'خدمات تصميم احترافية للمستندات الهامة التي تعكس هوية شركتك. السعر الموضح للصفحة الواحدة.',
    options: [
      {
        id: 'catalog-design',
        name: 'كتالوج المنتجات / الخدمات',
        price: 20,
        hasQuantity: true,
        priceTiers: CORPORATE_PRICE_TIERS,
        items: [
          'عرض بصري منظم للمنتجات أو الخدمات مع صور عالية الجودة، وصف واضح، وأسعار.',
          'يُسلم كملف PDF جاهز للطباعة مع نسخة رقمية اختيارية.',
          'صور عالية الجودة',
          'وصف واضح + مواصفات تقنية',
          'الأسعار (إذا رغب العميل)',
          'شعار الشركة ولوحة ألوان موحدة',
          'التنسيق: طباعة (PDF جاهز للطباعة) + نسخة رقمية (اختياري)'
        ]
      },
      {
        id: 'company-profile',
        name: 'ملف الشركة التعريفي (Company Profile)',
        price: 20,
        hasQuantity: true,
        priceTiers: CORPORATE_PRICE_TIERS,
        items: [
          'وثيقة احترافية تعكس هوية الشركة وقيمتها السوقية، تشمل نبذة عن الشركة، الإنجازات، الفريق، ومعلومات الاتصال.',
          'نظرة عامة (الرؤية، الرسالة، القيم)',
          'أبرز المشاريع أو العملاء',
          'الجدول الزمني للإنجازات',
          'الفريق القيادي',
          'يُسلم بصيغتين: رقمية + ملف طباعة (PDF CMYK – 300 DPI)',
          'معلومات الاتصال',
        ]
      },
      {
        id: 'presentation-design',
        name: 'عرض تقديمي (Presentation / Pitch Deck)',
        price: 20,
        hasQuantity: true,
        priceTiers: CORPORATE_PRICE_TIERS,
        items: [
          'شرائح احترافية مخصصة لـ Google Slides أو PowerPoint، مثالية لعروض العملاء، المستثمرين، أو الاجتماعات الداخلية.',
          'تصميم موحد مع الهوية البصرية',
          'إنفوجرافيك (رسوم بيانية)',
          'أيقونات وصور داعمة',
          'خلفيات جذابة ومقروءة',
          'مخصص لعروض العملاء والمستثمرين',
        ]
      },
      {
        id: 'annual-report',
        name: 'التقرير السنوي (Annual Report)',
        price: 20,
        hasQuantity: true,
        priceTiers: CORPORATE_PRICE_TIERS,
        items: [
          'وثيقة رسمية تلخص أداء الشركة السنوي، مصممة لتعكس المصداقية والنجاح مع الحفاظ على هوية بصرية جذابة، تُسلم كملف جاهز للطباعة.',
          'أهداف العام القادم',
          'كلمة الإدارة',
          'النتائج المالية (جداول، رسوم بيانية)',
          'أهم الإنجازات',
          'الأنشطة والفعاليات الرئيسية',
          'يُسلم كـ PDF تفاعلي + طباعة',
        ]
      },
      {
        id: 'infographic-static',
        name: 'تصميم إنفوجرافيك ثابت',
        price: 75,
        hasQuantity: true,
        quantityLabel: 'عدد التصاميم',
        priceSuffix: 'لكل تصميم',
        priceTiers: [
            { minQuantity: 1, price: 75 },
            { minQuantity: 10, price: 37.5 }, // 50% discount
            { minQuantity: 15, price: 22.5 }, // 70% discount
        ],
        items: [
          '__المخرجات:__',
          'ملف JPEG/PNG عالي الجودة (للطباعة والعرض)',
          'ملف PDF للطباعة والمشاركة',
          'ملف PSD/AI قابل للتعديل (اختياري)',
          '__مقاسات متعددة:__',
          '2480x3508 بكسل (A4 رأسي)',
          '3508x2480 بكسل (A4 أفقي)',
          '1080x1920 بكسل (لوسائل التواصل الاجتماعي)',
          'مقاس مخصص عند الطلب',
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
        price: 150,
        hasQuantity: true,
        quantityLabel: 'عدد الفيديوهات',
        priceSuffix: 'لكل فيديو',
        priceTiers: [
            { minQuantity: 1, price: 150 },
            { minQuantity: 10, price: 75 }, // 50% discount
            { minQuantity: 15, price: 45 }, // 70% discount
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
      },
      {
        id: '2d-animation-package',
        name: 'باقة إنتاج أنيميشن 2D متكاملة (من الفكرة إلى التسليم)',
        price: 500,
        hasQuantity: true,
        quantityLabel: 'عدد الدقائق',
        priceSuffix: 'لكل دقيقة',
        priceTiers: [
            { minQuantity: 1, price: 500 },
            { minQuantity: 10, price: 250 }, // 50% discount
            { minQuantity: 15, price: 150 }, // 70% discount
        ],
        items: [
            '__الذهبية للأنيميشن 2D الكامل__',
            '__📝 المرحلة 1: التطوير والإعداد__',
            'جلسة العصف الذهبي - جلسة افتراضية/حضورية لفهم الأهداف والجمهور',
            'صياغة الفكرة وترتيب الأفكار وهيكلة المحتوى',
            'كتابة السيناريو - سيناريو احترافي بتوقيت دقيق',
            'تطوير الشخصيات (إذا لزم الأمر) - تصميم 1-3 شخصيات رئيسية',
            '__🎨 المرحلة 2: التصميم المرئي__',
            'القصة المصورة (Storyboard) - لوحات مصورة مفصلة لكل مشهد',
            'أسلوب فني موحد - تحديد نمط الرسم والألوان (Flat, Cartoon, Minimal, etc.)',
            'رسم وتلوين المشاهد الرئيسية - تطبيق لوحة الألوان المعتمدة',
            '__✨ المرحلة 3: التحريك والإنتاج__',
            'تحريك المشهد - إضافة الحركة والحياة للرسومات',
            'تحريك وهيكلة الشخصيات (Rigging) - إذا وجدت شخصيات',
            'المؤثرات البصرية والتركيب (Compositing)',
            '__🔊 المرحلة 4: الصوت__',
            'اختيار وتسجيل التعليق الصوتي في استوديو احترافي',
            'اختيار موسيقى أصلية أو حصرية',
            'المؤثرات الصوتية (SFX) والمكساج احترافي',
            '__🎬 المرحلة 5: المخرجات النهائية__',
            'المراجعة الأولى، التعديلات (حتى 3 جولات)، والفحص النهائي',
            '__📦 حزمة التسليم الكاملة:__',
            'الفيديو الرئيسي MP4 HD (1920x1080) + نسخة لوسائل التواصل الاجتماعي',
            'نسخة خالية من الموسيقى/النصوص للتعديلات المستقبلية',
            'ملفات المشروع (After Effects, PSD) - (اختياري بتكلفة إضافية)',
            'المرفقات: القصة المصورة، السيناريو، والصور الثابتة',
        ]
      },
      {
        id: 'corporate-intro-video',
        name: 'باقة 2: فيديو تعريفي للشركات / فيديو توضيحي (Corporate Intro / Explainer)',
        price: 600,
        hasQuantity: true,
        quantityLabel: 'عدد الدقائق',
        priceSuffix: 'لكل دقيقة',
        priceTiers: [
            { minQuantity: 1, price: 600 },
            { minQuantity: 10, price: 300 }, // 50% discount
            { minQuantity: 15, price: 180 }, // 70% discount
        ],
        items: [
            '__الهدف:__ فيديو احترافي قصير (60-90 ثانية) يشرح هوية الشركة، رسالتها، خدماتها، أو منتجها الرئيسي بطريقة جذابة وسهلة الفهم.',
            '__المخرجات:__',
            'فيديو نهائي عالي الجودة بصيغة MP4 (مربع 1080x1080 لمنصات التواصل + أفقي 1920x1080 للموقع والعروض التقديمية).',
            'نسخة خالية من الموسيقى للاستخدام مع تعليق صوتي بلغات مختلفة.',
            'قالب باللغة الإنجليزية + العربية (إذا كانت الهوية ثنائية اللغة) - قابل للتعديل للنصوص الرئيسية فقط.',
            '__نطاق الخدمة التفصيلي:__',
            'مرحلة الاكتشاف: جمع المعلومات (نقاط البيع الفريدة، الجمهور المستهدف، نبرة الصوت).',
            'السيناريو والصوت: كتابة سيناريو مؤثر وواضح، مع اقتراح تعليق صوتي احترافي (يمكن إضافة خدمة التعليق الصوتي).',
            'القصة المصورة (Storyboard): تقديم رسم تخطيطي مفصل لكل مشهد.',
            '__التصميم والإنتاج:__',
            'سيناريو بصري مخصص: تصميم مشاهد فريدة تعكس ثقافة الشركة (استخدام صور حقيقية للفريق/المكتب إذا أمكن).',
            'موشن جرافيك متقدم: إنفوجرافيك متحرك معقد لشرح العمليات أو الإحصائيات.',
            'تسجيل التعليق الصوتي: التنسيق للتسجيل مع فنان تعليق صوتي محترف (مشمول أو كإضافة).',
            'الموسيقى والمؤثرات الصوتية: اختيار موسيقى أصلية تعكس شخصية العلامة التجارية.',
            'المراجعة والتنقيح: مراجعتان رئيسيتان على الأقل (واحدة للقصة المصورة، وواحدة لمسودة الفيديو الأولية).',
        ]
      }
    ]
  },
  {
    id: 'packaging-design',
    name: 'تصميم العبوات والتغليف',
    description: 'خدمات متخصصة لتصميم أغلفة وعبوات المنتجات لضمان الجاذبية والحماية.',
    options: [
      {
        id: 'bag-design',
        name: '7.1 تصميم الأكياس',
        price: 350,
        hasQuantity: true,
        quantityLabel: 'عدد التصاميم',
        priceSuffix: 'لكل تصميم',
        priceTiers: PACKAGING_BAG_PRICE_TIERS,
        items: [
          '__النطاق:__ تصميم أكياس مرنة (بلاستيك، ورق، إلخ) حسب نوع المنتج.',
          '__المحتوى:__ تصميم متناسق للوجهين الأمامي والخلفي.',
          '__إعداد الطباعة:__ تجهيز الملفات بنظام ألوان CMYK / Pantone لضمان دقة الألوان.',
          '__دعم اللغات:__ التصميم يدعم اللغتين العربية والإنجليزية.',
          '__المخرجات:__ ملفات جاهزة للطباعة (AI, EPS, PDF) + صور (PNG/JPG) للمراجعة.',
        ],
      },
      {
        id: 'box-design',
        name: '7.2 تصميم العبوات والصناديق',
        price: 350,
        hasQuantity: true,
        quantityLabel: 'عدد التصاميم',
        priceSuffix: 'لكل تصميم',
        priceTiers: PACKAGING_BOX_PRICE_TIERS,
        items: [
          '__النطاق:__ تصميم عبوة كرتونية أو صلبة (Rigid Box).',
          '__الهيكل:__ تصميم كامل لجميع أوجه العبوة (6 أوجه أو أكثر).',
          '__دمج مخطط القص (Dieline):__ دمج العناصر البصرية مع خطوط القص (dieline).',
          '__اللمسة الفنية:__ توازن بين الفخامة والبساطة حسب فئة المنتج.',
          '__المخرجات:__ ملف AI مع مخطط القص + PDF للطباعة + موك أب (3D Mockup) للتخيل.',
        ],
      },
      {
        id: 'sticker-design-new',
        name: '7.3 تصميم ملصق (Sticker) جديد',
        price: 150,
        hasQuantity: true,
        quantityLabel: 'عدد التصاميم',
        priceSuffix: 'لكل تصميم',
        priceTiers: PACKAGING_STICKER_NEW_PRICE_TIERS,
        items: ['تصميم ملصق منتج احترافي متوافق مع الهوية البصرية'],
      },
      {
        id: 'sticker-design-edit',
        name: '7.4 تعديل تصميم ملصق قائم',
        price: 50,
        hasQuantity: true,
        quantityLabel: 'عدد التصاميم',
        priceSuffix: 'لكل تصميم',
        items: ['تحديث أو تحسين بيانات ورسوميات ملصق حالي'],
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
