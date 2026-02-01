
import { TProduct } from "@/types";
import { storeApiSlice } from "../../storeApiSlice";

export const ordersApiSlice = storeApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      queryFn: async () => {
        const { data, error } = {}
        // console.log(data);

        if (error) {
          throw error; // RTK Query expects errors to be returned, not thrown
        }
        const items = data?.map((el) => {
          return {
            id: el.id,
            items: el.order_items.map(({ products, quantity }) => {
              return { ...products, quantity: quantity };
            }),
            subtotal: el.subtotal,
            orderDate: el.order_date,
          };
        });
        return { data: items };
      },
      providesTags: ["Orders"],
    }),
    placeOrder: builder.mutation({
      queryFn: async ({
        cartItemsInfo,
        cartSubTotal,
        items,
      }: {
        cartItemsInfo: TProduct[];
        cartSubTotal: number;
        items: { [key: string]: number };
      }) => {
        const { data } =  {}
        const insertOrder = {}
          
        if (insertOrder.error) return { error: insertOrder.error };
        const orderItemsRows = cartItemsInfo.map((el) => ({
          product_id: el.id,
          quantity: items[el.id],
          order_id: insertOrder.data[0].id,
        }));
        // console.log(orderItemsRows);
        const insertOrderItems = {};
        if (insertOrderItems.error) throw insertOrderItems.error;
        return { data: { id: insertOrder.data[0].id } };
      },
    }),
  }),
});
export const { useGetOrdersQuery, usePlaceOrderMutation } = ordersApiSlice;
