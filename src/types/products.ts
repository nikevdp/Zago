export type SubProduct = {
  id: string;
  name: string;
  image: string;
  description: string;
  features?: string[];
};

export type ProductCategory = {
  id: string;
  name: string;
  coverImage: string;
  products: SubProduct[];
};

export type ProductsJsonShape = {
  productCategories?: ProductCategory[];
  products?: {
    productCategories?: ProductCategory[];
  };
};

export type NormalizedCategory = {
  id: string;
  name: string;
  image: string;
  products: SubProduct[];
};
