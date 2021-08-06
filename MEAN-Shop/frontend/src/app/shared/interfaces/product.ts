import { Description } from "./description";

export interface Product {
    _id?: string,
    name: string,
    vendor?: string,
    description: Description[],
    images: string[],
    price: number,
    quantity: number,
    discount: number,
    tags?: string[],
    createdAt?: string,
    updatedAt?: string
}
