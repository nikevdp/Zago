import { useState } from "react";

import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type SubProduct = {
  id: string;
  name: string;
  image: string;
  description: string;
  features?: string[];
};

type ProductCategory = {
  id: string;
  name: string;
  coverImage: string;
  shortDescription: string;
  products: SubProduct[];
};

const productCategories: ProductCategory[] = [
  {
    id: "limpieza",
    name: "Línea de Limpieza Profesional",
    coverImage:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1080&q=80",
    shortDescription: "Soluciones que eliminan la suciedad más difícil sin dañar superficies.",
    products: [
      {
        id: "limpieza-1",
        name: "Desengrasante Alcalino",
        image:
          "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1080&q=80",
        description:
          "Remueve grasa y aceites en cocinas industriales manteniendo los estándares de higiene.",
        features: [
          "Fórmula concentrada de acción inmediata",
          "Seguro para acero inoxidable y cerámicos",
          "Aroma fresco que neutraliza olores",
        ],
      },
      {
        id: "limpieza-2",
        name: "Detergente Neutro Multiuso",
        image:
          "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1080&q=80",
        description:
          "Ideal para mantenimiento diario de pisos y superficies delicadas.",
        features: [
          "pH balanceado para uso continuo",
          "Secado rápido sin dejar marcas",
          "Biodegradable y libre de fosfatos",
        ],
      },
      {
        id: "limpieza-3",
        name: "Limpiavidrios Antiestático",
        image:
          "https://images.unsplash.com/photo-1616628182507-c3e8b3d13052?auto=format&fit=crop&w=1080&q=80",
        description:
          "Deja un acabado cristalino que repele el polvo hasta por 72 horas.",
        features: [
          "Secado sin vetas",
          "Protege contra manchas de lluvia",
          "Aplicador en spray de alto rendimiento",
        ],
      },
      {
        id: "limpieza-4",
        name: "Desinfectante Cuaternario",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1080&q=80",
        description:
          "Garantiza la eliminación del 99.9% de bacterias en áreas de alto tránsito.",
        features: [
          "Aprobado para la industria alimentaria",
          "Fragancia suave que perdura",
          "Funciona en frío y caliente",
        ],
      },
      {
        id: "limpieza-5",
        name: "Limpiador Desincrustante",
        image:
          "https://images.unsplash.com/photo-1616627567555-2ae88639690a?auto=format&fit=crop&w=1080&q=80",
        description:
          "Especializado en remover sarro y residuos calcáreos en baños y cocinas.",
        features: [
          "Acción espumante controlada",
          "Protege juntas y cerámicos",
          "Incluye dosificador ergonómico",
        ],
      },
    ],
  },
  {
    id: "mantenimiento",
    name: "Línea de Mantenimiento Industrial",
    coverImage:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1080&q=80",
    shortDescription: "Productos que prolongan la vida útil de maquinarias y herramientas.",
    products: [
      {
        id: "mantenimiento-1",
        name: "Lubricante de Alta Precisión",
        image:
          "https://images.unsplash.com/photo-1517434324-1db605ff03d9?auto=format&fit=crop&w=1080&q=80",
        description:
          "Reduce la fricción en sistemas mecánicos con una película protectora ultra delgada.",
        features: [
          "Resistente a temperaturas extremas",
          "Protección anticorrosiva",
          "Formato aerosol 360°",
        ],
      },
      {
        id: "mantenimiento-2",
        name: "Sellador de Roscas",
        image:
          "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1080&q=80",
        description:
          "Evita fugas en conexiones hidráulicas y neumáticas de alta presión.",
        features: [
          "Curado rápido en 10 minutos",
          "Resistente a vibraciones continuas",
          "Compatible con acero y latón",
        ],
      },
      {
        id: "mantenimiento-3",
        name: "Limpiador de Contactos",
        image:
          "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=1080&q=80",
        description:
          "Elimina residuos en tableros eléctricos sin dejar película conductiva.",
        features: [
          "Evaporación inmediata",
          "Seguro para plásticos sensibles",
          "Aprobado por normas IEC",
        ],
      },
      {
        id: "mantenimiento-4",
        name: "Grasa de Litio Multiuso",
        image:
          "https://images.unsplash.com/photo-1626777552725-659c23657a10?auto=format&fit=crop&w=1080&q=80",
        description:
          "Protege rodamientos y engranajes expuestos a cargas pesadas.",
        features: [
          "Excelente adherencia",
          "Impermeable a la humedad",
          "Mayor intervalo entre lubricaciones",
        ],
      },
      {
        id: "mantenimiento-5",
        name: "Aerosol Anticorrosivo",
        image:
          "https://images.unsplash.com/photo-1582719478250-ffd31bfb1fa7?auto=format&fit=crop&w=1080&q=80",
        description:
          "Genera una capa protectora contra ambientes salinos y químicos agresivos.",
        features: [
          "Duración de hasta 12 meses",
          "Aplicación uniforme",
          "No gotea ni mancha",
        ],
      },
    ],
  },
  {
    id: "seguridad",
    name: "Línea de Seguridad e Higiene",
    coverImage:
      "https://images.unsplash.com/photo-1516826432051-11bc946d7026?auto=format&fit=crop&w=1080&q=80",
    shortDescription: "Equipos de protección que garantizan el bienestar de tu equipo de trabajo.",
    products: [
      {
        id: "seguridad-1",
        name: "Guantes Anticorte Nivel 5",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1080&q=80",
        description:
          "Tejido de fibra Dyneema que ofrece la máxima resistencia con confort prolongado.",
        features: [
          "Transpirable y ergonómico",
          "Refuerzos en palma",
          "Lavable hasta 30 ciclos",
        ],
      },
      {
        id: "seguridad-2",
        name: "Protector Auditivo Reutilizable",
        image:
          "https://images.unsplash.com/photo-1580894906472-d9190cc172b0?auto=format&fit=crop&w=1080&q=80",
        description:
          "Reduce el ruido hasta 32 dB con ajuste personalizable y cómodo.",
        features: [
          "Incluye estuche de transporte",
          "Silicona hipoalergénica",
          "Certificación ANSI S3.19",
        ],
      },
      {
        id: "seguridad-3",
        name: "Mascarilla Filtrante N95",
        image:
          "https://images.unsplash.com/photo-1580281780460-82d277b0b018?auto=format&fit=crop&w=1080&q=80",
        description:
          "Filtro multicapa que retiene partículas ultrafinas sin dificultar la respiración.",
        features: [
          "Clip nasal ajustable",
          "Bordes termosellados",
          "Protección superior certificada",
        ],
      },
      {
        id: "seguridad-4",
        name: "Gafas de Seguridad Panorámicas",
        image:
          "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1080&q=80",
        description:
          "Visión amplia con recubrimiento antiempaño y tratamiento antirayaduras.",
        features: [
          "Compatible con casco y respirador",
          "Filtro UV400",
          "Incluye estuche rígido",
        ],
      },
      {
        id: "seguridad-5",
        name: "Chaleco Reflectivo Premium",
        image:
          "https://images.unsplash.com/photo-1520607162513-142993b0693b?auto=format&fit=crop&w=1080&q=80",
        description:
          "Alta visibilidad con franjas microprismáticas y bolsillos multifunción.",
        features: [
          "Tela resistente al desgarro",
          "Bandas elásticas laterales",
          "Ideal para jornadas nocturnas",
        ],
      },
    ],
  },
  {
    id: "oficina",
    name: "Línea Corporativa de Oficina",
    coverImage:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1080&q=80",
    shortDescription: "Complementos ergonómicos que mejoran el confort y la productividad diaria.",
    products: [
      {
        id: "oficina-1",
        name: "Silla Ergonómica Premium",
        image:
          "https://images.unsplash.com/photo-1587614382346-4ec892f9aca3?auto=format&fit=crop&w=1080&q=80",
        description:
          "Soporte lumbar dinámico con ajustes independientes en altura y reclinación.",
        features: [
          "Malla transpirable",
          "Reposacabezas ajustable",
          "Ruedas silenciosas de PU",
        ],
      },
      {
        id: "oficina-2",
        name: "Escritorio Regulable Eléctrico",
        image:
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1080&q=80",
        description:
          "Pasa de posición sentado a de pie con memoria para cuatro alturas.",
        features: [
          "Motor silencioso doble",
          "Sistema anticolisión",
          "Acabado melamínico antihuellas",
        ],
      },
      {
        id: "oficina-3",
        name: "Lámpara Led Inteligente",
        image:
          "https://images.unsplash.com/photo-1582719478250-ffd31bfb1fa7?auto=format&fit=crop&w=1080&q=80",
        description:
          "Iluminación regulable con control táctil y carga inalámbrica integrada.",
        features: [
          "Temperatura de color ajustable",
          "Puerto USB adicional",
          "Modo noche automático",
        ],
      },
      {
        id: "oficina-4",
        name: "Panel Acústico Decorativo",
        image:
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1080&q=80",
        description:
          "Reduce la reverberación en salas de reuniones sin sacrificar diseño.",
        features: [
          "Instalación modular",
          "Material ignífugo",
          "Colores personalizables",
        ],
      },
      {
        id: "oficina-5",
        name: "Kit de Videoconferencia 4K",
        image:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1080&q=80",
        description:
          "Incluye cámara panorámica, altavoz omnidireccional y control remoto.",
        features: [
          "Cancelación activa de ruido",
          "Conectividad plug & play",
          "Compatibilidad multiplataforma",
        ],
      },
    ],
  },
  {
    id: "logistica",
    name: "Línea de Logística y Almacenaje",
    coverImage:
      "https://images.unsplash.com/photo-1592813630413-1124aa7955eb?auto=format&fit=crop&w=1080&q=80",
    shortDescription: "Organización eficiente para optimizar cada metro cuadrado del depósito.",
    products: [
      {
        id: "logistica-1",
        name: "Carro Plataforma Plegable",
        image:
          "https://images.unsplash.com/photo-1580894906472-d9190cc172b0?auto=format&fit=crop&w=1080&q=80",
        description:
          "Estructura reforzada que soporta hasta 350 kg con ruedas silenciosas.",
        features: [
          "Manija abatible",
          "Cubierta antideslizante",
          "Ruedas de giro 360°",
        ],
      },
      {
        id: "logistica-2",
        name: "Organizador Modular Apilable",
        image:
          "https://images.unsplash.com/photo-1616628182507-c3e8b3d13052?auto=format&fit=crop&w=1080&q=80",
        description:
          "Bandejas transparentes para clasificar piezas y repuestos de forma rápida.",
        features: [
          "Sistema de cierre seguro",
          "Etiquetas intercambiables",
          "Fabricado en policarbonato",
        ],
      },
      {
        id: "logistica-3",
        name: "Estantería Heavy Duty",
        image:
          "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?auto=format&fit=crop&w=1080&q=80",
        description:
          "Soporta cargas de hasta 800 kg por nivel con acabado anticorrosivo.",
        features: [
          "Montaje sin herramientas",
          "Altura regulable",
          "Refuerzos transversales",
        ],
      },
      {
        id: "logistica-4",
        name: "Sistema de Picking Dinámico",
        image:
          "https://images.unsplash.com/photo-1520607162513-142993b0693b?auto=format&fit=crop&w=1080&q=80",
        description:
          "Canales inclinados que aceleran la preparación de pedidos con reposición frontal.",
        features: [
          "Rodillos de alta resistencia",
          "Configuración escalable",
          "Indicadores visuales integrados",
        ],
      },
      {
        id: "logistica-5",
        name: "Embaladora Retráctil",
        image:
          "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1080&q=80",
        description:
          "Sella y protege mercadería con envoltura térmica de manera uniforme.",
        features: [
          "Panel digital intuitivo",
          "Ahorro de hasta 30% en film",
          "Incluye mesa de apoyo",
        ],
      },
    ],
  },
];

