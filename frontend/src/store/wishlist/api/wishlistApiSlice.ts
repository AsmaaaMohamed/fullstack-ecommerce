
import { storeApiSlice } from "../../storeApiSlice";

export const wishlistApiSlice = storeApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<any, void>({
      query: () => ({
        url: "/api/wishlist",
        method: "GET",
      }),
      providesTags: ["Wishlist"],
    }),
    likeToggle: builder.mutation({
      query: (productId: string) => ({
      url: "/api/wishlist/toggle",
      method: "POST",
      body: { productId },
    }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});
export const { useGetWishlistQuery, useLikeToggleMutation } = wishlistApiSlice;
