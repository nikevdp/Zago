const trim = (value?: string) => value?.trim() ?? "";
const digitsOnly = (value?: string) => value?.replace(/\D+/g, "") ?? "";
const telSanitize = (value?: string) => value?.replace(/[^0-9+]+/g, "") ?? "";

const companyName = trim(import.meta.env.VITE_COMPANY_NAME);
const companyTagline = trim(import.meta.env.VITE_COMPANY_TAGLINE);
const companyEmail = trim(import.meta.env.VITE_COMPANY_EMAIL);
const companyPhoneDisplay = trim(import.meta.env.VITE_COMPANY_PHONE);
const companyPhoneHref = telSanitize(companyPhoneDisplay);
const addressLine1 = trim(import.meta.env.VITE_COMPANY_ADDRESS_LINE1);
const addressLine2 = trim(import.meta.env.VITE_COMPANY_ADDRESS_LINE2);

const whatsappNumberRaw = trim(import.meta.env.VITE_WHATSAPP_PHONE);
const whatsappNumber = digitsOnly(whatsappNumberRaw);
const whatsappMessage = trim(import.meta.env.VITE_WHATSAPP_MESSAGE);

const googleMapsEmbedUrl = trim(import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL);
const googlePlaceId = trim(import.meta.env.VITE_GOOGLE_PLACE_ID);
const googlePlacesApiKey = trim(import.meta.env.VITE_GOOGLE_PLACES_API_KEY);

export const envConfig = {
  company: {
    name: companyName,
    tagline: companyTagline,
    email: companyEmail,
    phoneDisplay: companyPhoneDisplay,
    phoneHref: companyPhoneHref,
    addressLine1,
    addressLine2
  },
  whatsapp: {
    number: whatsappNumber,
    message: whatsappMessage
  },
  google: {
    mapsEmbedUrl: googleMapsEmbedUrl,
    placeId: googlePlaceId,
    placesApiKey: googlePlacesApiKey
  }
} as const;
