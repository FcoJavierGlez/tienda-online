export interface Product {
    _id?: string,
    name: string,
    vendor?: string,
    description: string,
    images: string[],
    price: number,
    quantity: number,
    discount: number,
    tags?: string[],
    createdAt?: string,
    updatedAt?: string
}
