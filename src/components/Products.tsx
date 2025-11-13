import { useEffect, useState } from "react";

import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import productsJson from "./json/productos2.json";
import { ProductModal } from "./product";
import type {
  NormalizedCategory,
  NormalizedProduct,
  Productos2Category,
  Productos2Json,
} from "../types/products";

const productsData = productsJson as Productos2Json;

const EXTERNAL_IMAGE_REGEX = /^(https?:)?\/\//i;

const CATEGORY_ASSET_FOLDERS: Record<string, string> = {
  Alfombras: "alfombras",
  Escobillones: "escobillones",
  "Secadores de Piso": "secadores",
  Sopapas: "sopapas",
  "Plásticos": "plasticos",
};

const assetImports = import.meta.glob("../assets/**/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const slugify = (value: string, fallback: string) => {
  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  return normalized || fallback;
};

const getAssetFromCandidates = (candidates: (string | undefined)[]) => {
  for (const candidate of candidates) {
    if (!candidate) continue;
    if (assetImports[candidate]) {
      return assetImports[candidate];
    }
  }
  return undefined;
};

const resolveImageSource = (
  categoryName?: string,
  imagePath?: string
) => {
  if (!imagePath) return undefined;

  if (
    EXTERNAL_IMAGE_REGEX.test(imagePath) ||
    imagePath.startsWith("data:")
  ) {
    return imagePath;
  }

  const sanitizedFilename = imagePath
    .replace(/\\/g, "/")
    .trim()
    .replace(/^\/+/, "");

  const folder = categoryName ? CATEGORY_ASSET_FOLDERS[categoryName] : undefined;

  const candidates = new Set<string>();

  if (folder) {
    candidates.add(`../assets/${folder}/${sanitizedFilename}`);
  }

  if (sanitizedFilename.startsWith("assets/")) {
    candidates.add(`../${sanitizedFilename}`);
  } else if (sanitizedFilename.startsWith("../")) {
    candidates.add(sanitizedFilename);
  } else {
    candidates.add(`../assets/${sanitizedFilename}`);
  }

  return getAssetFromCandidates(Array.from(candidates));
};

const categories = (
  productsData.categorias?.filter(
    (category): category is Productos2Category =>
      Boolean(category?.categoria && category?.productos?.length)
  ) ?? []
).map((category, index) => ({
  ...category,
  categoria: category.categoria ?? `Categoría ${index + 1}`,
}));

const normalizedCategories: NormalizedCategory[] = categories.map(
  (category, index) => {
    const categoryId = slugify(category.categoria!, `categoria-${index}`);

    const normalizedProducts: NormalizedProduct[] = (
      category.productos ?? []
    )
      .filter((product) => product?.nombre)
      .map((product, productIndex) => {
        const productId = slugify(
          product.nombre ?? `${categoryId}-${productIndex}`,
          `${categoryId}-${productIndex}`
        );

        const specs = product.especificaciones
          ? Object.entries(product.especificaciones).map(([label, value]) => ({
              label,
              value,
            }))
          : undefined;

        const image = resolveImageSource(
          category.categoria,
          product.imagen?.src
        );

        return {
          id: productId,
          name: product.nombre ?? "Producto sin nombre",
          description: product.descripcion,
          image,
          imageAlt: product.imagen?.alt ?? product.nombre,
          specs,
        };
      });

    const coverImage = normalizedProducts.find(
      (product) => Boolean(product.image)
    )?.image;

    return {
      id: categoryId,
      name: category.categoria!,
      coverImage,
      products: normalizedProducts,
    };
  }
);

export function Products() {
  const [selectedCategory, setSelectedCategory] =
    useState<NormalizedCategory | null>(null);
  const [selectedProduct, setSelectedProduct] =
    useState<NormalizedProduct | null>(null);

  useEffect(() => {
    if (!selectedCategory) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCategory(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedCategory) {
      setSelectedProduct(null);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedCategory) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedCategory]);

  const openCategoryModal = (category: NormalizedCategory) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setSelectedProduct(null);
  };

  return (
    <section id="productos" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-12">Nuestros Productos</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {normalizedCategories.map((category) => (
            <Card
              key={category.id}
              className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg cursor-pointer"
              onClick={() => openCategoryModal(category)}
            >
              {category.coverImage ? (
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={category.coverImage}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex aspect-square w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-sm font-medium text-gray-500">
                  Sin imagen
                </div>
              )}
              <CardContent className="flex flex-1 flex-col p-4">
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-semibold">{category.name}</h3>
                  <p className="text-sm text-gray-500">
                    {category.products.length}{" "}
                    {category.products.length === 1 ? "producto" : "productos"}
                  </p>
                </div>

                <button
                  className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                >
                  Ver productos
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedCategory ? (
        <ProductModal
          selectedCategory={selectedCategory}
          selectedProduct={selectedProduct}
          onSelectProduct={(product) => setSelectedProduct(product)}
          closeModal={closeModal}
        />
      ) : null}
    </section>
  );
}
