const CART_KEY = "guest_cart";
export type TGuestCart = Record<string, number>;

const isBrowser = typeof window !== "undefined";

const isGuestCartRecord = (value: unknown): value is TGuestCart => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return Object.values(value as Record<string, unknown>).every(
    (qty) => typeof qty === "number" && Number.isFinite(qty) && qty > 0
  );
};

export const getGuestCart = () => {
  if (!isBrowser) {
    return {} as TGuestCart;
  }

  const data = localStorage.getItem(CART_KEY);
  if (!data) {
    return {} as TGuestCart;
  }

  try {
    const parsed = JSON.parse(data);
    return isGuestCartRecord(parsed) ? parsed : ({} as TGuestCart);
  } catch {
    return {} as TGuestCart;
  }
};

export const saveGuestCart = (cart: TGuestCart) => {
  if (!isBrowser) {
    return;
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToGuestCart = (productId: string, qty = 1) => {
  const cart = getGuestCart();
  cart[productId] = (cart[productId] || 0) + qty;
  saveGuestCart(cart);
  return cart;
};

export const removeFromGuestCart = (productId: string) => {
  const cart = getGuestCart();
  delete cart[productId];
  saveGuestCart(cart);
  return cart;
};

export const clearGuestCart = () => {
  if (!isBrowser) {
    return;
  }
  localStorage.removeItem(CART_KEY);
};
