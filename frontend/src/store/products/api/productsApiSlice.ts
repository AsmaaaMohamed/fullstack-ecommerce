import { storeApiSlice } from "../../storeApiSlice";
import axios from "axios";

export const productsApiSlice = storeApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      queryFn: async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
          return { data: response.data };
        } catch (error) {
          return { error: error };
        }
      },
    }),
  }),
});
export const { useGetProductsQuery } = productsApiSlice;
