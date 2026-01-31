import { useState } from "react";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  MapPinIcon,
  ClockIcon,
  TruckIcon,
  ShoppingBagIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import BottomNavbar from "./Components/BottomNavbar";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
function MainPage() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [startLocation, setStartLocation] = useState("View Shuttle Location");
  const [dropoffLocation, setDropoffLocation] = useState("Takeoff location");
  const [searchQuery, setSearchQuery] = useState("");
  // Campus shuttle stops
  const shuttleStops = [
    {
      id: 1,
      name: "Unity Hall",
      address: "Konti, Unity Hall bus stop",
      distance: "5.6 km",
      type: "station",
      icon: TruckIcon,
    },
    {
      id: 2,
      name: "Commercial Area",
      address: "Knust",
      distance: "<1 km",
      type: "location",
      icon: ClockIcon,
    },
    {
      id: 3,
      name: "Melcom Kumasi Adum Branch",
      address: "Prempeh 2nd Street, Kumasi",
      distance: "6.4 km",
      type: "location",
      icon: ClockIcon,
    },
    {
      id: 4,
      name: "Tech Junction",
      address: "Kumasi",
      distance: "<1 km",
      type: "station",
      icon: TruckIcon,
    },
    {
      id: 5,
      name: "SG Mall",
      address: "Kumasi",
      distance: "1.6 km",
      type: "shopping",
      icon: ShoppingBagIcon,
    },
    {
      id: 6,
      name: "Kejetia Market",
      address: "Kejetia Road, Kumasi",
      distance: "6.7 km",
      type: "shopping",
      icon: ShoppingBagIcon,
    },
    {
      id: 7,
      name: "Sofoline Trotro Station",
      address: "Pine Avenue, Kumasi",
      distance: "9.4 km",
      type: "station",
      icon: TruckIcon,
    },
    {
      id: 8,
      name: "Santasi Roundabout",
      address: "Kumasi",
      distance: "8.6 km",
      type: "location",
      icon: MapPinIcon,
    },
    {
      id: 9,
      name: "Ahodwo Roundabout Goil",
      address: "Kumasi",
      distance: "7.2 km",
      type: "location",
      icon: MapPinIcon,
    },
  ];
  const filteredStops = shuttleStops.filter(
    (stop) =>
      stop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stop.address.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const handleStopClick = (stop) => {
    setDropoffLocation(stop.name);
    setSearchQuery("");
  };
  const closeModal = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };
  return (
    <div className="w-full">
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-0.5">
            <p className="text-gray-700 text-sm">{new Date().toDateString()}</p>
            <h2 className="text-black font-medium text-lg">Campus Shuttle</h2>
          </div>
          <div
            onClick={() => navigate("/notifications")}
            className="relative cursor-pointer"
          >
            <BellIcon className="w-7 h-7 text-gray-700 md:w-4 h-4" />
            <div className="top-0 right-0 absolute bg-red-600 rounded-full py-0 px-1 flex justify-center items-center text-white">
              <span className="font-bold text-[10px]">2</span>
            </div>
          </div>
        </div>
        {/* Clickable Search Input */}
        <div
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex gap-3 bg-gray-100 p-3 rounded-full mt-8 items-center cursor-pointer hover:bg-gray-200 transition-colors"
        >
          <MagnifyingGlassIcon className="w-6 h-6" />
          <input
            type="text"
            placeholder="Where should we pick you up?"
            className="flex-1 outline-none text-md text-black bg-gray-100 cursor-pointer"
            readOnly
          />
        </div>
      </div>
      {/* Bottom Sheet Modal */}
      {isSearchOpen && (
        <div className="fixed bottom-0 top-0 left-0 right-0 bg-white rounded-tl-3xl rounded-tr-3xl z-50 max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-6 border-b border-gray-200">
            <h2 className="text-lg font-medium">Your route</h2>
            <button onClick={closeModal} className="p-1">
              <XMarkIcon className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Route Selection */}
            <div className="p-6 space-y-4 border-b border-gray-200">
              {/* Start Location */}
              <div className="flex gap-4 items-center bg-gray-100 p-4 rounded-lg">
                {/* Blinking Shuttle Circle */}
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "#0bc029",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "pulse 1.8s infinite",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: "white",
                    }}
                  ></div>
                </div>
                {/* Start Location Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-700 font-medium">{startLocation}</p>
                </div>
                {/* Plus Button */}
                <button
                  className="text-gray-600 text-xl flex-shrink-0"
                  onClick={() => navigate("/mapsection")}
                >
                  +
                </button>
                {/* Pulse keyframes */}
                <style>
                  {`
                    @keyframes pulse {
                      0% { transform: scale(1); opacity: 1; }
                      50% { transform: scale(1.3); opacity: 0.7; }
                      100% { transform: scale(1); opacity: 1; }
                    }
                  `}
                </style>
              </div>
              {/* Takeoff Location */}
              <div className="flex gap-4 items-center bg-gray-100 p-4 rounded-lg">
                <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-400 font-medium">{dropoffLocation}</p>
                </div>
                <button className="text-gray-600 text-xl flex-shrink-0">
                  ⬍
                </button>
              </div>
            </div>
            {/* Search Input */}
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <input
                type="text"
                placeholder="Where should we pick you up?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full border-1 border-gray-300 rounded-full py-3 px-4 outline-none text-gray-700"
              />
            </div>
            {/* Shuttle Stops List */}
            <div className="flex flex-col divide-y divide-gray-200">
              {filteredStops.length > 0 ? (
                filteredStops.map((stop) => {
                  const IconComponent = stop.icon;
                  return (
                    <div
                      key={stop.id}
                      onClick={() => handleStopClick(stop)}
                      className="p-6 flex gap-4 items-start hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      {/* Icon */}
                      <div className="mt-1 flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-gray-700" />
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 font-medium text-base">
                          {stop.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {stop.address}
                        </p>
                      </div>
                      {/* Distance */}
                      <div className="text-gray-600 text-sm whitespace-nowrap flex-shrink-0">
                        {stop.distance}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <p>No stops found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/**the middle section */}
      <div className="p-6 ">
        <div className="border-1 border-violet-200 w-full bg-violet-50 p-4  rounded-lg">
          <div>
            <div className="flex items-center gap-2 py-2 px-4 bg-violet-200 inline-flex rounded-full">
              <div className="w-3 h-3 bg-violet-700 rounded-full"></div>
              <h2 className="text-sm text-violet-800 font-medium">ACTIVE</h2>
            </div>
          </div>

          <h2 className="text-gray-500 text-md mt-4 pl-1">CURRENT ROUTE</h2>
        <div className="flex justify-between p-2 mt-3">
          <h2 className="text-md text-gray-700">Unity Hall</h2>
          <div><ArrowRightIcon className="w-6 h-6 text-violet-600"/></div>
          <h2 className="text-md text-gray-700">College of Sci</h2>
        </div>

         {/* Progress Bar */}
          <div className="mb-6 p-2 mt-2">
            <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-yellow-500 rounded-full transition-all duration-500"
                style={{ width: "45%" }}
              ></div>
            </div>
            <div className="flex justify-between mt-5">
              <p className="text-xs text-gray-600 font-medium">Departed</p>
              <p className="text-xs text-violet-600 font-semibold">45% approaching...</p>
            </div>
          </div>

<div className="flex gap-6">
  <div className="p-2 shadow- flex-1 bg-violet-200 w-full h-20 rounded-lg">
    <div className="flex items-center gap-1 items-center">
      <MapPinIcon className="w-4 h-4 text-gray-700"/>
      <span className="text-sm text-gray-600">NEXT STOP</span>
    </div>
    <h2 className="text-sm pl-2 font-medium mt-3">College of Sci</h2>
    
  </div>
   <div className="shadow- p-2 flex-1 bg-violet-200 w-full h-20 rounded-lg">
       <div className="flex items-center gap-1 items-center">
      <ClockIcon className="w-4 h-4 text-gray-700"/>
      <span className="text-sm text-gray-600">ETA</span>
    </div>
    <h2 className="text-lg pl-2 font-medium mt-3 text-green-600">2 mins</h2>
   </div>
</div>

        </div>
      </div>

      {/* Bottom Navbar */}
      <BottomNavbar />
    </div>
  );
}
export default MainPage;
