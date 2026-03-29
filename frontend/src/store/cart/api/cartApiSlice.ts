import { storeApiSlice } from "../../storeApiSlice";
import axios from "axios";
import Cookies from "js-cookie";

export const cartApiSlice = storeApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartItemsInfo: builder.query({
      queryFn: async (productIds = [], api) => {
        try {
          const token = Cookies.get("accessToken");

          if (token) {
            const response = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
                withCredentials: true,
              }
            );

            const cartItems = response?.data?.data?.cart?.items ?? [];
            const mappedItems = cartItems
              .filter((item: any) => item?.product)
              .map((item: any) => ({
                ...item.product,
                quantity: item.quantity,
              }));

            return { data: mappedItems };
          }

          if (!Array.isArray(productIds) || productIds.length === 0) {
            return { data: [] };
          }

          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products`
          );

          const allProducts = response?.data?.data?.products ?? [];
          const cartItems = (api.getState() as any)?.cart?.items ?? {};
          const selectedProductIds = new Set(productIds.map(String));

          const mappedItems = allProducts
            .filter((product: any) =>
              selectedProductIds.has(String(product?._id ?? product?.id))
            )
            .map((product: any) => ({
              ...product,
              quantity:
                Number(cartItems[product._id] ?? cartItems[product.id]) || 0,
            }));

          return { data: mappedItems };
        } catch (error: any) {
          return {
            error: {
              status: error?.response?.status ?? 500,
              data: error?.response?.data ?? "Failed to fetch cart items",
            },
          };
        }
      },
      providesTags: ["CartItemsInfo"],
    }),
    addToCart: builder.mutation({
      query: (productId) => ({
        url: "/api/cart/add",
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["CartItemsInfo"],
    }),
    mergeCart: builder.mutation({
      query: (items) => ({
        url: "/api/cart/merge",
        method: "POST",
        body: { items },
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
export const { useGetCartItemsInfoQuery, useMergeCartMutation } = cartApiSlice;
