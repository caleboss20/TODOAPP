import { HomeIcon, MagnifyingGlassIcon, HeartIcon, UserIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
function DeliveryBottomNavbar() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { name: "Home",      icon: HomeIcon },
    { name: "Search",    icon: MagnifyingGlassIcon },
    { name: "Cart",      icon: ShoppingCartIcon },  // center
    { name: "Favourites",icon: HeartIcon },
    { name: "Profile",   icon: UserIcon },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 flex justify-between items-center z-10">
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        const isActive = activeTab === index;
        const isCart = tab.name === "Cart";
        return (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex flex-col items-center justify-center gap-1
              ${isCart ? "-mt-6" : ""}
            `}
          >
            {/* Cart gets special bigger circle */}
            {isCart ? (
              <div className="bg-yellow-500 rounded-full p-3 shadow-lg">
                <Icon className="w-5 h-5 text-white" />
              </div>
            ) : (
              <Icon
                className={`w-5 h-5 ${isActive ? "text-yellow-500" : "text-gray-800"}`}
              />
            )}
            <span
              className={`text-xs ${
                isCart ? "text-yellow-400" : isActive ? "text-yellow-400" : "text-gray-700"
              }`}
            >
              {tab.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
export default DeliveryBottomNavbar;