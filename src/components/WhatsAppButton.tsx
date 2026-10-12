import { FaWhatsapp } from 'react-icons/fa6';

import { buildWhatsAppUrl, whatsappTemplates } from '../data/whatsapp';

export default function WhatsAppButton() {
  const url = buildWhatsAppUrl(whatsappTemplates.general);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Vanexa Studio on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_36px_rgba(37,211,102,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_22px_42px_rgba(37,211,102,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-7 sm:right-7"
    >
      <FaWhatsapp className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
