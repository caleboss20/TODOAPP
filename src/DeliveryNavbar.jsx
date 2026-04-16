import { useState } from "react";
import { MapPinIcon, BellIcon } from "@heroicons/react/24/outline";
import profile from "./assets/profile.jpg";
import Sidebar from "./Sidebar";
function DeliveryNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex pt-6 pl-4 pr-4
       items-center justify-between">
        <div className="flex gap-3">
          <div
            onClick={() => setSidebarOpen(true)}
            className="w-14 h-14 bg-yellow-600 rounded-full cursor-pointer"
          >
            <img
              src={profile}
              className="rounded-full w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-medium">Elizabeth</span>
            <div className="flex gap-1 items-center">
              <MapPinIcon className="mt-0.5 w-4 text-gray-700 h-4" />
              <span className="text-sm text-gray-600">Atonsu, Kumasi</span>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <BellIcon className="w-6 h-6 color-black mr-3" />
        </div>
      </div>
    </>
  );
}
export default DeliveryNavbar;