// Generated by https://quicktype.io

export interface Product {
  data: ProductDatum[];
  meta: Meta;
}

export interface ProductDatum {
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  price: number;
  stock: number;
  weight: string;
  offer: number;
  image: Image;
  brand: Brand;
  category: Brand;
  color?: string;
  review: string;
  quantity?: number;
}

export interface Brand {
  data: Data;
}

export interface Data {
  id: number;
  attributes: DataAttributes;
}

export interface DataAttributes {
  name: string;
}

export interface Image {
  data: ImageDatum[];
}

export interface ImageDatum {
  id: number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  url: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
