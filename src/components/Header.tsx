import { useState, useEffect } from "react";
import ASCARlogo from "../assets/ASCAlogo.jpeg";

const navItems = [
  { name: "Inicio", href: "#inicio" },
  { name: "Nuestros Productos", href: "#productos" },
  { name: "Nuestros Clientes", href: "#clientes" },
  { name: "Contacto", href: "#contacto" }
];

export function Header() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detectar sección activa
      const sections = ["inicio", "productos", "clientes", "contacto"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      const offset = 50; // Altura del header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <img src={ASCARlogo} alt="ASCAR Logo" className="h-12 w-auto" />
          {/* Navegación */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`transition-colors relative ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Menú móvil */}
          <div className="md:hidden">
            <select
              value={`#${activeSection}`}
              onChange={(e) => scrollToSection(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {navItems.map((item) => (
                <option key={item.name} value={item.href}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
