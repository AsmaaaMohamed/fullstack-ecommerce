import { cartApiSlice, useGetCartItemsInfoQuery } from "@/store/cart/api/cartApiSlice";
import { cartClearAll, cartItemChangeQuantity, cartItemRemove } from "@/store/cart/cartSlice";
import { getCartTotalQuantitySelector } from "@/store/cart/selectors/getCartTotalQuantitySelector";
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Cookies from "js-cookie";
import { useCallback } from "react";
import { clearGuestCart, getGuestCart, saveGuestCart } from "@/lib/guestCart";

const useCart = () =>{
    const token = Cookies.get("accessToken");
    const isAuth = !!token;
    const dispatch = useAppDispatch();
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
        }
        dispatch(cartItemRemove(id));
      },
      [dispatch, isAuth]
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
        }
        dispatch(cartItemChangeQuantity({ id:id, quantity:quantity }));
      },
      [dispatch, isAuth]
    );
    const cartClearAllHandler = useCallback(
      () => {
        dispatch(cartApiSlice.util.invalidateTags(["CartItemsInfo"]));
        if(!isAuth){
          clearGuestCart();
        }
        dispatch(cartClearAll());
      },
      [dispatch, isAuth]
    );
    return { items ,  removeItemHandler , cartClearAllHandler , changeQuantityHandler , cartTotalQuantity, cartItemsInfo};
};
export default useCart;
