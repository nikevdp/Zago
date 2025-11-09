import { Mail, Phone, MapPin, Building2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { envConfig } from "../config/env";

export function Contact() {
  const {
    company: {
      name: companyName,
      tagline: companyTagline,
      email: companyEmail,
      phoneDisplay: companyPhoneDisplay,
      phoneHref: companyPhoneHref,
      addressLine1,
      addressLine2
    },
    google: { mapsEmbedUrl: googleMapsEmbedUrl }
  } = envConfig;
  const showContactHint =
    !companyName &&
    !companyTagline &&
    !companyEmail &&
    !companyPhoneDisplay &&
    !addressLine1 &&
    !addressLine2;
  return (
    <section id="contacto" className="py-20 px-4 bg-gray-50">
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
                <div className="bg-blue-600 text-white p-6 rounded-full">
                  <Building2 className="w-12 h-12" />
                </div>
              </div>
              
              <div className="text-center mb-8 space-y-2">
                {companyName && <h3 className="mb-0">{companyName}</h3>}
                {companyTagline && (
                  <p className="text-gray-600">{companyTagline}</p>
                )}
                {showContactHint && (
                  <p className="text-gray-500 text-sm">
                    Configurá los datos de contacto en tu archivo de variables de
                    entorno.
                  </p>
                )}
              </div>

              <div className="space-y-6">
                {/* Email */}
                {companyEmail ? (
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
                ) : null}

                {/* Teléfono */}
                {companyPhoneDisplay && companyPhoneHref ? (
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
                ) : null}

                {/* Dirección */}
                {addressLine1 || addressLine2 ? (
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Dirección</p>
                      <p className="text-gray-900">
                        {addressLine1}
                        {addressLine1 && addressLine2 && <br />}
                        {addressLine2}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>

          {/* Mapa de Google */}
          <Card className="overflow-hidden">
            <CardContent className="p-0 h-full">
              {googleMapsEmbedUrl ? (
                <iframe
                  src={googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  title="Ubicación de la empresa"
                ></iframe>
              ) : (
                <div className="h-full min-h-[400px] flex items-center justify-center px-6 text-center text-gray-500">
                  Configurá `VITE_GOOGLE_MAPS_EMBED_URL` para mostrar el mapa de tu
                  local.
                </div>
              )}
              {/* Para personalizar el mapa, actualiza VITE_GOOGLE_MAPS_EMBED_URL en tu archivo .env. */}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
