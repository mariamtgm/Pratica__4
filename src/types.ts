export type Car = {
    id: string;
    brand: string;
    plate: string;
    seats: number;
    price: number;
    sellerId?: string;
};

export type Seller = {
    id: string;
    name: string;
    dni: string;
    concessionaireId?: string;
}

export type Concessionaire = {
    id: string;
    name: string;
    location: string;
    cif: string;
}