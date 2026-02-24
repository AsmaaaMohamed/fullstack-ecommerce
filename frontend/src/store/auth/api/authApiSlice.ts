
import { storeApiSlice } from "../../storeApiSlice";
import axios from "axios";
type TFormData = {
  email: string;
  password: string;
};
export const authApiSlice = storeApiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    authLogin: builder.mutation({
      queryFn: async (formData: TFormData) => {
        try {
          const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,formData);
          console.log("resssssss", res)
          return { data: res.data};
        } catch (err:any) {
          console.log("errrrrrrrrrrrrrrrrr",err.response);
           return { 
            error: {
              status: err.response?.status || 500,
              data: err.response?.data || { message: err.message },
            },
            };
        }
        
      },
      invalidatesTags: ["Wishlist","Orders","User"],
    }),
    authLogout: builder.mutation({
      queryFn: async () => {
        try {
          const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/logout`);
          return { data: res.data};
        } catch (err:any) {
          return { 
            error: {
              status: err.response?.status || 500,
              data: err.response?.data || { message: err.message },
            },
            };
        }
      },
      invalidatesTags: ["Wishlist", "User"],
    }),
  }),
});
export const { useAuthLoginMutation, useAuthLogoutMutation } =  authApiSlice;
