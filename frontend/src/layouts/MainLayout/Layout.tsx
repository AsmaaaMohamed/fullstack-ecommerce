import { Footer, Header } from "@/components/common";
import{ ScrollToTop} from "@/components/common";
import FooterFeature from "@/components/common/Footer/FooterFeature/FooterFeature";
import { Toaster } from "@/components/ui/toaster";
import { clearGuestCart, getGuestCart } from "@/lib/guestCart";
import { useAppDispatch } from "@/store/hooks";
import { useMergeCartMutation } from "@/store/cart/api/cartApiSlice";
import { cartReplaceAll } from "@/store/cart/cartSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

const mapCartResponseToRecord = (response: any) => {
  const cartItems = response?.data?.cart?.items ?? [];
  return cartItems.reduce((acc: Record<string, number>, item: any) => {
    const productId = item?.product?._id ?? item?.product?.id;
    const quantity = Number(item?.quantity ?? 0);
    if (productId && quantity > 0) {
      acc[productId] = quantity;
    }
    return acc;
  }, {});
};

const Layout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [mergeCart] = useMergeCartMutation();
  const lastSyncedTokenRef = useRef<string | null>(null);
  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const guestCart = getGuestCart();

    if (!accessToken) {
      lastSyncedTokenRef.current = null;
      if (Object.keys(guestCart).length > 0) {
        dispatch(cartReplaceAll(guestCart));
      }
      return;
    }

    if (
      Object.keys(guestCart).length === 0 &&
      lastSyncedTokenRef.current === accessToken
    ) {
      return;
    }

    let isCancelled = false;
    const syncAuthCart = async () => {
      try {
        if (Object.keys(guestCart).length > 0) {
          const mergedResponse = await mergeCart(guestCart).unwrap();
          if (isCancelled) {
            return;
          }
          const mergedItems = mapCartResponseToRecord(mergedResponse);
          dispatch(cartReplaceAll(mergedItems));
          clearGuestCart();
          lastSyncedTokenRef.current = accessToken;
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );

        if (isCancelled) {
          return;
        }

        const cartFromDb = mapCartResponseToRecord(response.data);
        dispatch(cartReplaceAll(cartFromDb));
        lastSyncedTokenRef.current = accessToken;
      } catch {
        // Keep current cart state if sync fails.
      }
    };

    syncAuthCart();

    return () => {
      isCancelled = true;
    };
  }, [dispatch, location.pathname, mergeCart]);


  return (
    <>
      <Header />
      <Outlet />
      <ScrollToTop />
      <Toaster />
      <FooterFeature/>
      <Footer />
    </>
  );
};
export default Layout;
