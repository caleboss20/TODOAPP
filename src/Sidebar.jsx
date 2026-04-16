import { XMarkIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import {
  UserIcon,
  ShoppingCartIcon,
  WalletIcon,
  HeartIcon,
  QuestionMarkCircleIcon,
  PhoneIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import profile from "./assets/profile.jpg";
import { useNavigate } from "react-router-dom";
const menuItems = [
  { id: 1, label: "Profile", icon: UserIcon },
  { id: 2, label: "Cart", icon: ShoppingCartIcon },
  { id: 3, label: "Wallet", icon: WalletIcon },
  { id: 4, label: "Favourites", icon: HeartIcon },
  { id: 5, label: "FAQs", icon: QuestionMarkCircleIcon },
  { id: 6, label: "Support", icon: PhoneIcon },
  { id: 7, label: "Settings", icon: Cog6ToothIcon },
];
function Sidebar({ open, onClose }) {
  const navigate=useNavigate();
  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40
          transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      {/* SIDEBAR */}
      <div
        className={`fixed top-0 bottom-0 left-0 h-full
         w-[78%] bg-yellow-500 z-50
          rounded-r-3xl
          transition-transform duration-300
           ease-in-out flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* CLOSE */}
        <button onClick={onClose} className="absolute top-5 right-5">
          <XMarkIcon className="w-6 h-6 text-white" />
        </button>
        {/* PROFILE */}
        <div className="flex flex-col gap-2 px-7 pt-14 pb-8">
          <img
            src={profile}
            className="w-16 h-16 rounded-full object-cover border-2 border-white"
          />
          <h2 className="font-bold text-white text-xl mt-1">Elizabeth Baah </h2>
          <p className="text-white/80 text-sm">elizabeth2@gmail.com</p>
        </div>
        {/* DIVIDER */}
        <div className="w-4/5 h-px bg-white/30 mx-7 mb-4" />
        {/* MENU ITEMS */}
        <div className="flex flex-col px-7 gap-1 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className="flex items-center gap-4 py-3 text-white text-base font-medium"
              >
                <Icon className="w-5 h-5 text-white" />
                {item.label}
              </button>
            );
          })}
        </div>
        {/* LOGOUT */}
        <div className="px-7 pb-10">
          <button
          onClick={()=>navigate("/formpage")}
           className="flex items-center gap-3 text-white text-base font-medium">
            Logout
            <ArrowRightOnRectangleIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </>
  );
}
export default Sidebar;