import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import ASCARlogo from "../assets/ASCAlogo.jpeg";

const sanitizePhoneNumber = (value: string | undefined) =>
  value?.replace(/[^0-9+]/g, "") ?? "";

export function Contact() {
  const companyTagline =
    import.meta.env.VITE_COMPANY_TAGLINE ||
    "Nuestra cartera con mas de 500 clientes por todo el pais nos avala";
  const companyEmail =
    import.meta.env.VITE_COMPANY_EMAIL || "contacto@miempresa.com";
  const companyPhoneDisplay =
    import.meta.env.VITE_COMPANY_PHONE || "+1 (234) 567-890";
  const companyPhoneHref =
    sanitizePhoneNumber(import.meta.env.VITE_COMPANY_PHONE) || "1234567890";
  const addressLine1 =
    import.meta.env.VITE_COMPANY_ADDRESS_LINE1 || "Calle Principal 123";
  const addressLine2 =
    import.meta.env.VITE_COMPANY_ADDRESS_LINE2 || "Ciudad, Estado 12345";
  const googleMapsEmbedUrl =
    import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373631531654!3d-37.817209979751554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1614311735829!5m2!1sen!2sau";
  return (
    <section id="contacto" className="py-34 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-12">
          Contacto
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Información de contacto */}
          <Card>
            <CardContent className="p-8">
              {/* Logo */}
              <div className="flex items-center justify-center mb-8">
                <img src={ASCARlogo} alt="ASCAR Logo" className="w-auto mb-6" />
              </div>
              <div className="text-center mb-8">
                <p className="text-gray-600">{companyTagline}</p>
              </div>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <a
                      href={`mailto:${companyEmail}`}
                      className="text-blue-600 hover:underline"
                    >
                      {companyEmail}
                    </a>
                  </div>
                </div>

                {/* Teléfono */}
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Teléfono</p>
                    <a
                      href={`tel:${companyPhoneHref}`}
                      className="text-blue-600 hover:underline"
                    >
                      {companyPhoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Dirección */}
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Dirección</p>
                    <p className="text-gray-900">
                      {addressLine1}
                      <br />
                      {addressLine2}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mapa de Google */}
          <Card className="overflow-hidden">
            <CardContent className="p-0 h-full">
              <iframe
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                title="Ubicación de la empresa"
              ></iframe>
              {/* Para personalizar el mapa, actualiza VITE_GOOGLE_MAPS_EMBED_URL en tu archivo .env. */}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
