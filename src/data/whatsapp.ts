export const whatsappNumber = '919405243860';

export const whatsappTemplates = {
  websiteDevelopment:
    'Hello Vanexa Studio, I am interested in website development for my business. Please share the process and quotation.',
  seoAndAI:
    'Hello Vanexa Studio, I would like to improve my website\'s SEO, Google visibility and AI search visibility. Please contact me.',
  googleBusinessProfile:
    'Hello Vanexa Studio, I need assistance with Google Business Profile optimization and local SEO. Please share the details.',
  socialMediaManagement:
    'Hello Vanexa Studio, I am looking for social media management and promotional creatives for my business.',
  graphicDesign:
    'Hello Vanexa Studio, I need graphic design and branding services. Please share your packages and process.',
  general:
    'Hello Vanexa Studio, I would like to discuss digital marketing services for my business.',
} as const;

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppTemplate(service: string) {
  const normalized = service.toLowerCase().replace(/[^a-z]+/g, '');

  if (normalized.includes('website')) {
    return whatsappTemplates.websiteDevelopment;
  }

  if (normalized.includes('seo') || normalized.includes('ai')) {
    return whatsappTemplates.seoAndAI;
  }

  if (normalized.includes('google') || normalized.includes('profile')) {
    return whatsappTemplates.googleBusinessProfile;
  }

  if (normalized.includes('social') || normalized.includes('media')) {
    return whatsappTemplates.socialMediaManagement;
  }

  if (normalized.includes('graphic') || normalized.includes('design') || normalized.includes('branding')) {
    return whatsappTemplates.graphicDesign;
  }

  return whatsappTemplates.general;
}
