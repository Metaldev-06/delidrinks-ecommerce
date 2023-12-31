// Generated by https://quicktype.io

export interface AddressBody {
  id: string;
  province: string;
  postal_code: string;
  city: string;
  address: string;
  observations: string;
  primary: boolean;
  name: string;
  users_permissions_users: string;
}

// Generated by https://quicktype.io

export interface AddressResponse {
  data: Data;
  meta: Meta;
}

export interface Data {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  province: string;
  postal_code: string;
  city: string;
  address: string;
  observations: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  primary: boolean;
  name: string;
}

export interface Meta {}
