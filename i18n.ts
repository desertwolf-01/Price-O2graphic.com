export type Translation = typeof translations.ar;

export const translations = {
    ar: {
        appTitle: 'O2Graphic | عرض أسعار',
        // Client Info
        clientInfoTitle: 'بيانات العميل',
        clientNameLabel: 'اسم العميل',
        clientPhoneLabel: 'رقم الهاتف',
        clientEmailLabel: 'البريد الإلكتروني',
        proposalDateLabel: 'تاريخ العرض',
        clientNamePlaceholder: 'اسم العميل',
        clientPhonePlaceholder: '05xxxxxxxx',
        clientEmailPlaceholder: 'email@example.com',
        emailError: 'صيغة البريد الإلكتروني غير صحيحة.',
        proposalTo: (clientName: string) => `عرض سعر مقدم إلى: ${clientName || '...'}`,

        // Static Sections
        proposalTitle: 'عرض أسعار خدمات التصميم الجرافيكي',
        proposalDescription: 'نقدم حلولاً إبداعية ومبتكرة في عالم التصميم لتعزيز علامتك التجارية. تصفح خدماتنا واختر ما يناسب احتياجاتك للحصول على عرض سعر فوري.',
        
        // Pricing Section
        selectServicesTitle: 'اختر الخدمات',
        selectedServicesTitle: 'الخدمات المختارة',
        selectServicesDescription: 'قم بتحديد الباقات والخدمات التي تناسب احتياجاتك',
        pagesLabel: 'عدد الصفحات:',
        perPageSuffix: '/ للصفحة',
        subtotal: 'المجموع الفرعي',
        finalTotal: 'المجموع النهائي',
        priceSummaryTitle: 'ملخص الأسعار',

        // Total Bar
        totalPrice: 'المجموع الإجمالي',
        downloadPdf: 'تحميل العرض كملف PDF',
        sendEmail: 'إرسال عبر البريد',
        sendAsText: 'ارسل',
        preparing: 'جاري التحضير...',
        sending: 'جاري الإرسال...',

        // Discounts
        discount10: 'خصم 10% لاختيار 4 باقات',
        discount20: 'خصم 20% لاختيار 8 باقات',
        discount30: 'خصم 30% لاختيار 10 باقات',

        // Alerts & Messages
        fillInfoAlert: 'يرجى تعبئة جميع بيانات العميل (الاسم، الهاتف، والبريد الإلكتروني) بشكل صحيح أولاً.',
        successTitle: 'اكتمل الإجراء!',
        successMessagePdf: 'تم تحميل ملف PDF بنجاح!',
        successMessageEmail: 'تم فتح برنامج البريد. يرجى مراجعة المحتوى ثم الإرسال.',
        pdfErrorTitle: 'حدث خطأ',
        pdfErrorMessage: 'فشل إنشاء ملف PDF. يرجى المحاولة مرة أخرى.',
        close: 'إغلاق',

        // Email content
        emailSubject: (clientName: string) => `عرض سعر من O2Graphic لـ ${clientName}`,
        newClient: 'عميل جديد',
        emailGreeting: (clientName: string) => `عزيزي/عزيزتي ${clientName}،`,
        emailIntro: 'نشكرك على اهتمامك بخدماتنا. تجد أدناه عرض السعر المخصص بناءً على الخدمات التي اخترتها:',
        emailServicesHeader: 'تفاصيل العرض',
        emailSummaryHeader: 'ملخص الأسعار',
        emailClientHeader: 'بيانات العميل',
        discountLabel: (percentage: number) => `خصم (${percentage}%)`,
        emailClosing: 'مع خالص التقدير،',
        emailTeam: 'فريق O2Graphic',
        
        // Terms & Conditions
        termsTitle: 'الشروط والاحكام',
        term1Title: 'مدة صلاحية العرض',
        term1Desc: 'هذا العرض صالح لمدة 15 يوماً من تاريخ إصداره.',
        term2Title: 'شروط الدفع',
        term2Desc: 'يتم دفع 50% من قيمة المشروع كدفعة مقدمة قبل البدء، و 50% عند التسليم النهائي للمشروع.',
        term3Title: 'مدة تنفيذ المشروع',
        term3Desc: 'يتم تحديد مدة التنفيذ النهائية بعد الاتفاق على جميع تفاصيل المشروع، وتعتمد على حجم الخدمات المطلوبة.',
        term4Title: 'محتوى العميل',
        term4Desc: 'يلتزم العميل بتوفير جميع المواد اللازمة للمشروع (نصوص، صور، شعارات) في الوقت المحدد لضمان عدم تأخير التسليم.',
        term5Title: 'المراجعات والتعديلات',
        term5Desc: 'يشمل العرض عددًا محددًا من المراجعات لكل خدمة (يتم الاتفاق عليها)، وأي تعديلات إضافية قد تخضع لرسوم إضافية.',
        term6Title: 'الملكية الفكرية',
        term6Desc: 'بعد سداد كامل المستحقات، تنتقل ملكية التصاميم النهائية للعميل، وتحتفظ O2Graphic بحق عرضها في معرض أعمالها.',

        // ARIA labels
        decreaseQuantity: 'تقليل الكمية',
        increaseQuantity: 'زيادة الكمية',
        currentQuantity: 'الكمية الحالية',
    },
    en: {
        appTitle: 'O2Graphic | Price Quote',
        // Client Info
        clientInfoTitle: 'Client Information',
        clientNameLabel: 'Client Name',
        clientPhoneLabel: 'Phone Number',
        clientEmailLabel: 'Email',
        proposalDateLabel: 'Proposal Date',
        clientNamePlaceholder: 'Client Name',
        clientPhonePlaceholder: '05xxxxxxxx',
        clientEmailPlaceholder: 'email@example.com',
        emailError: 'Invalid email format.',
        proposalTo: (clientName: string) => `Quote presented to: ${clientName || '...'}`,

        // Static Sections
        proposalTitle: 'Graphic Design Services Price Quote',
        proposalDescription: 'We offer creative and innovative solutions in the world of design to enhance your brand. Browse our services and choose what suits your needs to get an instant price quote.',

        // Pricing Section
        selectServicesTitle: 'Select Services',
        selectedServicesTitle: 'Selected Services',
        selectServicesDescription: 'Select the packages and services that suit your needs',
        pagesLabel: 'Pages:',
        perPageSuffix: '/ page',
        subtotal: 'Subtotal',
        finalTotal: 'Final Total',
        priceSummaryTitle: 'Price Summary',

        // Total Bar
        totalPrice: 'Total Price',
        downloadPdf: 'Download Quote as PDF',
        sendEmail: 'Send via Email',
        sendAsText: 'Send',
        preparing: 'Preparing...',
        sending: 'Sending...',

        // Discounts
        discount10: '10% discount for selecting 4 or more packages',
        discount20: '20% discount for selecting 8 or more packages',
        discount30: '30% discount for selecting 10 or more packages',

        // Alerts & Messages
        fillInfoAlert: 'Please fill in all client information (Name, Phone, and Email) correctly first.',
        successTitle: 'Action Completed!',
        successMessagePdf: 'PDF downloaded successfully!',
        successMessageEmail: 'Email client opened. Please review the content and send.',
        pdfErrorTitle: 'An Error Occurred',
        pdfErrorMessage: 'Failed to generate PDF. Please try again.',
        close: 'Close',

        // Email content
        emailSubject: (clientName: string) => `Price Proposal from O2Graphic for ${clientName}`,
        newClient: 'a new client',
        emailGreeting: (clientName: string) => `Dear ${clientName},`,
        emailIntro: 'Thank you for your interest in our services. Please find your customized price proposal below:',
        emailServicesHeader: 'PROPOSAL DETAILS',
        emailSummaryHeader: 'PRICE SUMMARY',
        emailClientHeader: 'CLIENT INFORMATION',
        discountLabel: (percentage: number) => `Discount (${percentage}%)`,
        emailClosing: 'Sincerely,',
        emailTeam: 'The O2Graphic Team',

        // Terms & Conditions
        termsTitle: 'Terms and Conditions',
        term1Title: 'Offer Validity',
        term1Desc: 'This offer is valid for 15 days from the date of issue.',
        term2Title: 'Payment Terms',
        term2Desc: '50% of the project value is due as an advance payment before work begins, and 50% upon final project delivery.',
        term3Title: 'Project Duration',
        term3Desc: 'The final project timeline will be determined after agreement on all project details and depends on the scope of the required services.',
        term4Title: 'Client Content',
        term4Desc: 'The client is responsible for providing all necessary materials (text, images, logos) on time to avoid delays.',
        term5Title: 'Revisions and Edits',
        term5Desc: 'The offer includes a specific number of revisions for each service (to be agreed upon). Any additional edits may be subject to extra charges.',
        term6Title: 'Intellectual Property',
        term6Desc: 'Upon full payment, ownership of the final designs is transferred to the client. O2Graphic reserves the right to display the work in its portfolio.',
        
        // ARIA labels
        decreaseQuantity: 'Decrease quantity',
        increaseQuantity: 'Increase quantity',
        currentQuantity: 'Current quantity',
    }
};