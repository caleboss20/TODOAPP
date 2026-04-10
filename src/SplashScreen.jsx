import { TruckIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
function Splashscreen() {
    const navigate=useNavigate();
    useEffect(()=>{
     const timer=setTimeout(()=>{
       navigate("/delivery");
     },4000)
     return()=>clearTimeout(timer);
    },[navigate]);
    
  return (
    <div className="w-full h-screen bg-yellow-500 items-center justify-center flex">
      <div className="flex flex-col gap-5 items-center">
        <h2 className="text-4xl font-bold text-gray-800">Caleboss</h2>
      <h2 className="text-4xl font-bold text-gray-200">Foods</h2>
        {/* <TruckIcon className="text-white w-10 h-10" /> */}
      </div>
    </div>
  );
}
export default Splashscreen;
