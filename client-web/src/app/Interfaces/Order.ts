import { product } from "./Product";
import { User } from "./User";

export interface Order {
  _id: string;
  author: User;
  products: product[];
  quantities: number[];
  total: number;
  state: string;
  CreatedAt: Date;
  paymentMethod: string;
  deleveryDate: string;
  phone: string;
  weight: number;
  freeSpace: string;
  orderAddress: string;
  view: boolean;
}
