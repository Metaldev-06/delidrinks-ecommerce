// Generated by https://quicktype.io

export interface Category {
  data: CategoryDatum[];
  meta: Meta;
}

export interface CategoryDatum {
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  name: string;
  slug: string;
  brands: Brands;
}

export interface Brands {
  data: BrandsDatum[];
}

export interface BrandsDatum {
  id: number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  name: string;
  slug: string;
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
