import { MessageCircle } from "lucide-react";
import { createWhatsAppConsultationLink } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  return (
    <a
      href={createWhatsAppConsultationLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp Ada Balon Bengkulu"
      className="fixed bottom-5 right-4 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-leaf text-white shadow-soft transition-transform hover:scale-110 md:flex"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
