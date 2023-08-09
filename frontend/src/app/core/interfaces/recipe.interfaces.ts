// Generated by https://quicktype.io

export interface Recipe {
  data: RecipeDatum[];
  meta: Meta;
}

export interface RecipeDatum {
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  score: number;
  difficulty: number;
  image: Image;
  categories: Categories;
}

export interface Categories {
  data: CategoriesDatum[];
}

export interface CategoriesDatum {
  id: number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  name: string;
}

export interface Image {
  data: ImageDatum;
}

export interface ImageDatum {
  id: number;
  attributes: TentacledAttributes;
}

export interface TentacledAttributes {
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
