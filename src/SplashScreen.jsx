import { TruckIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function Splashscreen() {
    const navigate=useNavigate();
    useEffect(()=>{
     const timer=setTimeout(()=>{
       navigate("/mainpage");
     },4000)
     return()=>clearTimeout(timer);
    },[navigate]);
    
  return (
    <div className="w-full h-screen bg-blue-700 items-center justify-center flex">
      <div className="flex gap-3 items-center">
        <h2 className="text-3xl font-medium text-white">Shuttle</h2>
        <TruckIcon className="text-white w-10 h-10" />
      </div>
    </div>
  );
}
export default Splashscreen;
