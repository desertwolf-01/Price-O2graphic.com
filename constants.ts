
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
    { code: 'WELCOME10', discount: 5 },
    { code: 'SAVE20', discount: 10 },
    { code: 'O2SPECIAL', discount: 15 },
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

const SOCIAL_PKG_3_TIERS = [
    { minQuantity: 1, price: 600 },
    { minQuantity: 3, price: 500 },
    { minQuantity: 5, price: 400 },
];

const SOCIAL_PKG_4_TIERS = [
    { minQuantity: 1, price: 900 },
    { minQuantity: 3, price: 800 },
    { minQuantity: 5, price: 700 },
];

const SOCIAL_PKG_45_TIERS = [
    { minQuantity: 1, price: 1250 },
    { minQuantity: 3, price: 1150 },
    { minQuantity: 5, price: 1050 },
];

const SOCIAL_PKG_5_TIERS = [
    { minQuantity: 1, price: 1700 },
    { minQuantity: 3, price: 1600 },
    { minQuantity: 5, price: 1500 },
];

// Ribbon Configurations
const SOCIAL_MEDIA_RIBBON_EN = { text: 'Subscribe 3 months, get 10% off', color: '#73FD53' };
const SOCIAL_MEDIA_RIBBON_AR = { text: 'وفر 10% عند اشتراكك لمدة 3 أشهر!', color: '#73FD53' };

