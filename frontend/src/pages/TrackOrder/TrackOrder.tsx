import NavigationBreadcrumb from "@/components/common/NavigationBreadcrumb/NavigationBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice, selectCurrency } from "@/lib/currency";
import { useAppSelector } from "@/store/hooks";
import { useGetOrdersQuery } from "@/store/orders/api/ordersApiSlice";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const orderSteps = [
  "Ordered",
  "Shipped",
  "Out of Delivery",
  "Delivered",
];

const getCurrentStep = (status: string) => {
  switch (status) {
    case "paid":
      return 1;
    case "shipped":
      return 2;
    case "delivered":
      return 3;
    case "cancelled":
      return -1;
    case "pending":
    default:
      return 0;
  }
};

const getArrivalLabel = (orderDate: string, currentStep: number) => {
  const arrivalDate = new Date(orderDate);
  arrivalDate.setDate(arrivalDate.getDate() + Math.max(1, 4 - currentStep));
  return `Arriving ${arrivalDate.toLocaleDateString("en-US", {
    weekday: "long",
  })}`;
};

const TrackOrder = () => {
  const currency = useAppSelector(selectCurrency);
  const { data: orders = [], isLoading } = useGetOrdersQuery(undefined);

  return (
    <>
      <NavigationBreadcrumb pageTitle="Track Order" />
      <div className="bg-[#F3F4F6] py-[60px]">
        <div className="container">
          <div className="mb-[25px]">
            <h2 className="mb-[8px] text-[32px] font-bold text-secondary">
              Track Your Orders
            </h2>
            <p className="m-0 text-muted">
              Check the latest status of your recent purchases.
            </p>
          </div>

          {isLoading ? (
            <Card className="border-none shadow-none">
              <CardContent className="p-[30px] text-muted">
                Loading your orders...
              </CardContent>
            </Card>
          ) : orders.length === 0 ? (
            <Card className="border-none shadow-none">
              <CardContent className="p-[30px] text-muted">
                No orders found yet.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-[20px]">
              {orders.map((order: any) => {
                const itemCount = order.items?.reduce(
                  (acc: number, item: any) => acc + (item.quantity ?? 0),
                  0
                );
                const currentStep = getCurrentStep(order.status);
                const arrivalLabel =
                  order.status === "cancelled"
                    ? "Order Cancelled"
                    : order.status === "delivered"
                    ? "Delivered"
                    : getArrivalLabel(order.orderDate, currentStep);
                const visibleItems = order.items?.slice(0, 3) ?? [];

                return (
                  <Card key={order.id} className="overflow-hidden border-none shadow-none">
                    <CardHeader className="gap-[18px] p-[28px]">
                      <div className="flex items-start justify-between gap-[16px]">
                        <div>
                          <CardTitle className="mb-[4px] text-[18px] font-bold text-secondary md:text-[22px]">
                            {arrivalLabel}
                          </CardTitle>
                          <p className="m-0 text-[13px] text-muted">
                            Order #{order.id} · {itemCount} item(s) ·{" "}
                            {formatPrice(order.subtotal ?? 0, currency)}
                          </p>
                        </div>
                        <Link
                          to="/account"
                          className="text-[14px] font-medium text-primary hover:underline"
                        >
                          See all orders
                        </Link>
                      </div>

                      <div className="flex items-center gap-[18px] overflow-x-auto pb-[4px]">
                        {visibleItems.map((item: any, index: number) => (
                          <div
                            key={`${item._id ?? item.id ?? index}-thumb`}
                            className="flex items-center gap-[18px]"
                          >
                            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[8px] border border-[#E5E7EB] bg-white p-[8px]">
                              <img
                                src={`${import.meta.env.VITE_BACKEND_URL}${item.img ?? ""}`}
                                alt={item.name}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                            {index < visibleItems.length - 1 && (
                              <div className="h-[44px] w-px bg-[#D1D5DB]" />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardHeader>

                    <CardContent className="p-0">
                      <div className="border-t border-[#E5E7EB] px-[28px] py-[22px]">
                        <h3 className="mb-[26px] text-center text-[22px] font-bold text-secondary">
                          {order.status === "cancelled"
                            ? "Cancelled"
                            : orderSteps[Math.max(currentStep, 0)]}
                        </h3>

                        <div className="relative mx-auto max-w-[980px] px-[18px]">
                          <div className="absolute left-[18px] right-[18px] top-[11px] h-[4px] rounded-full bg-[#BDBFC4]" />
                          <div
                            className="absolute left-[18px] top-[11px] h-[4px] rounded-full bg-[#3B82F6] transition-all"
                            style={{
                              width:
                                currentStep <= 0
                                  ? "0%"
                                  : `calc(${(currentStep / (orderSteps.length - 1)) * 100}% - 18px)`,
                            }}
                          />

                          <div className="relative grid grid-cols-4 gap-[12px]">
                            {orderSteps.map((step, index) => {
                              const isCompleted = currentStep > index;
                              const isActive = currentStep === index;

                              return (
                                <div key={step} className="flex flex-col items-center text-center">
                                  <span
                                    className={`z-[1] mb-[14px] flex h-[24px] w-[24px] items-center justify-center rounded-full border-2 bg-white ${
                                      isCompleted || isActive
                                        ? "border-[#3B82F6]"
                                        : "border-[#A3A3A3]"
                                    }`}
                                  >
                                    {isCompleted ? (
                                      <Check size={14} className="text-[#3B82F6]" />
                                    ) : null}
                                  </span>
                                  <span
                                    className={`text-[13px] font-medium md:text-[16px] ${
                                      isActive
                                        ? "font-bold text-secondary"
                                        : "text-[#4B5563]"
                                    }`}
                                  >
                                    {step}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TrackOrder;
