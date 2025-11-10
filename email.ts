// email.ts

import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from './config'; // Adjust the path if config.ts is in a different folder

interface ProposalDetails {
    clientName: string;
    clientEmail: string; // Client's email
    selectedPlans: string[];
    totalPrice: number;
}

const sendProposal = ({ clientName, clientEmail, selectedPlans, totalPrice }: ProposalDetails): Promise<boolean> => {
  const templateParamsToClient = {
    to_name: clientName,
    to_email: clientEmail, // Sent to client
    selected_plans: selectedPlans.join(", "),
    total_price: totalPrice,
  };

  const templateParamsToMe = {
    to_name: "O2Graphic Team", // Or your name
    to_email: "info@o2graphic.com", // Sent to your email
    client_name: clientName,
    client_email: clientEmail,
    selected_plans: selectedPlans.join(", "),
    total_price: totalPrice,
  };

  // Use the imported configuration
  const { SERVICE_ID, TEMPLATE_ID: templateIDForMe, PUBLIC_KEY } = EMAILJS_CONFIG;

  // Check credentials (assuming you have a separate template ID for the client if needed)
  // For now, using the main TEMPLATE_ID for the internal notification.
  // You might want to add a CLIENT_TEMPLATE_ID to your config if you send to the client too.
  const templateIDForClient = 'template_...'; // Add this to your config.ts if sending to client

  if (SERVICE_ID === 'service_...' || // <-- Check for placeholder values
      templateIDForMe === 'template_...' || // <-- Check for placeholder values
      PUBLIC_KEY === 'euA_gPNF71hZu-USr') { // <-- Check for placeholder value
    console.error('EmailJS credentials are not set in config.ts! Please update them.');
    return Promise.reject(new Error('Credentials not set.'));
  }

  // Example: If you also send to the client, use their template ID here
  // const clientTemplateId = EMAILJS_CONFIG.CLIENT_TEMPLATE_ID || templateIDForMe;

  // Send both emails simultaneously (or just one to yourself)
  return Promise.all([
    // Example for sending to client (uncomment and configure if needed)
    // emailjs.send(SERVICE_ID, clientTemplateId, templateParamsToClient, PUBLIC_KEY),

    // Send to yourself
    emailjs.send(SERVICE_ID, templateIDForMe, templateParamsToMe, PUBLIC_KEY)
  ])
  .then(() => {
    console.log('SUCCESS! Email sent to O2Graphic.');
    return true; // <-- Success
  })
  .catch((error) => {
    console.error('FAILED...', error); // <-- This message will appear now
    throw error; // <-- Failure
  });
};

export { sendProposal };
