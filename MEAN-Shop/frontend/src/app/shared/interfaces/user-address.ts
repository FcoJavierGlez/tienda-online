export interface UserAddress {
    _id: string,
    country: string,
    name: string,
    address: string,
    apartment?: string,
    phone: number,
    zipCode: number,
    city: string,
    province: string,
    nif: string,
    defaultAddress: boolean,
    createdAt?: string,
    updatedAt?: string
}
