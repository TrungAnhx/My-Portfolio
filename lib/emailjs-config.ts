// EmailJS Configuration - Read from environment variables
export const emailjsConfig = {
  publicKey: process.env.EMAILJS_PUBLIC_KEY || 'gINlacdFmm1QZWUht',
  serviceId: process.env.EMAILJS_SERVICE_ID || 'service_4fxm8vl',
  templateId: process.env.EMAILJS_TEMPLATE_ID || 'template_w5x1ipi',
  privateKey: process.env.EMAILJS_PRIVATE_KEY || ''
};
