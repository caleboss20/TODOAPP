import { ArrowLeftIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ArrowLeftCircleIcon, CameraIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  return (
    <div className="w-full ">
      <div className="p-6 flex justify-between items-center">
        <div onClick={() => navigate("/settings")} className="p-1 bg-white">
          <ArrowLeftIcon className="w-6 h-6" />
        </div>

        <div>
          <h2 className="mr-8 text-md">User Profile</h2>
        </div>
        <div></div>
      </div>

 {/**the image section**/}

 <div className="flex justify-center mt-5">
  <div className="relative border-gray-200 border-3 object-fit w-22 h-22 rounded-full bg-re-500">
    <img alt="" />
    <div className="z-10 absolute py-1 px-1 bg-white border-1 border-gray-300 -bottom-1 right-1 rounded-full"><CameraIcon className="w-5 h-5 "/></div>
   </div>
   
 </div>

 {/**the form section */}
   <form action=""className="p-4 mt-6">
    <div className="flex flex-col gap-5">
       <div className="flex flex-col gap-3">
        <label className="text-gray-700 text-md">Full Name</label>
        <input type="text"className="w-full border-1 border-gray-300 rounded-full py-3 px-2" />
        </div> 

         <div className="flex flex-col gap-2">
        <label className="text-gray-700 text-md">Role</label>
        <input type="text"placeholder="Student"className="w-full border-1 border-gray-300 rounded-full py-3 px-3" />
        </div> 


         <div className="flex flex-col gap-2">
        <label className="text-gray-700 text-md">E-mail</label>
        <input type="email"className="w-full border-1 border-gray-300 rounded-full py-3 px-2" />
        </div> 

         <div className="flex flex-col gap-2">
        <label className="text-gray-700 text-md">Mobile</label>
        <input type="number"placeholder="050-545-9921"className="w-full border-1 border-gray-300 rounded-full py-3 px-2" />
        </div>
        
         <button className="mt-10 py-3 bg-blue-700 rounded-full text-white font-medium text-lg">Save</button>



    </div>
   </form>


    </div>
  );
}
export default UserProfile;
