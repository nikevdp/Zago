import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import productsJson from "./json/products.json";

type SubProduct = {
  id: string;
  name: string;
  image: string;
  description: string;
};

type ProductCategory = {
  id: string;
  name: string;
  coverImage: string;
  shortDescription: string;
  products: SubProduct[];
};

type ProductsJsonShape = {
  productCategories?: ProductCategory[];
  products?: {
    productCategories?: ProductCategory[];
  };
};

const productsData = productsJson as ProductsJsonShape;

const categories =
  productsData.productCategories ??
  productsData.products?.productCategories ??
  [];

const products = categories.map((category, index) => ({
  id: category.id ?? `category-${index}`,
  name: category.name,
  description: category.shortDescription,
  image: category.coverImage,
}));

export function Products() {
  return (
    <section id="productos" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-12">Nuestros Productos</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="mb-2">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

