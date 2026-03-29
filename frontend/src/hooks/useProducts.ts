import { useAppSelector } from "@/store/hooks";
import { useGetProductsQuery } from "@/store/products/api/productsApiSlice";
import { useGetWishlistQuery } from "@/store/wishlist/api/wishlistApiSlice";
import Cookies from "js-cookie";
import {useMemo } from "react";

const useProducts=()=>{
    const{data:products ,isLoading, error } = useGetProductsQuery(undefined);
    const cartItems = useAppSelector((state) => state.cart.items);
    const userAccessToken = Cookies.get('accessToken'); // Adjust the key if your token is stored under a different name
    const {data:wishList} = useGetWishlistQuery(undefined, {skip: !userAccessToken}); // to not try get wishlist unless user login
    const wishListItemsIds = wishList?.data?.ids;
    
    const productsWithQuantityAndLiked =  useMemo(()=>products?.map((el: any) => {
      const productId = el._id ?? (el as any).id;
      return {
        ...el,
        quantity: cartItems[productId] ?? 0,
        isLiked: wishListItemsIds?.includes(el._id),
        isAuthenticated : userAccessToken ? true : false
      };
    }) ?? [],[products,cartItems,wishListItemsIds]);
    return {isLoading , error , products , productsWithQuantityAndLiked};
};
export default useProducts;
