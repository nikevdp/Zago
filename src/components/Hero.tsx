import { Button } from "./ui/button";
import { MessageCircle, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Heroimage from "../assets/hero-background.jpeg";

const sanitizePhoneNumber = (value: string | undefined) =>
  value?.replace(/[^0-9]/g, "") ?? "";

export function Hero() {
  const whatsappNumber =
    sanitizePhoneNumber(import.meta.env.VITE_WHATSAPP_PHONE) || "1234567890";
  const whatsappMessage =
    import.meta.env.VITE_WHATSAPP_MESSAGE ||
    "Hola, me gustaría obtener más información";

  const handleWhatsAppClick = () => {
    if (!whatsappNumber) return;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank"
    );
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById("productos");
    if (productsSection) {
      const offset = 80; // Altura del header
      const elementPosition = productsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={Heroimage}
          className="w-full h-full object-cover"
        />
        {/* Overlay oscuro para mejorar legibilidad del texto */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white mb-6 max-w-4xl">
          Soluciones Profesionales Para Tu Negocio
        </h1>
        <p className="text-white/90 mb-8 max-w-2xl">
          Ofrecemos productos y servicios de la más alta calidad para impulsar tu empresa al siguiente nivel
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 gap-2"
            onClick={handleWhatsAppClick}
          >
            <MessageCircle className="w-5 h-5" />
            Contactar por WhatsApp
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white border-white/30 gap-2 backdrop-blur-sm"
            onClick={scrollToProducts}
          >
            Ver Productos
            <ChevronDown className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
