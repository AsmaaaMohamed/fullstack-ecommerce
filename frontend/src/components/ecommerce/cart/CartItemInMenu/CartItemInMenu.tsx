import useCart from "@/hooks/useCart";
import { TProduct } from "@/types";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { formatPrice, selectCurrency } from "@/lib/currency";

type TCartItemInMenu = TProduct & {
  id?: string;
  forOrderDetails?: boolean;
};

const CartItemInMenu = ({id, _id, name  , price , img, quantity , forOrderDetails=false}:TCartItemInMenu) => {
  const {removeItemHandler} = useCart();
  const currency = useAppSelector(selectCurrency);
  const imageSrc = img?.startsWith("http")
    ? img
    : `${import.meta.env.VITE_BACKEND_URL}${img ?? ""}`;
  const itemId = id ?? _id;
  const formattedPrice = formatPrice(Number(price ?? 0), currency);
  return (
    <div
      className={`border-t flex items-center justify-between relative py-[25px] border-b border-solid border-[#E2E2E2] gap-[5px]`}
    >
      <div className={`flex items-center gap-[15px]`}>
        <div className={`max-w-[75px]`}>
          <img src={imageSrc} alt={name} />
        </div>
        <div className={`mr-[30px]`}>
          <Link to="shop-details.html">
            <h5 className={`font-semibold mb-[7px]`}>
              {name}
            </h5>
          </Link>
          <div
            className={`flex items-center font-normal text-[12px] gap-[5px]`}
          >
            {quantity} <X size="20px" strokeWidth="1" />
            <span className="font-medium text-red-700">{formattedPrice}</span>
          </div>
        </div>
      </div>
      {!forOrderDetails &&
       <div
        className={`flex items-center justify-center right-0 absolute cursor-pointer h-[20px] w-[20px] border border-solid border-[#E2E2E2] bg-[#F3F4F6] top-[25px]`}
        onClick={()=> itemId && removeItemHandler(itemId)}
      >
        <X size="20px" strokeWidth="1" />
      </div>}
    </div>
  );
};

export default CartItemInMenu;
