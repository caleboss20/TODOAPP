import {
  BellAlertIcon,
  ChevronRightIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import BottomNavbar from "./Components/BottomNavbar";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import ToggleButton from "./Components/ToggleButton";
import { useState } from "react";

function Settings() {
  const navigate=useNavigate();
  const [popup, setPopup] = useState(false);
  const [logout, setLogOut] = useState(false);
  return (
    <div className="w-full">
      <div className="p-4 mt-5">
        <h2 className="text-2xl font-medium">Settings</h2>

        <div className="flex w-full mt-10 justify-between items-center">
          <div className="flex gap-2">
            <div className="w-12 h-12 bg-blue-400 rounded-full"></div>
            <div className="flex flex-col gap-0.5">
              <span className="text-gray-600 text-sm">Welcome</span>
              <h2 className="text-gray-900 text-md font-medium">Mr.Caleboss</h2>
            </div>
          </div>

          <div onClick={()=>setLogOut(true)}>
            <ArrowRightEndOnRectangleIcon className="w-17 h-6 text-blue-900" />
          </div>
        </div>
      </div>

      {/** middle section*/}
      <div className="p-6 mt-5 flex flex-col">
        <Link to="/userprofile">
          <div className="py-5 flex items-center justify-between border-b-[1px] border-t-[1px] border-gray-100">
            <div className="flex gap-3 items-center">
              <UserCircleIcon className="w-6 h-6 text-gray-700" />
              <p className="text-black font-small text-md">User Profile</p>
            </div>
            <div>
              <ChevronRightIcon className="w-12 h-4" />
            </div>
          </div>
        </Link>

        <div
          onClick={() => setPopup(true)}
          className="py-5 flex items-center justify-between border-b-[1px] border-t-[1px] border-gray-100"
        >
          <div className="flex gap-3 items-center">
            <LockClosedIcon className="w-6 h-6 text-gray-700" />
            <p className="text-black font-small text-md">Change Password</p>
          </div>
          <div>
            <ChevronRightIcon className="w-12 h-4" />
          </div>
        </div>

        <div 
        className="py-5 flex items-center justify-between border-b-[1px] border-t-[1px] border-gray-100">
          <div className="flex gap-3 items-center">
            <QuestionMarkCircleIcon className="w-6 h-6 text-gray-700" />
            <p className="text-black font-small text-md">FAQs</p>
          </div>
          <div>
            <ChevronRightIcon className="w-12 h-4" />
          </div>
        </div>

        <div className="py-5 flex items-center justify-between border-b-[1px] border-t-[1px] border-gray-100">
          <div className="flex gap-3 items-center">
            <BellAlertIcon className="w-6 h-6 text-gray-700" />
            <p className="text-black font-small text-md">Push Notification</p>
          </div>
          <div>
            <ToggleButton />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className=" py-5 px-11 flex gap-3 flex-col justify-center items-center w-full rounded-2xl bg-gray-100">
          <span className="text-black text-sm text-center">
            If you have any other query you can reach out to us.
          </span>
          <span className="underline text-blue-900 text-center text-sm">
            Whatsapp Us
          </span>
        </div>
      </div>

      <BottomNavbar />

      {/**the password popup */}
      {popup && (
        <>
          <div
          onClick={()=>setPopup(false)}
           className="z-20 absolute w-full h-screen bg-black/40 inset-0"></div>

          <div className="right-0 left-0 bottom-0 fixed z-50 w-full bg-white h-[320px] rounded-tl-2xl rounded-tr-2xl">
            <div className="flex justify-center mt-4">
                <div className="w-15 h-[3px] bg-gray-500 rounded-full "></div>
                
            </div>
            <h2 className="text-center mt-4 font-medium text-lg">Change Password</h2>
          

          <div className="flex flex-col gap-4 mt-4 p-4">
            <input type="password"placeholder="New Password"className="w-full border-1 border-gray-300 rounded-full py-3 px-5" />
            <input type="password"placeholder="confirm Password"className="w-full border-1 border-gray-300 rounded-full py-3 px-5" />
           <button className="mt-2 py-3 bg-blue-700 rounded-full text-white font-medium text-lg">Save</button>
          </div>
          
          </div>
        </>
      )}


      {/**for the logout section */}
     {logout &&(
        <>
         <div
          onClick={()=>setLogOut(false)}
           className="z-20 absolute w-full h-screen bg-black/40 inset-0"></div>
     <div className="w-full px-5 z-30 flex justify-center items-center fixed bottom-1/3">
   <div className="px-8 py-5 rounded-2xl bg-white h-40">
    <h2 className="text-center text-red-600 font-medium">Logout!</h2>
    <p className="text-md text-gray-800 mt-2">Are you sure you want to logout?</p>
   <div className="border-t-1 border-gray-200  py-3 flex gap-5 w-full justify-between mt-8">
    <button
    onClick={()=>setLogOut(false)}
     className="border-r-1 border-gray-200">Cancel</button>
    <button
    onClick={()=>navigate("/login")}
     className="font-medium text-violet-600">Confirm</button>
   </div>


   </div>
     </div>
     </>)}
    </div>
  );
}
export default Settings;
