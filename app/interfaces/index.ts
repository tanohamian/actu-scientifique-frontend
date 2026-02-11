import { Categories } from "../admin/page";
import { OrderStatus, Rubriques } from "../enum/enums";

export interface Product {
    title?: string
    id: string,
    name: string
    categories: Categories
    price: number
    preview_image: string
    description?: string
    createdAt: Date | string
    stock: number
}

export interface Bourse {
    id?: string;
    title: string;
    lien: string;
    description: string;
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Formation {
    id?: string;
    title: string;
    lien: string;
    description: string;
    date: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface ITraining {
    id?: string;
    title: string;
    lien: string;
    description: string;
    date: string;
    type: 'CLASSIC' | 'ACADEMY';
}

export interface OrderInterface {
    id: string
    totalAmount: number
    status: OrderStatus
    email: string
    items: [
        {
            quantity: string,
            product: {
                name: string,
                categories: string[]
            }
        }
    ]
    createdAt: Date
    updatedAt: Date
}

export interface FeedInterface {
    id?: string
    title?: string;
    url?: string;
    description?: string;
    type?: string;
}

export interface Newsletter {
    id?: string;
    title: string;
    categorie?: string;
    content?: string;
    createdAt: string | Date;
}

export interface Article {
    id?: string;
    title: string;
    illustrationUrl?: string;
    content: string;
    rubrique?: Rubriques;
    createdAt?: Date | string
    une?: boolean
    withToken?: boolean
}

export interface DbMedia {
    id: string;
    title: string;
    name: string;
    rubrique: Rubriques;
    mimeType: string;
    url: string;
    description: string;
    createdAt: Date | string;
    type: string;
    une?: boolean
    withToken?: boolean
}

export interface DbArticle {
    id: string
    title: string
    content: string
    rubrique: Rubriques
    illustrationUrl?: string;
    une: boolean
    createdAt: Date | string
}
export interface Stat{
    id: string;
    endpoint: string
    createdAt: Date | string
}
export interface OrderPayload {
    productId: string,
    quantity: number
}