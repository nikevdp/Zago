import { Button } from "./ui/button";
import { MessageCircle, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { envConfig } from "../config/env";

export function Hero() {
  const { number: whatsappNumber, message: whatsappMessage } = envConfig.whatsapp;
  const hasWhatsappConfig = Boolean(whatsappNumber);

  const handleWhatsAppClick = () => {
    if (!hasWhatsappConfig) return;
    const baseUrl = `https://wa.me/${whatsappNumber}`;
    const message = whatsappMessage?.length ? whatsappMessage : undefined;
    const url = message
      ? `${baseUrl}?text=${encodeURIComponent(message)}`
      : baseUrl;
    window.open(url, "_blank");
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
          src="https://images.unsplash.com/photo-1653724618298-8838668f7d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhlcm8lMjBiYW5uZXJ8ZW58MXx8fHwxNzYyNjE0OTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Hero banner"
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
            disabled={!hasWhatsappConfig}
          >
            <MessageCircle className="w-5 h-5" />
            {hasWhatsappConfig
              ? "Contactar por WhatsApp"
              : "WhatsApp no configurado"}
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
