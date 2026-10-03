"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { addToCart as apiAddToCart, createCart, getCart } from "@/lib/shopify";

export interface CartItem {
  id: string;
  title: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartId: string | null;
  cartItems: CartItem[];
  checkoutUrl: string;
  isCartOpen: boolean;
  addToCart: (variantId: string, quantity: number, product?: any) => Promise<void>;
  removeCartItem: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("shopify_cart_id");
    if (stored) {
      setCartId(stored);
      fetchCart(stored);
    }
  }, []);

  const fetchCart = async (id: string) => {
    try {
      const cart = await getCart(id);
      if (cart) {
        setCheckoutUrl(cart.checkoutUrl);
        const items = cart.lines?.edges?.map((edge: any) => {
          const node = edge.node;
          return {
            id: node.id,
            title: node.merchandise?.product?.title || "Product",
            size: node.merchandise?.title || "Default",
            price: Number(node.merchandise?.price?.amount || 0),
            quantity: node.quantity,
            image: "/hero-kurti.png.png", 
          };
        }) || [];
        setCartItems(items);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addToCart = async (variantId: string, quantity: number, product?: any) => {
    let currentId = cartId;
    let newUrl = checkoutUrl;

    if (variantId.startsWith("mock-")) {
      const newItem = {
        id: variantId,
        title: product?.title || "Mock Item",
        size: variantId.split("-").pop() || "M",
        price: 1299,
        quantity,
        image: "/hero-kurti.png.png",
      };
      setCartItems(prev => {
        const existing = prev.find(i => i.id === variantId);
        if (existing) return prev.map(i => i.id === variantId ? { ...i, quantity: i.quantity + quantity } : i);
        return [...prev, newItem];
      });
      return;
    }

    try {
      if (currentId) {
        const cart = await apiAddToCart(currentId, [{ merchandiseId: variantId, quantity }]);
        if (cart) {
          newUrl = cart.checkoutUrl;
        } else {
          const newCart = await createCart(variantId, quantity);
          if (newCart) {
            currentId = newCart.id;
            newUrl = newCart.checkoutUrl;
          }
        }
      } else {
        const newCart = await createCart(variantId, quantity);
        if (newCart) {
          currentId = newCart.id;
          newUrl = newCart.checkoutUrl;
        }
      }
      
      if (currentId) {
        localStorage.setItem("shopify_cart_id", currentId);
        setCartId(currentId);
        setCheckoutUrl(newUrl);
        await fetchCart(currentId);
      }
    } catch (e) {
      console.error("Cart Error:", e);
    }
  };

  const removeCartItem = (id: string) => {
    // Optimistic UI removal. Real implementation would call Shopify API.
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider value={{ cartId, cartItems, checkoutUrl, isCartOpen, addToCart, removeCartItem, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
