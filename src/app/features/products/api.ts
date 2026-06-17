
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from "../../types/product";   // adjust path if needed

export const ecommerceApi = createApi({
  reducerPath: 'ecommerceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      transformResponse: (raw: Product[]) =>
        raw.map((p) => ({
          ...p,
          slug: p.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, ''),
        })),
    }),
  }),
});

export const { useGetProductsQuery } = ecommerceApi;