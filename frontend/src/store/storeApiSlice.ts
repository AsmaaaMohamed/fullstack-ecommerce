// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = Cookies.get('accessToken');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    // console.log("headers in prepareHeaders", headers);
    return headers;
  },
});
// const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
//   // console.log(args) // request url, method, body
//   // console.log(api) // signal, dispatch, getState()
//   // console.log(extraOptions) //custom like {shout: true}
//   // initial request
//   let result = await baseQuery(args, api, extraOptions);
// console.log("result in baseQueryWithReauthhhhhhhhhhhhhhhhhhhhhhhhhhh", extraOptions);
//   if (result?.error?.status === 403) {
//     console.log('sending refresh token');
//     // need to call refresh api to get new access token
//     const refreshResult = await baseQuery('/api/auth/refresh', api, extraOptions);
//     if (refreshResult?.data) {
//       const { token } = refreshResult.data;
//       Cookies.set('token', token);
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       if (refreshResult?.error?.status === 403) {
//         refreshResult.error.data.message = 'Your login has expired.';
//       }
//       return refreshResult;
//     }
//   }
//   return result;
// };
// initialize an empty api service that we'll inject endpoints into later as needed
export const storeApiSlice = createApi({
  reducerPath: "StoreApi",
  baseQuery: baseQuery,
  tagTypes: ["Wishlist", "CartItemsInfo", "Orders", "User"],
  endpoints: () => ({}),
});