export const SERVICE_CATEGORIES_EN: ServiceCategory[] = [
  {
    id: 'graphic-design-services',
    name: 'Visual Identity & Graphic Design Services',
    description: 'We offer creative and innovative design solutions to enhance your brand. Browse our services and choose what suits your needs for an instant quote.<br/><br/><strong>🔄 Workflow Summary:</strong><br/>1- Need a clear strategy? → Request "Visual Strategy".<br/>2- Need a logo? → Request "Core Identity".<br/>3- Need digital presence? → Request "Digital Presence".<br/>4- Need internal professionalism? → Request "Stationery".<br/>5- Participating in events? → Request "Signage".<br/>6- Distributing gifts? → Request "Promotional Tools".',
    options: [
      {
        id: 'visual-strategy',
        name: '1. Visual Strategy (The Foundation)',
        price: 350,
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
          '__1. Social Media Covers__',
          'Custom designs for Cover Photos on platforms like Facebook and LinkedIn, expressing brand identity and serving as an attractive digital facade.',
          '__2. Social Media Template__',
          'A ready-made model for posts containing consistent formatting for colors, fonts, logo, and spacing; ensures visual consistency and speed in content creation.',
          '__3. Email Signature__',
          'A professional digital fingerprint added automatically at the end of emails; includes name, title, contact info, logo, and social icons — enhances credibility and identity in every message.',
          '__4. Presentation Template__',
          'A unified design for PowerPoint or Google Slides including backgrounds, fonts, colors, and ready layouts; used in internal presentations or before clients while maintaining brand identity.',
        ],
      },
      {
        id: 'stationery',
        name: '4. Stationery & Correspondence',
        price: 300,
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
        price: 300,
        items: [
          '__1. Office Outdoor Sign__',
          'A sign installed on the office or shop facade; serves as the first official interface of the brand, displaying the name, logo, and contact info clearly and attractively.',
          '__2. Roll-up Banner__',
          'A foldable and portable banner used in exhibitions, conferences, or receptions; easy to install and provides an attractive visual display of brand identity.',
          '__3. Flyer/Leaflet__',
          'A printed advertising medium distributed manually or displayed in public places; offers concise information about the product or service in an organized and attractive way.',
          '__4. Wall Poster__',
          'A large design hung on walls in public places or inside the facility; used for advertisements, promotional campaigns, or spreading key brand messages.',
          '__5. Greeting Cards__',
          'Seasonal cards (holidays, occasions, thanks) bearing the brand character; strengthens the relationship with clients and partners with a personal and professional touch.',
          '__6. Billboards & Display Screens__',
          'Visual designs dedicated for display on outdoor Billboards, digital display screens in malls or streets, or internal reception screens.',
        ],
      },
      {
        id: 'promotional-tools-package',
        name: '6. Promotional Tools & Giveaways',
        price: 450,
        items: [
            '__1. Office Pens__',
            'A practical daily tool bearing your logo, constantly used in offices and meetings, ensuring continuous visibility for your brand.',
            '__2. Mugs__',
            'A common and practical gift (especially in office environments), displaying your logo before the eyes all day during use.',
            '__3. Caps__',
            'An ideal wearable item for outdoor occasions or events, combining utility with visual publicity in public places.',
            '__4. USB Drives__',
            'A smart and practical gift for professionals and students, storing your files and showing your logo whenever used.',
            '__5. Pin Badges__',
            'A small accessory attached to clothes or bags, enhances belonging to the brand and is used in formal events.',
            '__6. Branded Bags__',
            'A sustainable alternative to plastic bags, used in shopping or gifts, acting as a mobile advertisement when carried.',
            '__7. Company Flag__',
            'Used in offices, cars, or events to represent visual identity officially and clearly.',
            '__8. Logo Medals__',
            'Given as appreciation or award, enhances loyalty and encourages displaying the brand proudly (ideal for employees or special clients).',
            '__9. Seat Cushions__',
            'A comfortable gift used in offices or cars, bearing your logo indirectly but effectively.',
            '__10. Office Agenda__',
            'A daily organization tool used throughout the year, displaying your logo and colors on almost every page.',
            '__11. Pocket Notebook__',
            'Small and portable, used for jotting down quick notes, keeping your brand visible in daily life.',
            '__12. Branded Umbrellas__',
            'A useful seasonal gift (especially in rain), used publicly and providing wide advertising coverage.',
            '__13. Desktop Wallpaper__',
            'A digital design used on employee or client screens, reinforcing identity within the digital environment.',
            '__14. Promotional Tote/Backpack__',
            'A durable fabric bag used for shopping or commuting, considered a mobile billboard carrying your logo wherever it goes.',
            '__15. Wireless Charger / Power Bank__',
            'A desirable modern gift, especially in a phone-reliant world, showing your logo whenever the device is charged.',
            '__16. Fridge Magnets__',
            'A small home decorative item remaining visible for weeks or months, reminding of the brand in daily life.',
            '__17. Lanyards__',
            'Used to hang cards or keys, practical in conferences and offices, displaying your logo constantly.',
            '__18. T-Shirts__',
            'A basic clothing piece used in events or as part of a uniform, achieving wide visual spread.',
            '__19. Desk Clock__',
            'An elegant item used daily on the desk, combining luxury with quiet publicity for your brand.',
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
        hasQuantity: true,
        quantityLabel: 'Months',
        priceSuffix: 'per month',
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
        hasQuantity: true,
        quantityLabel: 'Months',
        priceSuffix: 'per month',
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
        hasQuantity: true,
        quantityLabel: 'Months',
        priceSuffix: 'per month',
        priceTiers: SOCIAL_PKG_3_TIERS,
        ribbon: SOCIAL_MEDIA_RIBBON_EN,
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
        name: 'Package 4: Advanced – 36 Monthly Designs',
        price: 900,
        hasQuantity: true,
        quantityLabel: 'Months',
        priceSuffix: 'per month',
        priceTiers: SOCIAL_PKG_4_TIERS,
        ribbon: SOCIAL_MEDIA_RIBBON_EN,
        items: [
          '36 Professional designs (Static or Carousel)',
          'Up to 3 rounds of design revisions',
          'Simplified monthly content plan (Distribution based on goals)',
          '__Total Posts: 36 Posts (All static)__',
          'Full commitment to brand identity (colors, fonts, patterns)',
        ]
      },
      {
        id: 'social-intermediate-54',
        name: 'Package 4.5: Intermediate Advanced – 54 Monthly Designs',
        price: 1250,
        hasQuantity: true,
        quantityLabel: 'Months',
        priceSuffix: 'per month',
        priceTiers: SOCIAL_PKG_45_TIERS,
        ribbon: SOCIAL_MEDIA_RIBBON_EN,
        items: [
          '54 Professional designs (Static or Carousel)',
          'Delivery in ready-to-publish formats: High-quality PNG + JPG',
          'Compatible with Instagram + Facebook sizes (Feed, Story, Reels Cover)',
          'Full commitment to brand identity (colors, fonts, patterns)',
          'Up to 4 rounds of design revisions (More than Package 4, Less than Package 5)',
          'Customized monthly content plan (Smart distribution based on goals)',
          'Visual Planning & Strategy (Free)',
          'Smart Posting & Scheduling (Free)',
        ]
      },
      {
        id: 'social-advanced-72',
        name: 'Package 5: Advanced Plus – 72 Monthly Designs',
        price: 1700,
        hasQuantity: true,
        quantityLabel: 'Months',
        priceSuffix: 'per month',
        priceTiers: SOCIAL_PKG_5_TIERS,
        ribbon: SOCIAL_MEDIA_RIBBON_EN,
        items: [
          '72 Professional designs (Static or Carousel)',
          'Up to 5 rounds of design revisions',
          'Simplified monthly content plan (Distribution based on goals)',
          '__Total Posts: 72 Posts (All static)__',
          'Full commitment to brand identity (colors, fonts, patterns)',
          'Visual Planning & Strategy (Free)',
          'Smart Posting & Scheduling (Free)',
        ]
      },
      {
        id: 'social-posting',
        name: 'Package 6: Smart Posting & Scheduling',
        price: 75,
        hasQuantity: true,
        quantityLabel: 'Months',
        priceSuffix: 'per month',
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
  }
];

export const SERVICE_CATEGORIES_AR: ServiceCategory[] = [
  {
    id: 'graphic-design-services',
    name: 'خدمات الهوية البصرية والتصميم الجرافيكي',
    description: 'نقدم حلول تصميم إبداعية ومبتكرة لتعزيز علامتك التجارية. تصفح خدماتنا واختر ما يناسب احتياجاتك للحصول على عرض سعر فوري.<br/><br/><strong>🔄 ملخص سير العمل:</strong><br/>1- هل تحتاج إلى استراتيجية واضحة؟ ← اطلب "استراتيجية بصرية".<br/>2- هل تحتاج إلى شعار؟ ← اطلب "الهوية الأساسية".<br/>3- هل تحتاج إلى تواجد رقمي؟ ← اطلب "التواجد الرقمي".<br/>4- هل تحتاج إلى احترافية داخلية؟ ← اطلب "المطبوعات الورقية".<br/>5- هل تشارك في فعاليات؟ ← اطلب "اللوحات الإعلانية".<br/>6- هل توزع هدايا؟ ← اطلب "الأدوات الترويجية".',
    options: [
      {
        id: 'visual-strategy',
        name: '1. الاستراتيجية البصرية (الأساس)',
        price: 350,
        description: '“لا تبدأ التصميم قبل أن تعرف من أنت، ولماذا أنت هنا، وكيف تختلف.” نحن لا نرسم فقط - بل نبني هوية مبنية على رؤية.',
        items: [
            '__1. عن العلامة التجارية:__ من نحن؟ ما هو مجالنا؟ قصتنا؟',
            '__2. القيم:__ المبادئ التي نؤمن بها (مثل الجودة، الثقة).',
            '__3. الدائرة الذهبية:__ لماذا ← كيف ← ماذا.',
            '__4. المهمة:__ ما الذي نسعى لتحقيقه يومياً؟',
            '__5. الرؤية:__ إلى أين نتجه؟',
            '__6. بيان التموضع:__ كيف نتميز عن المنافسين؟ من نخدم؟ وماذا نقدم لهم؟',
            '__7. التسمية:__ سبب التسمية ومعناها.',
            '__8. قصة العلامة التجارية:__ قصة التأسيس والتحديات.',
            '__9. الشعار اللفظي (Tagline):__ عبارة قصيرة تعبر عن جوهر العلامة.',
            '__10. سمات العلامة التجارية:__ السمات الشخصية (مثل حديثة، ودودة).'
        ]
      },
      {
        id: 'brand-identity',
        name: '2. الهوية الأساسية (عمود العلامة التجارية)',
        price: 500,
        items: [
            '__01. الشعار الرئيسي__',
            'التصميم الأساسي للعلامة الذي يُستخدم في أغلب التطبيقات الرسمية، ويجمع بين النص والرمز (إن وُجد) بشكل متوازن ومميز.',
            '__02. الشعار الثانوي__',
            'نسخة بديلة من الشعار تُستخدم في سياقات مختلفة (مثل المساحات الضيقة أو الخلفيات المعقدة)، مع الحفاظ على الوضوح والهوية.',
            '__03. إصدارات الشعار__',
            'جميع التنسيقات الممكنة للشعار (أبيض، أسود، ملون، شفاف، أفقي، عمودي) لضمان مرونته عبر مختلف الوسائط.',
            '__04. الحد الأدنى للأحجام__',
            'تحديد أقل حجم مسموح طباعته أو عرضه دون فقدان وضوح التفاصيل أو جودة الشعار.',
            '__05. سوء الاستخدام__',
            'أمثلة مرئية على ما لا يجب فعله بالشعار (مثل التمديد، تغيير الألوان، إضافة ظلال) لحماية هوية العلامة.',
            '__06. الأيقونة الرقمية__',
            'رمز مبسّط أو "فاوكون" (Favicon) يُستخدم على المواقع، التطبيقات، ووسائل التواصل الاجتماعي لتمثيل العلامة بسرعة.',
            '__07. لوحة الألوان الرسمية__',
            'مجموعة الألوان الأساسية والثانوية للعلامة مع قيمها (CMYK, RGB, HEX, Pantone) لضمان الاتساق عبر الطباعة والرقمي.',
            '__08. الخطوط المعتمدة__',
            'الخطوط الرسمية (للعربية والإنجليزية) المستخدمة في جميع المواد المرئية، مع تحديد الاستخدامات (عناوين، نصوص، شعارات).',
            '__09. نمط مرئي متكرر__',
            'عنصر زخرفي أو رسومي (Pattern) يُستخدم كخلفية خفيفة أو تفصيل ديكوري يعزز التعرف البصري على العلامة.',
            '__10. نمط خلفيات__',
            'تصاميم خلفيات جاهزة (ثابتة أو قابلة للتخصيص) تُستخدم في العروض التقديمية، مواقع الويب، أو وسائل التواصل.',
            '__11. نمط تغليف__',
            'نظام بصري موحد لتغليف المنتجات (أو الهدايا الترويجية) يعكس هوية العلامة ويجذب الانتباه على الرفوف.',
        ],
      },
      {
        id: 'digital-presence',
        name: '3. التواجد الرقمي ووسائل التواصل الاجتماعي',
        price: 350,
        items: [
          '__1. أغلفة وسائل التواصل الاجتماعي__',
          'تصاميم مخصصة لصور الغلاف (Cover Photos) على منصات مثل Facebook، LinkedIn، تُعبّر عن هوية العلامة وتُستخدم كواجهة رقمية جذابة.',
          '__2. قالب وسائل التواصل الاجتماعي__',
          'نموذج جاهز للمنشورات يحتوي على تنسيق ثابت للألوان، الخطوط، الشعار، والمسافات؛ يضمن اتساقًا بصريًّا وسرعة في إنشاء المحتوى.',
          '__3. توقيع البريد الإلكتروني__',
          'بصمة رقمية احترافية تُضاف تلقائيًا في نهاية رسائل البريد؛ تتضمن الاسم، الوظيفة، بيانات التواصل، الشعار، وأيقونات وسائل التواصل — تعزز المصداقية والهوية في كل رسالة.',
          '__4. قالب العرض التقديمي__',
          'تصميم موحد لشرائح PowerPoint أو Google Slides يشمل خلفيات، خطوط، ألوان، وتنسيقات جاهزة؛ يُستخدم في العروض الداخلية أو أمام العملاء مع الحفاظ على هوية العلامة.',
        ],
      },
      {
        id: 'stationery',
        name: '4. القرطاسية والمراسلات',
        price: 300,
        items: [
          '__1. بطاقات أعمال__',
          'أول انطباع مهني عند اللقاءات؛ تحمل بيانات التواصل الأساسية مع تصميم يعكس هوية العلامة بدقة.',
          '__2. ورق مراسلات (A5 / A4)__',
          'يُستخدم في المراسلات الرسمية والبريد؛ يعزز الاحترافية ويُظهر الشعار، الألوان، والخطوط المعتمدة في كل رسالة.',
          '__3. مغلفات (A4 / A3)__',
          'تُستخدم لإرسال المستندات أو العروض؛ تُكمل هوية الورق الرسمي وتضمن ظهور العلامة حتى قبل فتح المغلف.',
          '__4. فولدر عرض (A4 / A3)__',
          'أداة أساسية لتقديم العروض أو الملفات للعملاء؛ يجمع المستندات بشكل منظم ويُبرز الهوية البصرية باحتراف.',
          '__5. مذكرة صغيرة__',
          'دفتر ملاحظات عملي يُستخدم يوميًا في الاجتماعات أو المهام السريعة، يحافظ على حضور العلامة في البيئة المهنية.',
          '__6. بطاقة باجة__',
          'تُعلّق على الصدر في المكاتب أو الفعاليات؛ تُسهّل التعرّف على الموظفين وتعزز الانتماء المؤسسي.',
          '__7. فاتورة__',
          'وثيقة مالية رسمية تحمل هوية العلامة؛ تُستخدم في كل عملية بيع، مما يعزز الثقة والاحترافية لدى العملاء.',
          '__8. سند قبض__',
          'وثيقة تُثبت استلام مبلغ مالي؛ تصميمها الموحّد يعكس التنظيم والشفافية في التعاملات المالية.',
          '__9. سند صرف__',
          'وثيقة تُوثّق دفع مبلغ مالي؛ جزء أساسي من النظام المالي الداخلي مع الحفاظ على هوية العلامة في المستندات الرسمية.',
          '__10. أختام رسمية__',
          'تُستخدم للتوثيق القانوني أو الإداري؛ تُصمَّم لتتناسق مع الهوية البصرية (الشعار، الخط، التنسيق).',
        ],
      },
      {
        id: 'promotional-materials',
        name: '5. اللوحات الإعلانية وشاشات العرض',
        price: 300,
        items: [
          '__1. لوحة المكتب الخارجية__',
          'لوحة تُثبّت على واجهة المكتب أو المحل؛ تُعد الواجهة الرسمية الأولى للعلامة، وتُظهر الاسم، الشعار، ومعلومات التواصل بوضوح وجاذبية.',
          '__2. بانر رول أب (Roll-up Banner)__',
          'لافتة قابلة للطي والحمل تُستخدم في المعارض، المؤتمرات، أو الاستقبال؛ سهلة التركيب وتوفر عرضًا بصريًّا جذابًا لهوية العلامة.',
          '__3. فلاير/مطوية__',
          'وسيلة إعلانية مطبوعة تُوزّع يدويًّا أو تُعرض في الأماكن العامة؛ تقدّم معلومات موجزة عن المنتج أو الخدمة بطريقة منظمة وجذابة.',
          '__4. ملصق جداري (Poster)__',
          'تصميم كبير يُعلّق على الجدران في الأماكن العامة أو داخل المنشأة؛ يُستخدم للإعلانات، الحملات الترويجية، أو نشر الرسائل الأساسية للعلامة.',
          '__5. بطاقات التهنئة__',
          'بطاقات موسمية (أعياد، مناسبات، شكر) تحمل طابع العلامة؛ تعزز العلاقة مع العملاء والشركاء بلمسة شخصية ومهنية.',
          '__6. اللوحات الإعلانية وشاشات العرض__',
          'تصاميم بصرية مخصصة للعرض على اللوحات الخارجية (Billboards)، شاشات العرض الرقمية في المولات أو الشوارع، أو شاشات الاستقبال الداخلية',
        ],
      },
      {
        id: 'promotional-tools-package',
        name: '6. الأدوات الترويجية والهدايا',
        price: 450,
        items: [
            '__1. أقلام مكتبية__',
            'أداة يومية عملية تحمل شعارك، تُستخدم باستمرار في المكاتب والاجتماعات، مما يضمن رؤية مستمرة لعلامتك.',
            '__2. أكواب__',
            'هدية شائعة وعملية (خاصة في البيئات المكتبية)، تُعرض شعارك أمام العين طوال اليوم أثناء الاستخدام.',
            '__3. طاقية__',
            'عنصر ارتدائي مثالي للمناسبات الخارجية أو الفعاليات، يجمع بين الفائدة والدعاية المرئية في الأماكن العامة.',
            '__4. فلاشة USB__',
            'هدية ذكية وعملية للمهنيين والطلاب، تُخزن ملفاتك وتُظهر شعارك كلما تم استخدامها.',
            '__5. دبوس شعار__',
            'إكسسوار صغير يُثبّت على الملابس أو الحقائب، يعزز الانتماء للعلامة ويُستخدم في الفعاليات الرسمية.',
            '__6. أكياس تحمل الشعار__',
            'بديل مستدام للأكياس البلاستيكية، تُستخدم في التسوق أو الهدايا، وتعمل كإعلان متنقّل عند حملها.',
            '__7. علم الشركة__',
            'يُستخدم في المكاتب، السيارات، أو الفعاليات لتمثيل الهوية البصرية بشكل رسمي وواضح.',
            '__8. ميدالية شعار__',
            'تُمنح كتقدير أو جائزة، تعزز الولاء وتشجّع على عرض العلامة بفخر (مثالية للموظفين أو العملاء المميزين).',
            '__9. وسادة مقعد__',
            'هدية مريحة تُستخدم في المكاتب أو السيارات، تحمل شعارك بشكل غير مباشر لكن فعّال.',
            '__10. أجندة مكتبية__',
            'أداة تنظيم يومية تُستخدم طوال العام، تعرض شعارك وألوانك في كل صفحة تقريبًا.',
            '__11. مفكرة جيب__',
            'صغيرة وقابلة للحمل، تُستخدم لتدوين الملاحظات السريعة، وتحافظ على ظهور علامتك في الحياة اليومية.',
            '__12. مظلة تحمل الشعار__',
            'هدية موسمية مفيدة (خاصة في الأمطار)، تُستخدم علنًا وتوفر تغطية دعائية واسعة.',
            '__13. خلفية مكتب كمبيوتر__',
            'تصميم رقمي يُستخدم على شاشات الموظفين أو العملاء، يعزز الهوية داخل البيئة الرقمية.',
            '__14. حقيبة ترويجية__',
            'حقيبة قماشية متينة تُستخدم للتسوق أو التنقّل، تُعتبر لوحة إعلانية متنقلة تحمل شعارك أينما ذهبت.',
            '__15. شاحن لاسلكي / باور بانك__',
            'هدية عصرية مرغوبة، خاصة في عالم يعتمد على الهواتف، وتُظهر شعارك كلما تم شحن الجهاز.',
            '__16. مغناطيس ثلاجة__',
            'عنصر ديكوري منزلي صغير يبقى مرئيًا لأسابيع أو شهور، يذكّر بالعلامة في الحياة اليومية.',
            '__17. حبل تعليق__',
            'يُستخدم لتعليق البطاقات أو المفاتيح، عملي في المؤتمرات والمكاتب، ويعرض شعارك باستمرار.',
            '__18. قميص__',
            'قطعة ملابس أساسية تُستخدم في الفعاليات أو كجزء من الزي الموحد، تُحقق انتشارًا بصريًا واسعًا.',
            '__19. ساعة مكتبية__',
            'عنصر أنيق يُستخدم يوميًا على المكتب، يجمع بين الفخامة والدعاية الهادئة لعلامتك.',
        ]
      },
    ],
  },
  {
    id: 'exhibition-branding',
    name: 'هوية المعارض',
    description: 'خدمة شاملة لتصميم وتجهيز الهوية البصرية الاحترافية لجناحك في المعارض والمؤتمرات.',
    options: [
        {
            id: 'exhibition-package',
            name: 'باقة هوية المعارض المتكاملة',
            price: 3500,
            items: [
                '__1. الهوية البصرية للمعرض__',
                'تطوير شعار فرعي خاص بالمشاركة في المعرض',
                'تحديد لوحة ألوان وخطوط تتناسب مع بيئة المعرض',
                '__2. تصميم الجناح (Booth Design)__',
                'تخطيط المساحة والتصميم الداخلي للجناح',
                'تصميم الواجهة الخارجية والخلفية الرئيسية (Backdrop)',
                '__3. المطبوعات واللوحات__',
                'لوحات تعريفية كبيرة (Roll-up / Pop-up) ولافتات معلقة',
                'ملصقات جدارية وأرضيات مطبوعة',
                '__4. المواد الترويجية والهدايا__',
                'بروشورات وكتيبات وبطاقات عمل خاصة بالمعرض',
                'هدايا ترويجية (أقلام، نوت بوك) وحقائب',
                '__5. العرض الرقمي والتفاعلي__',
                'محتوى الشاشات (فيديو تعريفي، عروض تقديمية متحركة)',
                '__6. زي الموظفين__',
                'تصميم الزي الموحد (Uniform) وشارات التعريف (Badges)',
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
          'تصاميم واجهات (UI) جذابة وسهلة الاستخدام، متناسقة مع الهوية البصرية، وتدعم جميع الأجهزة (Responsive).',
          '__2. الصفحة الرئيسية (Home Page)__',
          'واجهة الموقع الرئيسية تعرض: رسالة العلامة التجارية الأساسية، أبرز الخدمات أو المنتجات، دعوة لاتخاذ إجراء (Call-to-Action)، شريط تنقل واضح.',
          '__3. من نحن (About Us)__',
          'صفحة تعريفية بالشركة تشمل: القصة والرؤية، القيم والإنجازات، فريق العمل.',
          '__4. المنتجات / الخدمات__',
          'عرض منظم للمنتجات أو الخدمات مع: صور عالية الجودة، وصف مختصر، خيارات تصنيف أو فلترة.',
          '__5. المعرض (Gallery)__',
          'قسم لعرض: صور من مشاريع سابقة أو معارض، فيديوهات أو ريلز، تنسيق شبكي أو متتابع جذاب.',
          '__6. اتصل بنا (Contact Us)__',
          'صفحة تحتوي على: نموذج اتصال مباشر، خريطة تفاعلية (Google Maps)، بيانات التواصل (هاتف، بريد، عنوان).',
          '__7. الدعم والصيانة__',
          'تحديثات دورية للمحتوى (حسب الاتفاق)، مراقبة أداء الموقع، دعم فني لمدة 3 أشهر بعد التسليم.',
          '__8. الأمان وإعداد الاستضافة__',
          'تثبيت شهادة SSL لموقع آمن (https://)، إعدادات أمان أساسية ضد الاختراق.',
        ]
      }
    ]
  },
  {
    id: 'social-media-design',
    name: 'تصاميم وسائل التواصل الاجتماعي (الباقة الشهرية المتكاملة)',
    description: 'باقات مصممة للنمو الاحترافي لتواجدك الرقمي. يمكنك اختيار المكونات التي تناسب احتياجاتك.',
    options: [
      {
        id: 'social-planning',
        name: 'باقة 1: التخطيط البصري والاستراتيجية',
        price: 75,
        hasQuantity: true,
        quantityLabel: 'أشهر',
        priceSuffix: 'شهرياً',
        items: [
          '__(الأساس لضمان فعالية المحتوى)__',
          'جلسة تخطيط محتوى شهرية (30 دقيقة)',
          'اقتراحات أولية للنصوص + توزيع بصري لكل منشور',
          'لوحة إلهام (Moodboard) أو اسكتشات أولية لأفكار المحتوى',
          'تجديد في أنواع المنشورات: ترويجي، تعليمي، تفاعلي، عروض...',
          '⚠️ هذه الباقة مطلوبة كأساس لأي باقة تنفيذ.',
        ]
      },
      {
        id: 'social-basic-9',
        name: 'باقة 2: الأساسية – 9 تصاميم أولية',
        price: 315,
        hasQuantity: true,
        quantityLabel: 'أشهر',
        priceSuffix: 'شهرياً',
        items: [
          '9 تصاميم احترافية (ثابتة أو كاروسيل)',
          'تسليم بصيغ جاهزة للنشر: PNG + JPG عالية الجودة',
          'متوافقة مع مقاسات إنستغرام + فيسبوك',
          '__إجمالي المنشورات: 9 منشورات (جميعها ثابتة)__',
          'التزام كامل بالهوية البصرية (ألوان، خطوط، أنماط)',
        ]
      },
      {
        id: 'social-emerging-18',
        name: 'باقة 3: الناشئة – 18 تصميم استراتيجي',
        price: 600,
        hasQuantity: true,
        quantityLabel: 'أشهر',
        priceSuffix: 'شهرياً',
        items: [
          '18 تصميم احترافي (ثابت أو كاروسيل)',
          'تسليم بصيغ جاهزة للنشر: PNG + JPG عالية الجودة',
          'متوافقة مع مقاسات إنستغرام + فيسبوك',
          '__إجمالي المنشورات: 18 منشور (جميعها ثابتة)__',
          'التزام كامل بالهوية البصرية (ألوان، خطوط، أنماط)',
        ]
      },
      {
        id: 'social-advanced-30',
        name: 'باقة 4: المتقدمة – 36 تصميم شهري',
        price: 900,
        hasQuantity: true,
        quantityLabel: 'أشهر',
        priceSuffix: 'شهرياً',
        items: [
          '36 تصميم احترافي (ثابت أو كاروسيل)',
          'ما يصل إلى 3 جولات من التعديلات على التصميم',
          'خطة محتوى شهرية مبسطة (توزيع بناءً على الأهداف)',
          '__إجمالي المنشورات: 36 منشور (جميعها ثابتة)__',
          'التزام كامل بالهوية البصرية (ألوان، خطوط، أنماط)',
        ]
      },
      {
        id: 'social-intermediate-54',
        name: 'باقة 4.5: المتقدمة المتوسطة – 54 تصميم شهري',
        price: 1250,
        hasQuantity: true,
        quantityLabel: 'أشهر',
        priceSuffix: 'شهرياً',
        items: [
          '54 تصميم احترافي (ثابت أو كاروسيل)',
          'تسليم بصيغ جاهزة للنشر: PNG + JPG عالية الجودة',
          'متوافقة مع مقاسات إنستغرام + فيسبوك (Feed, Story, Reels Cover)',
          'التزام كامل بالهوية البصرية (ألوان، خطوط، أنماط)',
          'ما يصل إلى 4 جولات من التعديلات على التصميم (أكثر من باقة 4، أقل من باقة 5)',
          'خطة محتوى شهرية مخصصة (توزيع ذكي بناءً على الأهداف)',
          'التخطيط البصري والاستراتيجية (مجاناً)',
          'النشر والجدولة الذكية (مجاناً)',
        ]
      },
      {
        id: 'social-advanced-72',
        name: 'باقة 5: المتقدمة بلس – 72 تصميم شهري',
        price: 1700,
        hasQuantity: true,
        quantityLabel: 'أشهر',
        priceSuffix: 'شهرياً',
        items: [
          '72 تصميم احترافي (ثابت أو كاروسيل)',
          'ما يصل إلى 5 جولات من التعديلات على التصميم',
          'خطة محتوى شهرية مبسطة (توزيع بناءً على الأهداف)',
          '__إجمالي المنشورات: 72 منشور (جميعها ثابتة)__',
          'التزام كامل بالهوية البصرية (ألوان، خطوط، أنماط)',
          'التخطيط البصري والاستراتيجية (مجاناً)',
          'النشر والجدولة الذكية (مجاناً)',
        ]
      },
      {
        id: 'social-posting',
        name: 'باقة 6: النشر والجدولة الذكية',
        price: 75,
        hasQuantity: true,
        quantityLabel: 'أشهر',
        priceSuffix: 'شهرياً',
        items: [
          'جدولة جميع المنشورات في الأوقات المثالية بناءً على الجمهور',
          'نشر تلقائي دون تدخل',
          'تقرير أداء شهري مبسط (أفضل 3 منشورات من حيث الوصول/التفاعل)',
        ]
      }
    ]
  },
  {
    id: 'corporate-materials',
    name: 'تصميم مواد الشركات والمعلومات',
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
          'يسلم كملف PDF جاهز للطباعة مع نسخة رقمية اختيارية.',
          'صور عالية الجودة',
          'وصف واضح + مواصفات تقنية',
          'الأسعار (إذا رغب العميل)',
          'شعار الشركة ولوحة ألوان موحدة',
          'الصيغة: طباعة (PDF جاهز للطباعة) + نسخة رقمية (اختياري)'
        ]
      },
      {
        id: 'company-profile',
        name: 'ملف الشركة (Company Profile)',
        price: 20,
        hasQuantity: true,
        priceTiers: CORPORATE_PRICE_TIERS,
        items: [
          'وثيقة احترافية تعكس هوية الشركة وقيمتها السوقية، تشمل نبذة عن الشركة، الإنجازات، الفريق، وبيانات التواصل.',
          'نبذة عن الشركة (الرؤية، الرسالة، القيم)',
          'أبرز المشاريع أو العملاء',
          'الجدول الزمني للإنجازات',
          'فريق القيادة',
          'يسلم بصيغتين: رقمي + ملف طباعة (PDF CMYK – 300 DPI)',
          'بيانات التواصل',
        ]
      },
      {
        id: 'presentation-design',
        name: 'العرض التقديمي (Presentation / Pitch Deck)',
        price: 20,
        hasQuantity: true,
        priceTiers: CORPORATE_PRICE_TIERS,
        items: [
          'شرائح احترافية مخصصة لـ Google Slides أو PowerPoint، مثالية لعروض العملاء، المستثمرين، أو الاجتماعات الداخلية.',
          'تصميم موحد مع الهوية',
          'إنفوجرافيك',
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
          'وثيقة رسمية تلخص أداء الشركة السنوي، مصممة لتعكس المصداقية والنجاح مع الحفاظ على هوية بصرية جذابة، تسلم كملف جاهز للطباعة.',
          'أهداف العام القادم',
          'كلمة الإدارة',
          'النتائج المالية (جداول، رسوم بيانية)',
          'أهم الإنجازات',
          'الأنشطة والفعاليات الرئيسية',
          'يسلم كملف PDF تفاعلي + طباعة',
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
          'ملف JPEG/PNG عالي الجودة (طباعة وعرض)',
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
    description: 'خدمات متخصصة لإنتاج مقاطع الفيديو القصيرة والأنيميشن لتعزيز تواجدك الرقمي.',
    options: [
      {
        id: 'reels-package',
        name: 'باقة تصميم الريلز (Reels Design Package)',
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
            '__تصميم عناصر مخصصة لـ Reels/Shorts/TikTok — جاهزة للمونتاج أو النشر.__',
            '__المخرجات:__ فيديو نهائي بصيغة MP4 (1080x1920) - جاهز للنشر.',
            '__موشن جرافيك:__ مشاهد جذابة متوافقة مع الهوية.',
            'نصوص متحركة (Typography) بتأثيرات أنيقة.',
            'خلفيات، أشكال، أنماط، وأيقونات.',
            '__التعديلات:__ ما يصل إلى جولتين.',
        ]
      },
      {
        id: '2d-animation-package',
        name: 'الباقة الذهبية للأنيميشن 2D الكامل',
        price: 500,
        hasQuantity: true,
        quantityLabel: 'دقائق',
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
