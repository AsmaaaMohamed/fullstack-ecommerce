
import { storeApiSlice } from "../../storeApiSlice";

type TDataType = "itemsInfo" | "itemsIds";
export const wishlistApiSlice = storeApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      queryFn: async (dataType: TDataType) => {
        const { data, error } = {}
        // console.log(data)
        if (error) {
          throw error; // RTK Query expects errors to be returned, not thrown
        }
        if (!data?.length) {
          return { data: [] };
        }
        const concatenatedItemsId = data?.map((el) => el.productId);
        // console.log(concatenatedItemsId)
        if (dataType === "itemsIds") {
          return { data: concatenatedItemsId };
        } else {
          // console.log('ssssssssssssssssssssssss')
          const { data, error } = {}
          if (error) throw error;
          return { data };
        }
      },
      providesTags: ["Wishlist"],
    }),
    likeToggle: builder.mutation({
      queryFn: async (id: number) => {
        const { data: isRecordExist, error } = {}
        if (error) throw error;
        if (isRecordExist?.length) {
          const { error } = {}
          if (error) return { error };
          return { data: { type: "remove", id } };
        } else {
          const { data } = {}
          const { error } = {}
          if (error) throw error;
          return { data: { type: "add", id } };
        }
      },
      invalidatesTags: ["Wishlist"],
    }),
  }),
});
export const { useGetWishlistQuery, useLikeToggleMutation } = wishlistApiSlice;
