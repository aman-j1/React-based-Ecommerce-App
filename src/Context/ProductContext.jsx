import React, { useEffect, createContext, useState } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storeData = localStorage.getItem("Cart");
    return storeData ? JSON.parse(storeData) : [];    
  });

  const [wishlist, setWishlist] = useState(() => {
    const storeWishlistData = localStorage.getItem("Wishlist");
    return storeWishlistData ? JSON.parse(storeWishlistData) : [];
  });

  useEffect(() => {
    localStorage.setItem("Wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const isAlreadyExist = cart.some((item) => item.id === product.id);

    if (isAlreadyExist) {
      alert("Product already in cart!!");
      return;
    }
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  // ✅ Increase quantity
  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // ✅ Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
        // remove if quantity becomes 0 (optional)
        .filter((item) => item.quantity > 0)
    );
  };

  const addToWishlist = (product) => {
    const isAlreadyExists = wishlist.some((item) => item.id === product.id);
    if (isAlreadyExists) {
      alert("Product already in wishlist!!");
      return;
    }
    setWishlist((prev) => [...prev, product]);
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);
  return (
    <ProductContext.Provider
      value={{
        increaseQuantity,
        decreaseQuantity,
        addToCart,
        removeFromCart,
        clearCart,
        cart,
        setCart,
        wishlist,
        setWishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
