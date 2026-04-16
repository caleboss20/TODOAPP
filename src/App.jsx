import "./index.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Delivery from "./Delivery";
import DeliveryMainpage from "./DeliveryMainpage";
import CartPage from "./CartPage";
import Checkout from "./Checkout";
import DeliveryNavbar from "./DeliveryNavbar";
import SearchPage from "./SearchPage";
import Profile from "./Profile";
import FormPage from "./FormPage";
import Splashpage from "./Splashpage";



function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // 🛒 CART STATE (LOAD FROM LOCAL STORAGE)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  // 🧾 CHECKOUT DATA (lifted from CartPage)\
 const [checkoutData, setCheckoutData] = useState(() => {
    const saved = localStorage.getItem("checkoutData");
    return saved ? JSON.parse(saved) : [];
  });


  // 💾 SAVE CHECKOUT DATA TO LOCAL STORAG
   useEffect(() => {
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
  }, [checkoutData]);

  
  // 🎯 BUTTON UI STATE
  const [buttonState, setButtonState] = useState({});
  // 📊 TOTAL CART ITEMS (for navbar badge)
  const cartCount = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  // 💾 SAVE CART TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  // 🔄 SYNC ACROSS TABS
  useEffect(() => {
    const syncCart = (event) => {
      if (event.key === "cart") {
        const updated = event.newValue ? JSON.parse(event.newValue) : [];
        setCart(updated);
      }
    };
    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, []);
  // 🧠 ADD / INCREMENT CART ITEM
  const setItemQuantity = (product, quantityToAdd) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }
      return [...prev, { ...product, quantity: quantityToAdd }];
    });
  };
  // ➕ ADD TO CART (UI feedback only)
  const addToCart = (item, quantity) => {
    setItemQuantity(item, quantity);
    setButtonState((prev) => ({
      ...prev,
      [item.id]: true,
    }));
    setTimeout(() => {
      setButtonState((prev) => ({
        ...prev,
        [item.id]: false,
      }));
    }, 3000);
  };
  // ➖ REMOVE ITEM
  const removeFromCart = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  return (
    <>
      <Routes>
        {/* 🏠 Splash */}
        <Route path="/" element={<Splashpage />} />
        {/* 🚀 Entry */}
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/formpage" element={<FormPage />} />
        <Route
          path="/deliverynavbar"
          element={<DeliveryNavbar onProfileClick={() => setSidebarOpen(true)} />}
        />
        <Route
          path="/searchpage"
          element={
            <SearchPage
              cart={cart}
              addToCart={addToCart}
              buttonState={buttonState}
            />
          }
        />
        {/* 🍔 MAIN PAGE */}
        <Route
          path="/deliverymainpage"
          element={
            <DeliveryMainpage
              cart={cart}
              cartCount={cartCount}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              setItemQuantity={setItemQuantity}
              buttonState={buttonState}
              setButtonState={setButtonState}
            />
          }
        />
        {/* 🛒 CART PAGE */}
        <Route
          path="/cartpage"
          element={
            <CartPage
              cart={cart}
              cartCount={cartCount}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              setCheckoutData={setCheckoutData}
            />
          }
        />
        <Route path="/profile" element={<Profile cartCount={cartCount} />} />
        {/* 🧾 CHECKOUT */}
        <Route
          path="/checkout"
          element={<Checkout 
            setCart={setCart}
            checkoutData={checkoutData} />}
        />
      </Routes>
    </>
  );
}
export default App;
