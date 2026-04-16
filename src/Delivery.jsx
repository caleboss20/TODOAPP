import food from "./assets/drink.jpg";
import delivery from "./assets/delivery.png";
import yogo from "./assets/calyogo.png";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
function Delivery() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/formpage");
    }, 3000);
  };
  
  return (
    <div className="w-full h-screen fixed flex items-center justify-center ">
      <div className="relative w-full h-full overflow-hidden ">
        <img src={delivery} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/20 z-20">
          <div className="bottom-0 left-0 right-0 inset-0 bg-black/2 z-20">
            <div className="fixed bottom-5 mt-5 flex flex-col p-6 gap-6 items-center justify-center">
              <h2 className="font-medium text-2xl text-center text-gray-200">
                <span>Crush Your </span>Hunger, The Boss way!
              </h2>
              <p className="text-gray-200 text-lg text-center">
                Order fast foods in minutes!
              </p>
              <button
                onClick={handleClick}
                disabled={loading}
                className="shadow-lg w-full flex rounded-xl bg-yellow-600 font-medium text-lg mt-2 text-white py-4 px-9 items-center justify-between"
              >
                <div></div>
                Browse Menu
                <span>
                  {loading ? (
                   <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <ArrowRightIcon className="w-5 h-5 cursor-pointer" />
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Delivery;
