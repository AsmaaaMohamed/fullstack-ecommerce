import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, ShoppingBag, WalletMinimal } from 'lucide-react';
import { ordersColumns } from "./ordersColumn";
import { DataTable } from "../Cart/data-table";
import { useEffect, useState } from "react";
import { DialogDescription, DialogHeader,Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CartItemInMenu from "@/components/ecommerce/cart/CartItemInMenu/CartItemInMenu";
import { TProduct } from "@/types";
import { useGetOrdersQuery } from "@/store/orders/api/ordersApiSlice";
// import { useAuthLogoutMutation} from "@/store/auth/api/authApiSlice";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useCart from "@/hooks/useCart";

const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const{data:orderList}= useGetOrdersQuery(undefined);
  // const[authLogout,{error} ] = useAuthLogoutMutation();
  const[orderDetails , setOrderDetails] = useState<TProduct[]>([]);
  const { cartClearAllHandler } = useCart();
  const navigate = useNavigate();
  const username= Cookies.get('username');
  useEffect(() => {
    if (window.location.hash === "#_=_") {
      window.history.replaceState(
        null,
        document.title,
        window.location.pathname + window.location.search
      );
    }
  }, []);
  const modalHandler = ()=>{
    setIsOpen(!isOpen);
  }
  const logoutHandler = ()=>{
        try {
          Cookies.remove('accessToken');
          Cookies.remove('username');
          cartClearAllHandler();
          navigate("/login");
        }
        catch(error){
          // console.log('eroooooooooor' , error);
          toast({
            variant: "destructive",
            description: String(error),
          });
        };
  };
 
  const orderListWithSetter = orderList?.map((item)=>{
    return {
      id:item.id,
      items:{
        items:item.items,
        setOrderDetails,
        modalHandler
      },
      orderDate:item.orderDate,
      subtotal:item.subtotal,      
    }
  }) ?? [];
  const renderedOrderItems = orderDetails?.map((item, index) => {
    const itemId = item._id ?? (item as any).id ?? index;
    return <CartItemInMenu key={`${itemId}-${index}`} {...item} forOrderDetails={true} />;
  });
  return (
    <div className="account-tab-area-start rts-section-gap py-[60px]">
      <div className="container !max-w-[1350px]">
        <Tabs defaultValue="dashboard" className="w-full flex flex-wrap">
          <TabsList className="grid w-full grid-cols-1 md-992:w-1/4 bg-transparent h-auto max-h-[200px]">
            <TabsTrigger value="dashboard" className="data-[state=active]:!bg-primary data-[state=active]:!text-white text-secondary flex justify-normal py-[14px] px-[25px] mb-[10px] border border-solid border-[#E2E2E2] text-base items-center gap-[15px] "><WalletMinimal size="20"/> Dashboard</TabsTrigger>
             <TabsTrigger value="order" className="data-[state=active]:!bg-primary data-[state=active]:!text-white text-secondary flex justify-normal py-[14px] px-[25px] mb-[10px] border border-solid border-[#E2E2E2] text-base items-center gap-[15px]"><ShoppingBag size="20" />Order</TabsTrigger>
            <TabsTrigger value="logout" className="data-[state=active]:!bg-primary data-[state=active]:!text-white flex text-secondary justify-normal py-[14px] px-[25px] mb-[10px] border border-solid border-[#E2E2E2] text-base items-center gap-[15px]" onClick={logoutHandler}><LogOut size="20"/>Logout</TabsTrigger>
          </TabsList>
          <div className="md-992:w-3/4 md-992:pl-[50px] sm:pl-[10px] pl-[10px] md:pt-0 pt-[30px]">
            <TabsContent value="dashboard" className="m-0">
              <Card className="border-none shadow-none">
                <CardHeader className="p-0">
                  <CardTitle>Hello {username}! </CardTitle>
                  <CardDescription>
                    From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
                  </CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
             <TabsContent value="order" className="m-0">
              <Card className="border-none shadow-none">
                <CardHeader className="p-0">
                  <CardTitle>Your Orders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 p-0">
                  <div className="space-y-1">
                    <DataTable columns={ordersColumns} data={orderListWithSetter} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <Dialog open={isOpen} onOpenChange={modalHandler} >
              <DialogContent className=" p-[30px] gap-0">
                <DialogHeader>
                  <DialogTitle className="mb-0 text-[28px]">Order Details</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                    {renderedOrderItems}
              </DialogContent>
            </Dialog>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;
