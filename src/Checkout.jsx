import { CreditCardIcon } from "@heroicons/react/16/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  ChevronLeftIcon,
  MapPinIcon,
  ChevronRightIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Checkout({checkoutData}) {
 const { subtotal, deliveryFee, discount, total } = checkoutData || {};
  
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("credit");
  return (
    <div className="flex justify-center">
      <div className="w-full bg-white min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-between py-5 px-4 bg-yellow-500 h-42 relative">
          <button
            onClick={() => navigate("/cartpage")}
            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ChevronLeftIcon className="w-5 h-5 text-white" />
          </button>
          <span className="font-medium text-white text-lg">Checkout</span>
          <div className="w-8" />
          <div className="absolute bottom-0
          left-0 w-full h-16 bg-white
           rounded-t-[40px]" />
        </div>
        {/* Scrollable content */}
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


          {/* <button className="flex gap-3 items-center justify-center
           py-3 text-md bg-gray-100 mt-5 rounded-4xl
           ">
            <span><PlusIcon className="w-5 h-5" /></span>
            Add Payment Method
          </button> */}


          {/* Delivery Address */}
          <div className="relative p-2 mt-7">
            <span className="bg-[#ffffff] text-md font-medium">Delivery Address</span>
            <div className="flex mt-6 items-center gap-5 pl-3">
              <div><MapPinIcon className="w-6 h-6" /></div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-black">Atonsu street, Road no A34</span>
                <span className="text-sm text-gray-700">Kumasi (AR)</span>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-600 absolute right-2" />
            </div>
          </div>
          {/* Order Summary */}
          <div className="relative p-2 mt-7">
            <span className="bg-[#ffffff] text-md font-medium">Order Summary</span>
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Order Amount</span>
                <span className="text-sm text-gray-800">GH₵{subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Promo-discount</span>
                <span className={`text-sm ${discount?"text-green-600":"text-gray-600"}`}> GH₵{discount?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Delivery fee</span>
                <span className="text-sm text-gray-800">GH₵{deliveryFee?.toFixed(2)}</span>
              </div>
             
              <div className="flex justify-between items-center mt-2">
                <span className="text-md font-medium">Total Amount</span>
                <span className="text-xl font-bold text-yellow-500"> GH₵{total?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Fixed Pay Now */}
        <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 bg-white pt-3">
          <button className="w-full py-3 bg-yellow-500
           text-white font-semibold text-base rounded-4xl">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
export default Checkout;