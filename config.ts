// --- EMAILJS CONFIGURATION ---
// IMPORTANT: To enable email sending, you must update the following values.
// 1. Sign up or log in to your EmailJS account: https://dashboard.emailjs.com/
// 2. Find your Service ID in the "Email Services" tab.
// 3. Create at least one template for admin notifications. Find its ID in the "Email Templates" tab.
// 4. Find your Public Key in the "Account" -> "API KEYS" tab.

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_oa6dp1v', // <-- This is your Service ID from EmailJS
  TEMPLATE_ID_ADMIN: 'template_...', // <-- MANDATORY: Replace with your Template ID for emails sent to you (info@o2graphic.com)
  TEMPLATE_ID_CLIENT: 'template_...', // <-- OPTIONAL: Replace with your Template ID for confirmation emails sent to the client
  PUBLIC_KEY: 'Tk1ZBkSxikzXkczA4',
};
