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
  shortDescription: string;
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
  description: string;
  image: string;
  products: SubProduct[];
};