export function Products() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(
    null,
  );
  const [selectedProduct, setSelectedProduct] = useState<SubProduct | null>(null);

  const handleOpenCategory = (category: ProductCategory) => {
    setSelectedCategory(category);
    setSelectedProduct(category.products[0]);
    setIsOpen(true);
  };

  const productFeatures = selectedProduct?.features ?? [];

  const handleDialogChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSelectedCategory(null);
      setSelectedProduct(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <section id="productos" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-12">Nuestros Productos</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {productCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleOpenCategory(category)}
                className="group block w-full text-left focus:outline-hidden focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                <Card className="overflow-hidden transition-shadow duration-300 group-hover:shadow-lg">
                  <div className="aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={category.coverImage}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="space-y-2 p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.shortDescription}
                    </p>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedCategory && selectedProduct ? (
        <DialogContent className="max-w-4xl space-y-6 sm:max-w-5xl">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-2xl font-semibold">
              {selectedCategory.name}
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              {selectedCategory.shortDescription}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 md:grid-cols-[240px_1fr]">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">
                Seleccioná un producto de la categoría
              </p>
              <div className="space-y-2">
                {selectedCategory.products.map((product) => {
                  const isActive = selectedProduct.id === product.id;

                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className={`w-full rounded-lg border px-4 py-3 text-left transition focus:outline-hidden focus:ring-2 focus:ring-primary/40 ${
                        isActive
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-transparent bg-gray-100 hover:border-primary/30 hover:bg-white"
                      }`}
                    >
                      <p className="text-sm font-semibold leading-snug">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div className="overflow-hidden rounded-xl border">
                <ImageWithFallback
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-64 w-full object-cover sm:h-80"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedProduct.name}
                </h3>
                <p className="text-gray-600">{selectedProduct.description}</p>

                {productFeatures.length > 0 ? (
                  <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                    {productFeatures.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
