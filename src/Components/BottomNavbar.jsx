import { HomeIcon as HomeSolid } from "@heroicons/react/24/solid";
import { MapPinIcon as MapPinSolid } from "@heroicons/react/24/solid";
import { BellIcon as BellIconSolid } from "@heroicons/react/24/solid";
import { UserCircleIcon as UserCircleIconSolid } from "@heroicons/react/24/solid";
import { Cog6ToothIcon as Cog6ToothIconSolid } from "@heroicons/react/24/solid";

import {
  HomeIcon,
  MapPinIcon,
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
function BottomNavbar() {
  // 1️⃣ State stores which tab is active
  const [active, setActive] = useState("home");
  // 2️⃣ On first render, read last active tab from localStorage
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActive(savedTab);
    }
  }, []);
  // 3️⃣ When a tab is clicked, update state AND save to localStorage
  const handleActive = (tab) => {
    setActive(tab);
    localStorage.setItem("activeTab", tab);
  };
  return (
    <div className="pl-4 pr-4 flex items-center justify-between w-full h-20 bg-white fixed bottom-0 left-0 right-0">
      {/* HOME */}
      <div
        onClick={() => handleActive("home")}
        className="shadow- p-2 rounded-full"
      >
        {active === "home" ? (
          <>
            <div className="flex flex-col items-center justify-center">
              <HomeSolid className="text-blue-500 w-6 h-6" />
              <span className="font-small text-[12px] text-blue-600">Home</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center">
              <HomeIcon className="w-6 h-6 text-gray-700" />
              <span className="font-small text-[12px] text-gray-600">Home</span>
            </div>
          </>
        )}
      </div>
      {/* MAP */}
      <Link to="/mapsection">
      <div
        onClick={() => handleActive("map")}
        className="shadow- p-2 rounded-full"
      >
        {active === "map" ? (
          <>
            <div className="flex flex-col items-center justify-center">
              <MapPinSolid className="text-blue-500 w-6 h-6" />
              <span className="font-small text-[12px] text-blue-600">Map</span>
            </div>
          </>
          
        ) : (
          <>
            <div className="flex flex-col items-center justify-center">
              <MapPinIcon className="w-6 h-6 text-gray-700" />
              <span className="font-small text-[12px] text-gray-600">Map</span>
            </div>
          </>
          
        )}
      </div>
      </Link>
      {/* NOTIFICATIONS */}
      <Link to="/notifications">
      <div
        onClick={() => handleActive("notifications")}
        className="shadow- p-2 rounded-full"
      >
        {active === "notifications" ? (
           <>
            <div className="flex flex-col items-center justify-center">
            <BellIconSolid className="text-blue-500 w-6 h-6" />
              <span className="font-small text-[12px] text-blue-600">Alerts</span>
            </div>
          </>
          
        ) : (
           <>
            <div className="flex flex-col items-center justify-center">
              <BellIcon className="w-6 h-6 text-gray-700" />
              <span className="font-small text-[12px] text-gray-600">Alerts</span>
            </div>
          </>
          
        )}
      </div>
      </Link>
      {/* PROFILE */}
      <Link to="/settings">
        <div
          onClick={() => handleActive("profile")}
          className="shadow- p-2 rounded-full"
        >
          {active === "profile" ? (
             <>
            <div className="flex flex-col items-center justify-center">
            <Cog6ToothIconSolid className="text-blue-500 w-6 h-6" />
              <span className="font-small text-[12px] text-blue-600">Settings</span>
            </div>
          </>
            
          ) : (
             <>
            <div className="flex flex-col items-center justify-center">
              <Cog6ToothIcon className="w-6 h-6 text-gray-700" />
              <span className="font-small text-[12px] text-gray-600">Settings</span>
            </div>
          </>
            
          )}
        </div>
      </Link>
    </div>
  );
}
export default BottomNavbar;
