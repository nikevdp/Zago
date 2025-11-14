import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Products } from "./components/Products";
import Reviews from "./components/Reviews";
import { Contact } from "./components/Contact";
import WhatsAppLogo from "./assets/whatsapp.png";

const sanitizePhoneNumber = (value?: string) => value?.replace(/[^0-9]/g, "") ?? "";

export default function App() {
  const whatsappNumber = sanitizePhoneNumber(import.meta.env.VITE_WHATSAPP_PHONE);
  const hasWhatsappNumber = Boolean(whatsappNumber);

  const handleWhatsAppClick = () => {
    if (!whatsappNumber) return;
    window.open(
      "https://wa.me/+1170284317?text=Hola, me gustaría obtener más información",
      "_blank"
    );
  };

  return (
    <div className="w-full">
      <Header />
      <Hero />
      <Products />
      <Reviews appId="0625b084-2415-430b-827d-3a5ddd6e5cab" />
      <Contact />

      {hasWhatsappNumber ? (
        <button
          onClick={handleWhatsAppClick}
          className="whatsapp-fab fixed z-[999] flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          aria-label="Contactar por WhatsApp"
        >
          <img
            src={WhatsAppLogo}
            alt="Logo de WhatsApp"
            className="h-8 w-8"
            draggable={false}
          />
        </button>
      ) : null}
    </div>
  );
}
