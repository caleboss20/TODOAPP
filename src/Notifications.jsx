import {
  TruckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import BottomNavbar from "./Components/BottomNavbar";
import { useEffect, useState } from "react";
function Notifications() {
  const [now, setNow] = useState(Date.now());
  const [popup,setPopup]=useState(false);
  const [notification, setNotification] = useState([
    {
      id: 1,
      title: "Shuttle Arriving",
      description: "Shuttle arriving at Main Gate in 5 minutes",
      createdAt: Date.now(),
      isRead: false,
      icon: TruckIcon,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
      cardBg: "bg-blue-50",
      borderbg: "border-blue-200",
    },
    {
      id: 2,
      title: "Shuttle Delayed",
      description: "Delay due to traffic near Engineering Block",
      createdAt: Date.now() - 2 * 60 * 1000,
      isRead: false,
      icon: ExclamationTriangleIcon,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-700",
      cardBg: "bg-yellow-50",
      borderbg: "border-yellow-200",
    },
    {
      id: 3,
      title: "Service Started",
      description: "Shuttle service has started for today",
      createdAt: Date.now() - 60 * 60 * 1000,
      isRead: false,
      icon: CheckCircleIcon,
      iconBg: "bg-green-100",
      iconColor: "text-green-700",
      cardBg: "bg-green-50",
      borderbg: "border-green-200",
    },
  ]);
  // 🔁 force real-time update like Uber
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000); // every minute
    return () => clearInterval(interval);
  }, []);
  // ⏱ Uber-style time formatter
  const formatTime = (timestamp) => {
    const diff = Math.floor((now - timestamp) / 60000);
    if (diff <= 0) return "now";
    if (diff < 60) return `${diff} min`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hr${Math.floor(diff / 60) > 1 ? 's' : ''}`;
    return `${Math.floor(diff / 1440)} d`;
  };
  // Count unread notifications
  const unreadCount = notification.filter((notif) => !notif.isRead).length;
  // Mark all as read
  const markAllAsRead = () => {
    setNotification((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };
  // Clear all notifications
  const clearAll = () => {
    setNotification([]);
    setPopup(false);
    
  };
  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-4">
        <div>
          <h2 className="font-medium text-xl">Notifications</h2>
          <span className="text-gray-600 text-sm">
            Stay updated with shuttle alerts
          </span>
        </div>
        <div className="flex items-center gap-3">
         
          <div className="py-1 px-3 flex justify-center items-center font-medium text-white bg-blue-500 rounded-2xl">
            <span>{unreadCount} new</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full p-4">
        {notification.length === 0 ? (
          <div className="w-full h-100 flex flex-col items-center justify-center gap-2">
            <BellIcon className="w-10 h-10 text-gray-500" />
            <p className="text-gray-500 text-md">No notifications yet</p>
          </div>
        ) : (
          notification.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`w-full border-1 ${item.borderbg} py-2 rounded-2xl flex justify-between ${item.cardBg}`}
              >
                <div className="flex gap-3 p-4 items-center flex-1">
                  <div className={`py-2 px-2 rounded-full ${item.iconBg}`}>
                    <Icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-md font-medium text-gray-700">
                      {item.title}
                    </h2>
                    <span className="text-[12px] text-gray-700">
                      {item.description}
                    </span>
                  </div>
                </div>
                <div className="flex p-2 pr-4 mt-2">
                  <span className="text-[12px] text-gray-600">
                    {formatTime(item.createdAt)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="p-6 flex gap-6 justify-center">
        {notification.length > 0 && (
          <>
            {unreadCount > 0 && (
              <p
                onClick={markAllAsRead}
                className="text-md text-gray-700 font-small cursor-pointer hover:text-gray-900"
              >
                Mark as read
              </p>
            )}
            <p
              onClick={()=>setPopup(true)}
              className="text-md text-red-500 cursor-pointer hover:text-red-700"
            >
              Clear all
            </p>
          </>
        )}
      </div>


       {popup &&(
        <>
         <div
          onClick={()=>setPopup(false)}
           className="z-20 absolute w-full h-screen bg-black/40 inset-0"></div>
     <div className="w-full px-5 z-30 flex justify-center items-center fixed bottom-1/3">
   <div className="px-8 py-5 rounded-2xl bg-white h-48">
    <h2 className="text-center text-red-600 font-medium">Clear notifications!</h2>
    <p className="text-md text-gray-800 mt-2 text-center">Are you sure you want to clear notifications?</p>
   <div className="border-t-1 border-gray-200  py-3 flex gap-5 w-full justify-between mt-8">
    <button
    onClick={()=>setPopup(false)}
     className="border-r-1 border-gray-200">Cancel</button>
    <button
    onClick={clearAll}
     className="font-medium text-violet-600">Confirm</button>
   </div>


   </div>
     </div>
     </>)}

      <BottomNavbar />
    </div>
  );
}
export default Notifications;