import { useEffect, useRef } from "react";

type Props = {
  appId: string; // el "YOUR_APP_ID" de Elfsight
};

export default function Reviews({ appId }: Props) {
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    // Si el script ya existe, no lo vuelvas a agregar
    if (!document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
      const s = document.createElement("script");
      s.src = "https://static.elfsight.com/platform/platform.js";
      s.defer = true;
      s.setAttribute("data-use-service-core", "");
      document.body.appendChild(s);
    }
  }, []);

  return <div className={`elfsight-app-${appId}`} data-elfsight-app-lazy />;
}
