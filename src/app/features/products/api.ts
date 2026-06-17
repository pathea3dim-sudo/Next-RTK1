import { ProductResponse, ProductType } from "@/lib/ecommerce/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const ecommerceApi=createApi({
    reducerPath: "ecommerce",
    baseQuery: fetchBaseQuery({baseUrl :"https://fakestoreapi.com"}),
    endpoints:(builder)=>({
        getAllProduct:builder.query<ProductResponse, {page:number; size:number}>({
            query:({page, size})=> '/products?page=${page}&size=${size}',
        }),
        getSingleProduct:builder.query<ProductType, string>({
            query:(uuid)=> '/product/${uuid}',
        }),
    }),
});

export const {useGetAllProductQuery,useGetSingleProductQuery}=ecommerceApi;
