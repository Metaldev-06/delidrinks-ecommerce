export interface FavoritesLocal {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
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
