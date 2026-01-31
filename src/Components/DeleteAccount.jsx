import { XMarkIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

function DeleteAccount() {
   const [popup,setPopup]=useState(false);
   const [deleting,setDeleting]=useState(false);
   const navigate=useNavigate();
      return (
    <div>
      <div className="p-6 w-full">
        <h2 className="text-black text-2xl font-medium">Delete account</h2>
       <Link to="/settings">
        <div 
       
        className="absolute top-5 right-5 py-1.5 px-1.5 bg-gray-100 inline-flex rounded-full">
          <XMarkIcon className="w-6 h-6 text-gray-500" />
        </div>
       </Link>
        <p className="text-md text-gray-700 mt-3 ">
          We're sorry to see you go😪 Are you sure you want to delete your
          account? Once you confirm,your data will be gone.
        </p>

        <div className="mt-12 flex flex-col gap-10">
          <div className="flex gap-5 items-center">
            <input type="checkbox" className="accent-violet-600 w-6 h-6" />
            <h2 className="text-black text-md">
              I am no longer using my account
            </h2>
          </div>

          <div className="flex gap-5 items-center">
            <input type="checkbox" className="accent-violet-600 w-6 h-6" />
            <h2 className="text-black text-md">I am not a Knust Student</h2>
          </div>

          <div className="flex gap-5 items-center">
            <input type="checkbox" className="accent-violet-600 w-6 h-6" />
            <h2 className="text-black text-md">
              I want to change my phone number
            </h2>
          </div>

          <div className="flex gap-5 items-center">
            <input type="checkbox" className="accent-violet-600 w-6 h-6" />
            <h2 className="text-black text-md">
              I don't understand how to use the app
            </h2>
          </div>

          <div className="flex gap-5 items-center">
            <input type="checkbox" className="accent-violet-600 w-6 h-6" />
            <h2 className="text-black text-md">Other</h2>
          </div>

           <button
           onClick={()=>setPopup(true)}
              type="submit"
              className={`mt-15 py-3 bg-red-600 rounded-full text-white font-medium text-lg `}
             
            >
              Delete account
            </button>

             {popup && (
        <>
          <div
        
            className="z-20 absolute w-full h-screen bg-black/40 inset-0"
          ></div>
          <div className="w-full px-5 z-30 right-0  flex justify-center items-center fixed bottom-1/3">
            <div className="px-5 py-5 rounded-2xl bg-white h-54">
              <h2 className="text-center text-red-600 font-medium">Delete account?</h2>
              <p className="text-md text-gray-800 mt-2 text-center">
               we'll delete your account in 20 days.You can restore it anytime during that period
              </p>
              <div className="border-t-1 border-gray-200  py-3 flex gap-5 w-full justify-between mt-8">
                <button
                  onClick={() => setPopup(false)}
                  className="border-r-1 border-gray-200"
                >
                  Don't delete
                </button>
                <button
                 onClick={()=>setDeleting(true)}
                  className="font-medium text-violet-600"
                >
                  Delete account
                </button>
              </div>
            </div>
          </div>
        </>
      )}


   {deleting && (
        <div className="fixed inset-0 bg-white  flex items-center justify-center z-50 p-6">
           <Link to="/settings">
        <div 
       
        className="absolute top-5 right-5 py-1.5 px-1.5 bg-gray-100 inline-flex rounded-full">
          <XMarkIcon className="w-6 h-6 text-gray-500" />
        </div>
       </Link>
          <div className="flex flex-col items-center gap-4">
            {/* <div className="w-12 h-12 border-4 border-white border-t-violet-500 rounded-full animate-spin"></div> */}
            {/* <p className="text-white text-lg font-medium">loading...</p> */}
          <div className="bg-violet-100 py-3 px-3 rounded-full mb-10"><TrashIcon className="w-15 h-15 text-violet-600" /></div>
          <div className="flex flex-col items-center ">
           
            <h2 className="font-medium text-xl text-center">Your account will be deleted soon</h2>
          <span className="text-center mt-5 text-md text-gray-600">If you prefer to keep your account,you can cancel request via the link in your email</span>
          </div>
          <button 
          onClick={()=>navigate("/login")}
          className="mt-20 py-3 w-full rounded-full bg-violet-600 text-white font-medium">I understand</button>
          </div>
        </div>
      )}

        </div>
      </div>
    </div>
  );
}
export default DeleteAccount;
