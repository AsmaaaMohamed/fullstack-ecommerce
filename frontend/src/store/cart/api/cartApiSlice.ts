
import { storeApiSlice } from "../../storeApiSlice";

export const cartApiSlice = storeApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartItemsInfo: builder.query({
      query: (productId) => ({
        url: "/api/cart",
        method: "GET",
        body: { productId },
      }),
      providesTags: ["CartItemsInfo"],
    }),
  }),
});
export const { useGetCartItemsInfoQuery } = cartApiSlice;
