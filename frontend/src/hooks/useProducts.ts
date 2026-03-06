import { useAppSelector } from "@/store/hooks";
import { useGetProductsQuery } from "@/store/products/api/productsApiSlice";
import { useGetWishlistQuery } from "@/store/wishlist/api/wishlistApiSlice";
import Cookies from "js-cookie";
import {useMemo } from "react";

const useProducts=()=>{
    const{data:products ,isLoading, error } = useGetProductsQuery(undefined);
    const cartItems = useAppSelector((state) => state.cart.items);
    const {data:wishList} = useGetWishlistQuery();
    const wishListItemsIds = wishList.data?.ids;
    const userAccessToken = Cookies.get('accessToken'); // Adjust the key if your token is stored under a different name
    const productsWithQuantityAndLiked =  useMemo(()=>products?.map((el) => ({
      ...el,
      quantity: cartItems[el.id] ?? 0,
      isLiked: wishListItemsIds?.includes(el._id),
      isAuthenticated : userAccessToken ? true : false
    })) ?? [],[products,cartItems,wishListItemsIds]);
    return {isLoading , error , products , productsWithQuantityAndLiked};
};
export default useProducts;