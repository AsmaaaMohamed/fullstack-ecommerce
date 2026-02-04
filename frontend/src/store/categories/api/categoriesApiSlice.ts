
import axios from "axios";
import { storeApiSlice } from "../../storeApiSlice";

export const categoriesApiSlice = storeApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      queryFn: async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);
          return { data: response.data.data.categories };
        } catch (error) {
          return { error: error };
        }
      },
    }),
  }),
});
export const { useGetCategoriesQuery } = categoriesApiSlice;
