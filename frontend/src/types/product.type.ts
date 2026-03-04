export type TProduct = {
    _id:string;
    name: string;
    weight?:string;
    price:number;
    discount?:number;
    img?:string;
    quantity?: number;
    inStock?: number;
    isLiked?:boolean;
    isAuthenticated?:boolean
}