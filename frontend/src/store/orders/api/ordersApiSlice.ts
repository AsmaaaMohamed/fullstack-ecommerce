import { TProduct } from "@/types";
import { storeApiSlice } from "../../storeApiSlice";

type TOrderApiItem = {
  _id: string;
  items: Array<{
    product: TProduct;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  createdAt: string;
};

export const ordersApiSlice = storeApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/api/orders",
        method: "GET",
      }),
      transformResponse: (response: {
        data?: { orders?: TOrderApiItem[] };
      }) => {
        const orders = response?.data?.orders ?? [];
        return orders.map((order) => ({
          id: order._id,
          items: order.items
            .filter((item) => item?.product)
            .map((item) => ({
              ...item.product,
              quantity: item.quantity,
              price: item.price,
            })),
          subtotal: order.subtotal,
          orderDate: order.createdAt,
        }));
      },
      providesTags: ["Orders"],
    }),
    placeOrder: builder.mutation({
      query: ({ items }: { items: Record<string, number> }) => ({
        url: "/api/orders",
        method: "POST",
        body: { items },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useGetOrdersQuery, usePlaceOrderMutation } = ordersApiSlice;
