import * as emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from './config';
import { Translation } from './i18n';
import type { ServiceOption } from './types';

interface EmailParams {
    clientInfo: { name: string; email: string; phone: string; };
    selectedOptions: ServiceOption[];
    quantities: { [id: string]: number };
    subTotalPrice: number;
    discount: number;
    discountPercentage: number;
    finalTotalPrice: number;
    isClientSubmission: boolean;
    t: Translation;
    selectedIds: string[];
}

export const isEmailConfigured = () => {
    const { SERVICE_ID, TEMPLATE_ID_ADMIN, TEMPLATE_ID_CLIENT, PUBLIC_KEY } = EMAILJS_CONFIG;
    return SERVICE_ID && !SERVICE_ID.includes('...') &&
           TEMPLATE_ID_ADMIN && !TEMPLATE_ID_ADMIN.includes('...') &&
           TEMPLATE_ID_CLIENT && !TEMPLATE_ID_CLIENT.includes('...') &&
           PUBLIC_KEY && !PUBLIC_KEY.includes('...');
};

export const sendProposalEmails = (params: EmailParams) => {
    const { 
        clientInfo, selectedOptions, quantities, subTotalPrice, discount,
        discountPercentage, finalTotalPrice, isClientSubmission, t, selectedIds 
    } = params;

    const servicesText = selectedOptions.map(option => {
        if (isClientSubmission) {
            return `- ${option.name}: $${option.price.toLocaleString()}`;
        }
        const quantity = option.hasQuantity ? (quantities[option.id] || 1) : 1;
        const price = (option.price * quantity).toLocaleString();
        return `- ${option.name}: $${price}`;
    }).join('\n');
    
    let summaryText = '';
    if (isClientSubmission) {
        summaryText = `
${t.subtotal}: $${subTotalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
${t.finalTotal}: $${finalTotalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        `;
    } else {
         summaryText = `
${t.subtotal}: $${subTotalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
${discount > 0 ? `${t.discountLabel(discountPercentage)}: -$${discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ''}
${t.finalTotal}: $${finalTotalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        `;
    }

    const clientLink = `${window.location.origin}${window.location.pathname}?mode=client&services=${selectedIds.join(',')}&name=${encodeURIComponent(clientInfo.name)}&phone=${encodeURIComponent(clientInfo.phone)}&email=${encodeURIComponent(clientInfo.email)}`;

    const templateParamsAdmin = {
        client_name: clientInfo.name,
        client_email: clientInfo.email,
        client_phone: clientInfo.phone,
        selected_services: servicesText,
        price_summary: summaryText,
        final_total: `$${finalTotalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        proposal_link: isClientSubmission ? 'N/A - Client Approved' : clientLink
    };
    
    const templateParamsClient = {
        to_name: clientInfo.name,
        to_email: clientInfo.email,
        selected_services: servicesText,
        price_summary: summaryText,
        final_total: `$${finalTotalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    };

    const { SERVICE_ID, TEMPLATE_ID_ADMIN, TEMPLATE_ID_CLIENT, PUBLIC_KEY } = EMAILJS_CONFIG;
    
    const sendAdminEmail = emailjs.send(SERVICE_ID, TEMPLATE_ID_ADMIN, templateParamsAdmin, { publicKey: PUBLIC_KEY });
    const sendClientEmail = emailjs.send(SERVICE_ID, TEMPLATE_ID_CLIENT, templateParamsClient, { publicKey: PUBLIC_KEY });

    return Promise.all([sendAdminEmail, sendClientEmail]);
};