export type Translation = typeof translations.ar;

export const translations = {
    ar: {
        appTitle: 'O2Graphic | عرض أسعار',
        // Client Info
        clientInfoTitle: 'بيانات العميل',
        clientNameLabel: 'الاسم',
        clientPhoneLabel: 'رقم الهاتف',
        clientEmailLabel: 'البريد الإلكتر الإلكتروني',
        proposalDateLabel: 'تاريخ العرض',
        clientNamePlaceholder: 'اسم العميل',
        clientPhonePlaceholder: '05xxxxxxxx',
        clientEmailPlaceholder: 'email@example.com',
        emailError: 'صيغة البريد الإلكتروني غير صحيحة.',
        proposalTitle: 'عرض أسعار خدمات التصميم الجرافيكي',
        proposalTo: (clientName: string) => `عرض سعر مقدم إلى: ${clientName || '...'}`,

        // Static Sections
        proposalDescription: `
            <p class="mb-4">لأكثر من 15 عامًا، نحوّل أفكارك إلى واقع مرئي ونُعيد تعريف الجمال في التصميم. نحن لا نقدم لك مجرد صورة، بل تجربة تُبقي علامتك في ذهن عملائك.</p>
            <p class="mb-4">نعمل مع علامات تجارية من مختلف الصناعات، من الشركات الناشئة إلى المؤسسات الراسخة، لنصنع لك تصميمات لا تُرى فقط، بل تُشعر، وتُحفّز، وتُحوّل.</p>
            <p class="mb-4 font-semibold text-slate-700">نحن نبني هوية مرئية لا تُنسى من خلال:</p>
            <ul class="list-disc list-inside text-right inline-block mb-4 space-y-1">
                <li>لوجوهات تُعبّر عن هويتك</li>
                <li>حملات وسائل تواصل تُحرك الجمهور</li>
                <li>رسوم متحركة وتصميم ثلاثي الأبعاد يُدهش</li>
            </ul>
            <p class="font-medium">اختر خدمتك، وسنرسل لك عرض سعر مخصص دون تعقيد أو تأخير. فقط اختر، وسنُكمل الباقي.</p>
        `,
        
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
        sendEmail: 'ارسال العرض',
        sendProposal: 'إرسال استفسار',
        sendAsText: 'ارسل',
        sending: 'جاري الإرسال...',
        print: 'طباعة',
        clearSelection: 'مسح الاختيار',

        // Discounts
        totalDiscountApplied: (percentage: number) => `🎉 لقد حصلت على خصم إجمالي بنسبة ${percentage}%!`,

        // Alerts & Messages
        fillInfoAlert: 'يرجى تعبئة جميع بيانات العميل (الاسم، الهاتف، والبريد الإلكتروني) بشكل صحيح أولاً.',
        fillInfoAlertClient: 'يرجى تعبئة اسمك ورقم هاتفك وبريدك الإلكتروني بشكل صحيح للمتابعة.',
        successTitle: 'اكتمل الإجراء!',
        successMessageEmail: 'تم فتح برنامج البريد. يرجى مراجعة المحتوى ثم الإرسال.',
        successMessageClient: 'شكراً لك! تم إرسال اختيارك بنجاح. سنتواصل معك قريباً.',
        emailSendError: 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.',
        emailSendErrorConfig: 'يبدو أن هناك مشكلة في الإعدادات. يرجى التواصل مع الدعم الفني.',
        emailSendErrorNetwork: 'تعذر إرسال العرض. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.',
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
        clientNameLabel: 'Name',
        clientPhoneLabel: 'Phone Number',
        clientEmailLabel: 'Email',
        proposalDateLabel: 'Proposal Date',
        clientNamePlaceholder: 'Your Name',
        clientPhonePlaceholder: '05xxxxxxxx',
        clientEmailPlaceholder: 'your.email@example.com',
        emailError: 'Invalid email format.',
        proposalTitle: 'Graphic Design Services Price Quote',
        proposalTo: (clientName: string) => `Quote presented to: ${clientName || '...'}`,

        // Static Sections
        proposalDescription: `
            <p class="mb-4">For over 15 years, we've turned ideas into visual reality by redefining beauty in design. We offer more than just an image; we provide an experience that keeps your brand top-of-mind.</p>
            <p class="mb-4">We work with brands across various industries, from startups to established corporations, to create designs that are not just seen, but felt, motivating, and transformative.</p>
            <p class="mb-4 font-semibold text-slate-700">We build unforgettable visual identities through:</p>
            <ul class="list-disc list-inside text-left inline-block mb-4 space-y-1">
                <li>Logos that express your identity</li>
                <li>Social media campaigns that engage audiences</li>
                <li>Stunning animation and 3D designs</li>
            </ul>
            <p class="font-medium">Select your service, and we'll send you a customized quote without complexity or delay. Just choose. We'll handle the rest.</p>
        `,

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
        sendEmail: 'Send Proposal',
        sendProposal: 'Send Inquiry',
        sendAsText: 'Send',
        sending: 'Sending...',
        print: 'Print',
        clearSelection: 'Clear Selection',

        // Discounts
        totalDiscountApplied: (percentage: number) => `🎉 You've received a total discount of ${percentage}%!`,

        // Alerts & Messages
        fillInfoAlert: 'Please fill in all client information (Name, Phone, and Email) correctly first.',
        fillInfoAlertClient: 'Please fill in your name, phone number, and email correctly to proceed.',
        successTitle: 'Action Completed!',
        successMessageEmail: 'Email client opened. Please review the content and send.',
        successMessageClient: 'Thank you! Your selection has been sent successfully. We will contact you shortly.',
        emailSendError: 'An error occurred while sending. Please try again.',
        emailSendErrorConfig: 'There seems to be a configuration issue. Please contact support.',
        emailSendErrorNetwork: 'Could not send the proposal. Please check your internet connection and try again.',
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
        term2Desc: 'A 50% down payment of the project value is required before commencement, and the remaining 50% is due upon final delivery.',
        term3Title: 'Project Timeline',
        term3Desc: 'The final project timeline will be determined after all project details are agreed upon and depends on the scope of the required services.',
        term4Title: 'Client Content',
        term4Desc: 'The client is responsible for providing all necessary materials (text, images, logos) on schedule to ensure timely delivery.',
        term5Title: 'Revisions and Amendments',
        term5Desc: 'The proposal includes a specified number of revisions per service (to be agreed upon). Any additional amendments may be subject to extra charges.',
        term6Title: 'Intellectual Property',
        term6Desc: 'Upon full payment, ownership of the final designs is transferred to the client. O2Graphic reserves the right to display the work in its portfolio.',

        // ARIA labels
        decreaseQuantity: 'Decrease quantity',
        increaseQuantity: 'Increase quantity',
        currentQuantity: 'Current quantity',
    },
};