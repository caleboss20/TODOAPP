import { HomeIcon as HomeSolid } from "@heroicons/react/24/solid";
import { MapPinIcon as MapPinSolid } from "@heroicons/react/24/solid";
import { BellIcon as BellIconSolid } from "@heroicons/react/24/solid";
import { UserCircleIcon as UserCircleIconSolid } from "@heroicons/react/24/solid";
import { Cog6ToothIcon as Cog6ToothIconSolid } from "@heroicons/react/24/solid";

import {
  HomeIcon,
  MapPinIcon,
  BellIcon,
  UserCircleIcon,Cog6ToothIcon,
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
    <div className="pl-4 pr-4 flex items-center justify-between w-full h-20 bg-white absolute bottom-0">
     
      {/* HOME */}
      <div
        onClick={() => handleActive("home")}
        className="shadow- p-2 rounded-full"
      >
        {active === "home" ? (
          <HomeSolid className="text-blue-500 w-7 h-7" />
        ) : (
          <HomeIcon className="w-7 h-7 text-gray-700" />
        )}
      </div>
      {/* MAP */}
      <div
        onClick={() => handleActive("map")}
        className="shadow- p-2 rounded-full"
      >
        {active === "map" ? (
          <MapPinSolid className="text-blue-500 w-7 h-7" />
        ) : (
          <MapPinIcon className="w-7 h-7 text-gray-700" />
        )}
      </div>
      {/* NOTIFICATIONS */}
      <div
        onClick={() => handleActive("notifications")}
        className="shadow- p-2 rounded-full"
      >
        {active === "notifications" ? (
          <BellIconSolid className="text-blue-500 w-7 h-7" />
        ) : (
          <BellIcon className="w-7 h-7 text-gray-700" />
        )}
      </div>
      {/* PROFILE */}
     <Link to="/settings">
      <div
        onClick={() => handleActive("profile")}
        className="shadow- p-2 rounded-full"
      >
        {active === "profile" ? (
          <Cog6ToothIconSolid className="text-blue-500 w-7 h-7" />
        ) : (
          <Cog6ToothIcon className="w-7 h-7 text-gray-700" />
        )}
      </div>
     </Link>
    </div>
  );
}
export default BottomNavbar;