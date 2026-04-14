import { ChevronLeftIcon, XMarkIcon, TagIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeliveryBottomNavbar from "./DeliveryBottomNavbar";
export default function CartPage({ cart, addToCart, removeFromCart, cartCount, setCheckoutData }) {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState("");
  const parsePrice = (priceStr) =>
    parseFloat(priceStr.replace("GH₵", ""));
  const subtotal = cart.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );
  const deliveryFee = cart.length > 0 ? 5.0 : 0;
  const total = subtotal + deliveryFee - discount;
  const validCodes = {
    CALEBOSS10: 10,
    FOODS20: 20,
    FREESHIP: 5,
  };
  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (validCodes[code]) {
      setDiscount(validCodes[code]);
      setPromoMsg(` "${code}" applied — GH₵${validCodes[code]} off!`);
      setTimeout(() => setPromoMsg(""), 2000);
    } else {
      setDiscount(0);
      setPromoMsg(" Invalid promo code");
      setTimeout(() => setPromoMsg(""), 4000);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white overflow-hidden min-h-screen">
        {/* Header */}
        <div className="flex justify-between py-5 px-4 bg-yellow-500 h-42 relative">
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate("/deliverymainpage")}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg"
            >
              <ChevronLeftIcon className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="flex gap-2 justify-center">
            <ShoppingCartIcon className="w-6 h-6 mt-0.5 text-white" />
            <span className="font-medium text-white text-lg">Cart</span>
          </div>
          <div onClick={() => navigate("/deliverymainpage")}>
            <XMarkIcon className="w-6 h-6 text-white mt-0" />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-16 bg-white rounded-t-[40px]"></div>
        </div>
        {/* Scrollable area */}
        <div className="flex flex-col gap-3 px-2 pb-24 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="w-full min-h-120 flex flex-col gap-4 items-center justify-center">
              <ShoppingCartIcon className="w-15 h-15 text-yellow-600" />
              <p className="text-gray-500 text-lg">Your Cart is calling you!</p>
              <DeliveryBottomNavbar cartCount={cartCount} />
            </div>
          ) : (
            <>
              {/* Cart items */}
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="justify-between gap-1 flex w-full py-2 rounded-2xl"
                >
                  <div>
                    <img className="w-28 h-28" src={item.image} alt={item.name} />
                  </div>
                  <div className="flex flex-col gap-2 justify-center flex-1">
                    <h2 className="font-bold text-md">{item.name}</h2>
                    <span className="text-sm text-gray-800">{item.tagname}</span>
                    <h2 className="font-bold text-gray-800 text-md">
                      GH₵{(parsePrice(item.price) * item.quantity).toFixed(2)}
                    </h2>
                  </div>
                  <div className="w-1 py-3 px-3 justify-center flex justify-end items-end gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }}
                      className="py-0 px-2 bg-yellow-500 rounded-md text-white font-bold"
                    >
                      -
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); addToCart(item, 1); }}
                      className="py-0 px-2 bg-yellow-500 rounded-md text-white font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              {/* Promo Code */}
              <div className="flex gap-2 items-center bg-gray-100 rounded-xl px-3 py-2 mt-2">
                <TagIcon className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
                />
                <button
                  onClick={applyPromo}
                  className="bg-yellow-500 flex items-center text-white text-sm font-semibold px-4 py-1.5 rounded-3xl"
                >
                  Apply
                </button>
              </div>
              {promoMsg && (
                <p className="text-sm px-1 -mt-1 text-gray-800">{promoMsg}</p>
              )}
              {/* Order Summary */}
              <div className="flex flex-col gap-5 bg-gray-50 rounded-2xl p-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>GH₵{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery</span>
                  <span>GH₵{deliveryFee.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Promo discount</span>
                    <span>- GH₵{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900 text-base">
                  <span>Total</span>
                  <span className="text-xl text-yellow-600">GH₵{total.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>
        {/* Fixed Checkout button */}
        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white px-4 pt-3 pb-6">
            <button
              onClick={() => {
                setCheckoutData({ subtotal, deliveryFee, discount, total });
                navigate("/checkout");
              }}
              className="border-none outline-none
               w-full py-3 rounded-4xl
                bg-yellow-500 text-white
                 font-medium"
            >
              Checkout - GH₵{total.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}