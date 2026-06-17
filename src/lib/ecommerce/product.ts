

export interface ProductType{
    uuid:string;
    name:string;
    price:number;
    category:string;
    description:string;
    image:string;
    slug?:string;
}



export interface ProductResponse{
    content: ProductType[];
    totalPages:number;
    totalElements:number;
    size: number;
    number:number;
}