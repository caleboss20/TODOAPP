import {
  UserIcon,
  ShoppingBagIcon,
  MapPinIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  HomeIcon,
  TagIcon,
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon as CheckBadgeIconsolid } from "@heroicons/react/24/solid";
import profile from "./assets/profile.jpg";
import DeliveryBottomNavbar from "./DeliveryBottomNavbar";
import { useNavigate } from "react-router-dom";

function Profile({ cartCount }) {
  const navigate=useNavigate();
  const profileMenuItems = [
    { id: 1, label: "Personal Information", icon: UserIcon },
    { id: 2, label: "My Orders", icon: ShoppingBagIcon },
    { id: 3, label: "Addresses", icon: MapPinIcon },
    { id: 4, label: "Payment Methods", icon: CreditCardIcon },
    { id: 5, label: "Settings", icon: Cog6ToothIcon },
    { id: 6, label: "Help & Support", icon: QuestionMarkCircleIcon },
    { id: 7, label: "Logout", icon: ArrowRightOnRectangleIcon },
  ];
  return (
    <div className="bg-gray-50">
    <div className="flex pt-4 pl-3 items-center justify-between">
        <div
      onClick={()=>navigate("/deliverymainpage")}
       className=" ">
         <ChevronLeftIcon
          className="w-6 h-6 bg-white "/>
      </div>
      <p className="-ml-9 text-lg font-medium">Profile</p>
      <div></div>
      
    </div>
      <div
        className="py-6 flex-col
     flex justify-center gap-2.5 items-center"
      >
       
        <div className="relative w-18 h-18 bg-red-400 rounded-full">
          <img
            src={profile}
            className="rounded-full w-full h-full object-cover"
            alt=""
          />
          <div
            className="flex items-center  
          justify-center absolute w-6 h-6
           bg-white rounded-full -right-2 
           bottom-2"
          >
            <CheckBadgeIconsolid className="w-5 h-5 text-orange-600" />
          </div>
        </div>
        <div className="text-center">
          <h2 className="font-medium text-lg">Elizabeth Baah</h2>
          <span className="text-md text-gray-700">elizabeth2@gmail.com</span>
        </div>
      </div>

      {/**the list category side */}
      <div
        className="pl-4
       flex gap-5 flex-col pb-20"
      >
        {profileMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              className="rounded-md
             bg-white py-4 px-2 gap-5 flex relative"
              key={item.id}
            >
              <Icon width={22} height={22} />
              <span className="text-md text-gray-800">{item.label}</span>
              <span className="absolute right-4 mt-1.5">
                <ChevronRightIcon className="w-4 h-4" />
              </span>
            </div>
          );
        })}
      </div>
      <DeliveryBottomNavbar cartCount={cartCount} />
    </div>
  );
}
export default Profile;
