
import { storeApiSlice } from "../../storeApiSlice";
import { addToCart } from "../cartSlice";

export const cartApiSlice = storeApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartItemsInfo: builder.query({
      query: () => ({
        url: "/api/cart",
        method: "GET",
      }),
      providesTags: ["CartItemsInfo"],
    }),
    addToCart: builder.mutation({
      query: (productId) => ({
        url: "/api/cart",
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["CartItemsInfo"],
    }),
     removeFromCart: builder.mutation({
      query: (productId) => ({
        url: `/api/cart/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CartItemsInfo"],
  }),
  clearCart: builder.mutation({
    query: () => ({
      url: "/api/cart",
      method: "DELETE",
    }),
    invalidatesTags: ["CartItemsInfo"],
  }),
}),
});
export const { useGetCartItemsInfoQuery } = cartApiSlice;
