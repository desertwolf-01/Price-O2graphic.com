
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from './config';
import type { ServiceOption } from './types';
import type { Translation } from './i18n';

/**
 * Checks if the essential EmailJS credentials are set in config.ts and are not placeholders.
 * @returns {boolean} True if configured, false otherwise.
 */
export const isEmailConfigured = () => {
  const { SERVICE_ID, TEMPLATE_ID_ADMIN, PUBLIC_KEY } = EMAILJS_CONFIG;
  
  const isPlaceholder = (value: string) => !value || value.includes('...') || value.includes('YOUR_');
  
  if (isPlaceholder(SERVICE_ID) || isPlaceholder(TEMPLATE_ID_ADMIN) || isPlaceholder(PUBLIC_KEY)) {
    console.warn('EmailJS credentials appear to be placeholders. Please update config.ts');
    return false;
  }
  return true;
};

interface SendProposalEmailsParams {
  clientInfo: { name: string; phone: string; email: string };
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

/**
 * Sends proposal emails to both the admin and (optionally) the client.
 * @param {SendProposalEmailsParams} params - The proposal details.
 */
export const sendProposalEmails = async ({
  clientInfo,
  selectedOptions,
  quantities,
  subTotalPrice,
  discount,
  discountPercentage,
  finalTotalPrice,
  isClientSubmission,
  t,
  selectedIds
}: SendProposalEmailsParams) => {

  const { SERVICE_ID, TEMPLATE_ID_ADMIN, TEMPLATE_ID_CLIENT, PUBLIC_KEY } = EMAILJS_CONFIG;
  
  const clientViewParams = new URLSearchParams({
    mode: 'client',
    services: selectedIds.join(','),
    name: clientInfo.name,
    phone: clientInfo.phone,
    email: clientInfo.email,
  });
  const clientViewLink = `${window.location.origin}${window.location.pathname}?${clientViewParams.toString()}`;

  const formatPrice = (price: number) => `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  
  const adminMessageHtml = `
    <h3>New Proposal Submission (${isClientSubmission ? 'from Client Inquiry' : 'from Admin Preview'})</h3>
    <hr>
    <h4>Client Information</h4>
    <p><strong>Name:</strong> ${clientInfo.name}</p>
    <p><strong>Phone:</strong> ${clientInfo.phone}</p>
    <p><strong>Email:</strong> ${clientInfo.email}</p>
    <p><strong>Shareable Link:</strong> <a href="${clientViewLink}">View Proposal</a></p>
    <hr>
    <h4>Selected Services</h4>
    <ul>
      ${selectedOptions.map(option => {
        const quantity = option.hasQuantity ? (quantities[option.id] || 1) : 1;
        const price = option.price * quantity;
        const quantityText = option.hasQuantity ? ` (${quantity} &times; $${option.price.toLocaleString()})` : '';
        return `<li><b>${option.name}</b>${quantityText}: ${formatPrice(price)}</li>`;
      }).join('')}
    </ul>
    <hr>
    <h4>Price Summary</h4>
    <p><strong>Subtotal:</strong> ${formatPrice(subTotalPrice)}</p>
    <p><strong>Discount (${discountPercentage}%):</strong> -${formatPrice(discount)}</p>
    <p><strong>Total Price:</strong> <strong>${formatPrice(finalTotalPrice)}</strong></p>
  `;

  // Simplified parameters for the admin-facing email.
  // This is more robust and less prone to template mismatches.
  // The EmailJS template should be configured to send 'To: info@o2graphic.com'
  // and use {{from_name}}, {{reply_to}}, and {{{message}}} variables.
  const adminParams = {
    from_name: clientInfo.name,
    reply_to: clientInfo.email,
    message: adminMessageHtml,
  };

  // Prepare parameters for the client-facing email.
  const clientParams = {
    to_name: clientInfo.name,
    to_email: clientInfo.email,
    services_list: `<ul>${selectedOptions.map(o => `<li><b>${o.name}</b></li>`).join('')}</ul>`,
    total_price: formatPrice(finalTotalPrice),
  };
  
  const emailPromises = [];

  emailPromises.push(
    emailjs.send(SERVICE_ID, TEMPLATE_ID_ADMIN, adminParams, PUBLIC_KEY)
  );

  const isClientTemplateConfigured = TEMPLATE_ID_CLIENT && !TEMPLATE_ID_CLIENT.includes('...') && !TEMPLATE_ID_CLIENT.includes('YOUR_');
  
  if (isClientTemplateConfigured) {
      emailPromises.push(
          emailjs.send(SERVICE_ID, TEMPLATE_ID_CLIENT, clientParams, PUBLIC_KEY)
      );
  }

  return Promise.all(emailPromises);
};
