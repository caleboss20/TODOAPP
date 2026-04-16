import { CreditCardIcon } from "@heroicons/react/16/solid";
import {
  ChevronLeftIcon,
  MapPinIcon,
  ChevronRightIcon,
  DevicePhoneMobileIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
/* --- Animated checkmark inside the popup --- */
function CheckmarkAnimation({ visible }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 96, height: 96 }}>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(234,179,8,0.18) 0%, transparent 70%)",
          transform: visible ? "scale(1)" : "scale(0)",
          transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s",
        }}
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <div
          key={deg}
          className="absolute rounded-full bg-yellow-300"
          style={{
            width: 5,
            height: 5,
            top: "50%",
            left: "50%",
            transform: `translate(-50%,-50%) rotate(${deg}deg) translateY(-50px)`,
            opacity: visible ? 1 : 0,
            transition: `opacity 0.3s ease ${0.45 + i * 0.04}s`,
          }}
        />
      ))}
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: 72,
          height: 72,
          background: "#EAB308",
          boxShadow: "0 8px 28px rgba(234,179,8,0.45), inset 0 1px 0 rgba(255,255,255,0.25)",
          transform: visible ? "scale(1)" : "scale(0)",
          transition: "transform 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
        }}
      >
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.2s ease 0.5s",
          }}
        >
          <path
            d="M8 17.5L14.5 24L26 11"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="30"
            strokeDashoffset={visible ? 0 : 30}
            style={{ transition: "stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1) 0.5s" }}
          />
        </svg>
      </div>
    </div>
  );
}
/* --- Small spinner shown inside the button --- */
function ButtonSpinner() {
  return (
    <svg className="animate-spin" style={{ width: 22, height: 22 }} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
/* --- Main Checkout component --- */
function Checkout({ checkoutData,setCart }) {
  const { subtotal, deliveryFee, discount, total } = checkoutData || {};
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("credit");
  // Loading + popup state
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [checkVisible, setCheckVisible] = useState(false);
  // Address state — seeded from localStorage, falls back to default
  const [address, setAddress] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("deliveryAddress")) || {
          street: "Atonsu street, Road no A34",
          city: "Kumasi (AR)",
        }
      );
    } catch {
      return { street: "Atonsu street, Road no A34", city: "Kumasi (AR)" };
    }
  });
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressDraft, setAddressDraft] = useState(address);
  const handleSaveAddress = () => {
    setAddress(addressDraft);
    localStorage.setItem("deliveryAddress", JSON.stringify(addressDraft));
    setIsEditingAddress(false);
  };
  const handleCancelAddress = () => {
    setAddressDraft(address);
    setIsEditingAddress(false);
  };
  const handlePlaceOrder = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowModal(true);
      setTimeout(() => setAnimateIn(true), 20);
      setTimeout(() => setCheckVisible(true), 320);
      //empty the cat array after checkout button is clicked//
      setCart([]);
    }, 3000);

  };
  const handleGoHome = () => {
    setAnimateIn(false);
    setCheckVisible(false);
    setTimeout(() => {
      setShowModal(false);
      navigate("/deliverymainpage");
    }, 2000);
  };
  const handleTrack = () => {
    setAnimateIn(false);
    setCheckVisible(false);
    setTimeout(() => {
      setShowModal(false);
      navigate("/orders");
    }, 420);
  };
  return (
    <div className="flex justify-center">
      <div className="w-full bg-white min-h-screen flex flex-col">
        {/* -- Header -- */}
        <div className="flex justify-between py-5 px-4 bg-yellow-500 h-42 relative">
          <button
            onClick={() => navigate("/cartpage")}
            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ChevronLeftIcon className="w-5 h-5 text-white" />
          </button>
          <span className="font-medium text-white text-lg">Checkout</span>
          <div className="w-8" />
          <div className="absolute bottom-0 left-0 w-full h-16 bg-white rounded-t-[40px]" />
        </div>
        {/* -- Scrollable content -- */}
        <div className="flex flex-col gap-5 px-4 pb-32 overflow-y-auto">
          {/* Payment Method */}
          <div className="flex flex-col gap-3">
            <div
              onClick={() => setSelectedPayment("credit")}
              className="bg-white flex justify-between mt-4 items-center cursor-pointer"
            >
              <div className="flex gap-3 items-center">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <CreditCardIcon className="text-yellow-500 w-8 h-8" />
                </div>
                <p className="text-md font-medium">Credit Card</p>
              </div>
              <span className="text-md text-gray-600">*****344647</span>
              {selectedPayment === "credit" ? (
                <CheckCircleIcon className="w-6 text-black h-6" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-400" />
              )}
            </div>
            <div
              onClick={() => setSelectedPayment("mobile")}
              className="flex justify-between mt-4 items-center cursor-pointer"
            >
              <div className="flex gap-3 items-center">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <DevicePhoneMobileIcon className="text-yellow-500 w-8 h-8" />
                </div>
                <p className="text-md font-medium">Mobile Money</p>
              </div>
              <span className="text-md text-gray-600">+233******</span>
              {selectedPayment === "mobile" ? (
                <CheckCircleIcon className="w-6 text-black h-6" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-400" />
              )}
            </div>
          </div>
          {/* Delivery Address */}
          <div className="relative p-2 mt-7">
            <div className="flex items-center justify-between">
              <span className="bg-white text-md font-medium">Delivery Address</span>
              {!isEditingAddress && (
                <button
                  onClick={() => {
                    setAddressDraft(address);
                    setIsEditingAddress(true);
                  }}
                  className="flex items-center gap-1 text-yellow-500 text-sm font-medium"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>
            {isEditingAddress ? (
              /* ── Edit mode ── */
              <div className="mt-4 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600 font-medium pl-1">Street</label>
                  <input
                    className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-yellow-400 transition-colors bg-gray-50"
                    value={addressDraft.street}
                    onChange={(e) =>
                      setAddressDraft((prev) => ({ ...prev, street: e.target.value }))
                    }
                    placeholder="Street address"
                    autoFocus
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600 font-medium pl-1">City / Region</label>
                  <input
                    className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-yellow-400 transition-colors bg-gray-50"
                    value={addressDraft.city}
                    onChange={(e) =>
                      setAddressDraft((prev) => ({ ...prev, city: e.target.value }))
                    }
                    placeholder="City (Region)"
                  />
                </div>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={handleSaveAddress}
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-yellow-500 text-white text-sm font-semibold rounded-2xl active:scale-95 transition-transform"
                  >
                    
                    Save
                  </button>
                  <button
                    onClick={handleCancelAddress}
                    className=" flex-1 flex items-center justify-center gap-1.5 py-3 bg-gray-100 text-gray-600 text-sm font-semibold rounded-2xl active:scale-95 transition-transform"
                  >
                 
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* ── Display mode ── */
              <div className="flex mt-6 items-center gap-5 pl-3">
                <div>
                  <MapPinIcon className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-black">{address.street}</span>
                  <span className="text-sm text-gray-700">{address.city}</span>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-600 absolute right-2" />
              </div>
            )}
          </div>
          {/* Order Summary */}
          <div className="relative p-2 mt-7">
            <span className="bg-white text-md font-medium">Order Summary</span>
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Order Amount</span>
                <span className="text-sm text-gray-800">GH₵{subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Promo-discount</span>
                <span className={`text-sm ${discount ? "text-green-600" : "text-gray-600"}`}>
                  GH₵{discount?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Delivery fee</span>
                <span className="text-sm text-gray-800">GH₵{deliveryFee?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-md font-medium">Total Amount</span>
                <span className="text-xl font-bold text-yellow-500">GH₵{total?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        {/* -- Fixed Place Order button -- */}
        <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 bg-white pt-3">
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full py-3 bg-yellow-500 text-white font-semibold text-base rounded-4xl active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <ButtonSpinner />
                <span>Processing...</span>
              </>
            ) : (
              "Place Order"
            )}
          </button>
        </div>
        {/* Order Success Popup */}
        {showModal && (
          <>
            <div
              className="fixed inset-0 z-40"
              style={{
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(1px)",
                WebkitBackdropFilter: "blur(3px)",
                opacity: animateIn ? 1 : 0,
                transition: "opacity 0.35s ease",
              }}
              onClick={handleGoHome}
            />
            <div
              className="h-[440px] fixed bottom-0 left-0 right-0 z-50 bg-white"
              style={{
                borderRadius: "32px 32px 0 0",
                transform: animateIn ? "translateY(0)" : "translateY(100%)",
                transition: "transform 0.45s cubic-bezier(0.32,0.72,0,1)",
                paddingBottom: "env(safe-area-inset-bottom, 24px)",
              }}
            >
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-gray-200" />
              </div>
              <div className="flex flex-col items-center px-8 pt-5 pb-6">
                <CheckmarkAnimation visible={checkVisible} />
                <h2
                  className="mt-5 text-gray-900 font-bold text-xl tracking-tight"
                  style={{
                    opacity: checkVisible ? 1 : 0,
                    transform: checkVisible ? "translateY(0)" : "translateY(10px)",
                    transition: "opacity 0.4s ease 0.6s, transform 0.4s ease 0.6s",
                  }}
                >
                  Order Successful!
                </h2>
                <p
                  className="mt-2 text-gray-400 text-md text-center leading-relaxed"
                  style={{
                    opacity: checkVisible ? 1 : 0,
                    transform: checkVisible ? "translateY(0)" : "translateY(10px)",
                    transition: "opacity 0.4s ease 0.7s, transform 0.4s ease 0.7s",
                  }}
                >
                  We're preparing your order.{"\n"}
                  Track updates in My Orders.
                </p>
                <button
                  onClick={handleGoHome}
                  className="mt-7 w-full py-3.5 bg-yellow-500 text-white font-semibold text-base rounded-4xl active:scale-95 transition-transform"
                  style={{
                    opacity: checkVisible ? 1 : 0,
                    transform: checkVisible ? "translateY(0)" : "translateY(12px)",
                    transition: "opacity 0.4s ease 0.8s, transform 0.4s ease 0.8s",
                  }}
                >
                  Go Home
                </button>
                <button
                  onClick={handleTrack}
                  className="w-full rounded-4xl py-4 bg-gray-100 mt-5"
                  style={{
                    opacity: checkVisible ? 1 : 0,
                    transition: "opacity 0.4s ease 0.9s",
                  }}
                >
                  Track your order
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Checkout;