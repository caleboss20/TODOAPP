import { useEffect } from "react";
import logo from "./assets/logo.png";

import { Link, useNavigate } from "react-router-dom";
function Splashpage() {
    const navigate=useNavigate();
    useEffect(()=>{
     const timer=setTimeout(()=>{
       navigate("/delivery");
     },4000)
     return()=>clearTimeout(timer);
    },[navigate]);
    
  return (
    <div className="z-60 w-full h-screen bg-yellow-00 items-center justify-center flex">
      <div className="flex flex-col gap-5 items-center">
      <img src={logo} className="w-60 h-60" alt="" />
          {/* <h2 className="text-4xl font-bold text-gray-800">Caleboss</h2>
      <h2 className="text-4xl font-bold text-gray-200">Foods</h2> */}
      </div>
    </div>
  );
}
export default Splashpage;
