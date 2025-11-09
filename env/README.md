# Variables de entorno

Este proyecto usa variables de entorno expuestas al cliente mediante `import.meta.env`. Para comenzar:

1. Copiá `env/.env.example` a un archivo que no se commitee, por ejemplo `.env.local`.
2. Colocá los valores reales en ese archivo.
3. Reiniciá el servidor de desarrollo (`npm run dev`) para que Vite cargue los nuevos valores.

## Detalle de cada variable y cómo obtenerla

| Variable | Uso en la aplicación | Cómo obtenerla |
| --- | --- | --- |
| `VITE_COMPANY_NAME` | Nombre mostrado en la tarjeta de contacto | Escribe el nombre comercial de tu empresa. |
| `VITE_COMPANY_TAGLINE` | Subtítulo bajo el nombre de la empresa | Define el eslogan corporativo con el que quieras presentarte. |
| `VITE_COMPANY_EMAIL` | Enlace `mailto:` en la sección de contacto | Utiliza la casilla de correo que atiende consultas comerciales. |
| `VITE_COMPANY_PHONE` | Enlace telefónico (`tel:`) en la sección de contacto | Ingresa el número telefónico principal en formato internacional, por ejemplo `5491122334455`. |
| `VITE_WHATSAPP_PHONE` | Genera el enlace `wa.me` del botón de WhatsApp en el hero | Usa el número de WhatsApp en formato internacional sin el signo `+`. Puedes copiarlo desde la app o desde [WhatsApp Business](https://business.whatsapp.com/). |
| `VITE_WHATSAPP_MESSAGE` | Mensaje precargado al abrir el chat de WhatsApp | Escribe el mensaje inicial que quieras enviar automáticamente al recibir consultas. |
| `VITE_COMPANY_ADDRESS_LINE1` | Primera línea de la dirección en la tarjeta de contacto | Completa con calle y número. |
| `VITE_COMPANY_ADDRESS_LINE2` | Segunda línea de la dirección en la tarjeta de contacto | Completa con ciudad, estado/provincia y código postal. |
| `VITE_GOOGLE_MAPS_EMBED_URL` | URL del iframe que muestra el mapa de tu ubicación | 1) Busca tu empresa en [Google Maps](https://maps.google.com). 2) Haz clic en **Compartir** → **Insertar un mapa**. 3) Copia el código HTML y extrae el valor del atributo `src` del `<iframe>`. |
| `VITE_GOOGLE_PLACES_API_KEY` | Solicitar reseñas reales de Google en la sección de clientes | Crea una clave en [Google Cloud Console](https://console.cloud.google.com/). Activa la **Places API** y restringe la clave para uso en tus dominios. |
| `VITE_GOOGLE_PLACE_ID` | Identificador del local para recuperar sus reseñas | Abre [Google Maps Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id). Busca tu negocio y copia el valor de `place_id`. |

> ℹ️ Recordá no subir tus archivos `.env` reales al repositorio.
