
import { storeApiSlice } from "../../storeApiSlice";
type TFormData = {
  email: string;
  password: string;
};
export const authApiSlice = storeApiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    authLogin: builder.mutation({
      query:(credentials: TFormData) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ["Wishlist","Orders","User"],
    }),
    authLogout: builder.mutation({
      query: () => ({
        url: '/api/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ["Wishlist", "User"],
    }),
  }),
});
export const { useAuthLoginMutation, useAuthLogoutMutation } =  authApiSlice;
