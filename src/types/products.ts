export type Productos2Image = {
  src?: string;
  alt?: string;
};

export type Productos2Product = {
  nombre?: string;
  archivo_html?: string;
  imagen?: Productos2Image;
  descripcion?: string;
  especificaciones?: Record<string, string>;
};

export type Productos2Category = {
  categoria?: string;
  archivo_categoria?: string;
  productos?: Productos2Product[];
};

export type Productos2Json = {
  categorias?: Productos2Category[];
};

export type NormalizedProduct = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  specs?: { label: string; value: string }[];
};

export type NormalizedCategory = {
  id: string;
  name: string;
  coverImage?: string;
  products: NormalizedProduct[];
};
