import {
  cartApiSlice,
  useClearCartMutation,
  useGetCartItemsInfoQuery,
  useRemoveFromCartMutation,
  useUpdateCartItemMutation,
} from "@/store/cart/api/cartApiSlice";
import { cartClearAll, cartItemChangeQuantity, cartItemRemove } from "@/store/cart/cartSlice";
import { getCartTotalQuantitySelector } from "@/store/cart/selectors/getCartTotalQuantitySelector";
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Cookies from "js-cookie";
import { useCallback } from "react";
import { clearGuestCart, getGuestCart, saveGuestCart } from "@/lib/guestCart";
import { toast } from "@/hooks/use-toast";

const useCart = () =>{
    const token = Cookies.get("accessToken");
    const isAuth = !!token;
    const dispatch = useAppDispatch();
    const [updateCartItemInDb] = useUpdateCartItemMutation();
    const [removeFromCartInDb] = useRemoveFromCartMutation();
    const [clearCartInDb] = useClearCartMutation();
    const {items  } = useAppSelector((state)=>state.cart);
    const cartTotalQuantity = useAppSelector(getCartTotalQuantitySelector);
    // const [{isLoading}] = usePlaceOrderMutation();
    const itemsIds = Object.keys(items);
    const {data:cartItemsInfo} = useGetCartItemsInfoQuery(itemsIds);
    const removeItemHandler = useCallback(
      (id: string) => {
        if(!isAuth){
          const guestCart = getGuestCart();
          delete guestCart[id];
          saveGuestCart(guestCart);
        } else {
          void removeFromCartInDb(id).unwrap().catch(() => {
            toast({
              variant: "destructive",
              description: "Failed to remove cart item. Please try again.",
            });
          });
        }
        dispatch(cartItemRemove(id));
      },
      [dispatch, isAuth, removeFromCartInDb]
    );
    const changeQuantityHandler = useCallback(
      (id: string, quantity: number) => {
        if(!isAuth){
          const guestCart = getGuestCart();
          if(quantity <= 0){
            delete guestCart[id];
          } else {
            guestCart[id] = quantity;
          }
          saveGuestCart(guestCart);
        } else {
          void updateCartItemInDb({ productId: id, quantity }).unwrap().catch(() => {
            toast({
              variant: "destructive",
              description: "Failed to update cart quantity. Please try again.",
            });
          });
        }
        dispatch(cartItemChangeQuantity({ id:id, quantity:quantity }));
      },
      [dispatch, isAuth, updateCartItemInDb]
    );
    const cartClearAllHandler = useCallback(
      () => {
        dispatch(cartApiSlice.util.invalidateTags(["CartItemsInfo"]));
        if(!isAuth){
          clearGuestCart();
        } else {
          void clearCartInDb().unwrap().catch(() => {
            toast({
              variant: "destructive",
              description: "Failed to clear cart. Please try again.",
            });
          });
        }
        dispatch(cartClearAll());
      },
      [dispatch, isAuth, clearCartInDb]
    );
    return { items ,  removeItemHandler , cartClearAllHandler , changeQuantityHandler , cartTotalQuantity, cartItemsInfo};
};
export default useCart;
