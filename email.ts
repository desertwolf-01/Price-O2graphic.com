// email.ts

import emailjs from '@emailjs/browser';

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

  // Your EmailJS credentials (Update these with your actual values)
  const serviceID = 'service_...'; // <-- ضع Service ID هنا
  const templateIDForClient = 'template_...'; // <-- ضع Template ID لبريد العميل هنا
  const templateIDForMe = 'template_...';    // <-- ضع Template ID لك هنا
  const publicKey = 'public_...'; // <-- ضع Public Key هنا

  // Check credentials
  if (serviceID === 'service_...' || // <-- تحقق من القيم الافتراضية
      templateIDForClient === 'template_...' || // <-- تحقق من القيم الافتراضية
      templateIDForMe === 'template_...' || // <-- تحقق من القيم الافتراضية
      publicKey === 'public_...') { // <-- تحقق من القيم الافتراضية
    console.error('EmailJS credentials are not set! Please update them in email.ts.');
    return Promise.reject(new Error('Credentials not set.'));
  }

  // Send both emails simultaneously
  return Promise.all([
    // Send to client
    emailjs.send(serviceID, templateIDForClient, templateParamsToClient, publicKey),
    // Send to yourself
    emailjs.send(serviceID, templateIDForMe, templateParamsToMe, publicKey)
  ])
  .then(() => {
    console.log('SUCCESS! Both emails sent.');
    return true; // <-- نجاح
  })
  .catch((error) => {
    console.error('FAILED...', error);
    throw error; // <-- فشل
  });
};

export { sendProposal };
