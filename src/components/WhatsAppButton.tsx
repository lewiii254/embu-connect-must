import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const whatsappGroupLink = "https://chat.whatsapp.com/IV140g1B3H97RTUghLzXfa";

  return (
    <a
      href={whatsappGroupLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-in fade-in slide-in-from-bottom-4 group"
      aria-label="Join WhatsApp Group"
    >
      <MessageCircle className="h-7 w-7 group-hover:animate-pulse" />
      <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-pulse"></span>
    </a>
  );
};

export default WhatsAppButton;
