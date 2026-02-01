
import { storeApiSlice } from "../../storeApiSlice";

type TFormData = {
  email: string;
  password: string;
};
export const authApiSlice = storeApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    authLogin: builder.mutation({
      queryFn: async (formData: TFormData) => {
        const { data, error } = {}
        // console.log(data);
        if (error) {
          throw error; // RTK Query expects errors to be returned, not thrown
        }

        return { data };
      },
      invalidatesTags: ["Wishlist","Orders","User"],
    }),
    authLogout: builder.mutation({
      queryFn: async () => {
        const { error } = {};
        if (error) {
          throw error;
        }
        return { data: null };
      },
      invalidatesTags: ["Wishlist", "User"],
    }),
  }),
});
export const { useAuthLoginMutation, useAuthLogoutMutation } =  authApiSlice;
