// Generated by https://quicktype.io

export interface CheckoutResponse {
  data: Data;
  meta: Meta;
}

export interface Data {
  id: number;
  attributes: PaymentAttributes;
}

export interface PaymentAttributes {
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  slug: string;
  shipping_method: ShippingMethod;
  products: Product[];
}

type ShippingMethod =
  | 'motomandado'
  | 'retiro en puerta'
  | 'envio'
  | 'a domicilio'
  | 'en sucursal';

export interface Product {
  id: number;
  slug: string;
  quantity: number;
}

export interface Meta {}

// Generated by https://quicktype.io

export interface PaymentBody {
  data: Data;
}

export interface Data {
  products: Product[];
  users_permissions_user: number;
  completed: boolean;
  name: string;
  slug: string;
  addresses: number[];
  phones: number[];
  shipping_method: ShippingMethod;
}

export interface Product {
  slug: string;
  id: number;
  quantity: number;
}
