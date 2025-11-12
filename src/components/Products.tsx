import { useEffect, useState } from "react";

import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import productsJson from "./json/products.json";
import { ProductModal } from "./product";
import type {
  NormalizedCategory,
  ProductCategory,
  ProductsJsonShape,
  SubProduct,
} from "../types/products";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=80";

const productsData = productsJson as ProductsJsonShape;

const EXTERNAL_IMAGE_REGEX = /^(https?:)?\/\//i;

const assetImports = import.meta.glob("../assets/**/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const normalizeAssetPath = (rawPath: string) => {
  const sanitized = rawPath.replace(/\\/g, "/").trim();
  if (!sanitized) return undefined;

  if (sanitized.startsWith("../assets/")) {
    return sanitized;
  }

  if (sanitized.startsWith("./")) {
    return normalizeAssetPath(sanitized.replace(/^\.\/+/, ""));
  }

  if (sanitized.startsWith("/")) {
    return normalizeAssetPath(sanitized.replace(/^\/+/, ""));
  }

  if (sanitized.startsWith("src/")) {
    return normalizeAssetPath(sanitized.replace(/^src\//, ""));
  }

  if (sanitized.startsWith("assets/")) {
    return `../${sanitized}`;
  }

  return sanitized.startsWith("../") ? sanitized : undefined;
};

const resolveImageSource = (imagePath?: string) => {
  if (!imagePath) return undefined;

  if (
    EXTERNAL_IMAGE_REGEX.test(imagePath) ||
    imagePath.startsWith("data:")
  ) {
    return imagePath;
  }

  const normalizedPath = normalizeAssetPath(imagePath);
  if (!normalizedPath) return undefined;

  return assetImports[normalizedPath];
};

const categories =
  productsData.productCategories ??
  productsData.products?.productCategories ??
  [];

const normalizedCategories: NormalizedCategory[] = categories.map(
  (category, index) => {
    const categoryImage =
      resolveImageSource(category.coverImage) ?? FALLBACK_IMAGE;

    return {
      id: category.id ?? `category-${index}`,
      name: category.name ?? "Categoría sin nombre",
      image: categoryImage,
      products: (category.products ?? []).map((product, productIndex) => ({
        ...product,
        id: product.id ?? `${category.id ?? index}-product-${productIndex}`,
        image:
          resolveImageSource(product.image) ??
          product.image ??
          categoryImage,
        description:
          product.description ??
          "Estamos preparando los detalles de este producto.",
      })),
    };
  }
);

export function Products() {
  const [selectedCategory, setSelectedCategory] =
    useState<NormalizedCategory | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<SubProduct | null>(
    null
  );

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
      return;
    }

    const firstProduct = selectedCategory.products.at(0) ?? null;
    setSelectedProduct(firstProduct);
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
    setSelectedProduct(category.products.at(0) ?? null);
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
              className="overflow-hidden transition-shadow duration-300 hover:shadow-lg cursor-pointer"
              onClick={() => openCategoryModal(category)}
            >
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="justify-i-center p-4">
                <h3 className="mb-2">{category.name}</h3>

                <button
                  className="mt-1 mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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
