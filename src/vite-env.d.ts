// <reference types="vite/client" />

declare module 'vite/client' {
  interface ImportMetaEnv {
    readonly VITE_COMPANY_NAME?: string
    readonly VITE_COMPANY_TAGLINE?: string
    readonly VITE_COMPANY_EMAIL?: string
    readonly VITE_COMPANY_PHONE?: string
    readonly VITE_WHATSAPP_PHONE?: string
    readonly VITE_WHATSAPP_MESSAGE?: string
    readonly VITE_COMPANY_ADDRESS_LINE1?: string
    readonly VITE_COMPANY_ADDRESS_LINE2?: string
    readonly VITE_GOOGLE_MAPS_EMBED_URL?: string
    readonly VITE_GOOGLE_PLACES_API_KEY?: string
    readonly VITE_GOOGLE_PLACE_ID?: string
  }
}
