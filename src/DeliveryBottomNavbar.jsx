import {
  HomeIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  UserIcon,
  ArchiveBoxIcon
} from "@heroicons/react/24/outline";
import {  ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useNavigate, useLocation } from "react-router-dom";
function DeliveryBottomNavbar({ cartCount }) {
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = [
    { name: "Home", path: "/deliverymainpage", icon: HomeIcon },
    { name: "Orders", path: "/orders", icon: ArchiveBoxIcon },
    { name: "Cart", path: "/cartpage", icon: ShoppingCartIcon },
    { name: "Favourites", path: "/favourites", icon: HeartIcon },
    { name: "Profile", path: "/profile", icon: UserIcon },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 flex justify-between items-center z-10">
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.path;
        const isCart = tab.name === "Cart";
        return (
          <button
            key={index}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center justify-center gap-1 ${
              isCart ? "-mt-6" : ""
            }`}
          >
            {/* Cart special design stays SAME */}
            {isCart ? (
              <div className="relative bg-yellow-500 rounded-full p-3 shadow-lg">
                <Icon className="w-5 h-5 text-white" />
                {/* CART BADGE */}
                {cartCount >= 0 && (
                  <span className="absolute -top-1 font-medium -right-1 bg-yellow-700 text-white text-[11px] w-4.5 h-4.5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            ) : (
              <Icon
                className={`w-5 h-5 ${
                  isActive ? "text-yellow-500" : "text-gray-800"
                }`}
              />
            )}
            <span
              className={`text-xs ${
                isCart
                  ? "text-yellow-400"
                  : isActive
                    ? "text-yellow-400"
                    : "text-gray-700"
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
