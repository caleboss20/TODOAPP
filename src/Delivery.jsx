
import food from "./assets/drink.jpg";
import driver2 from "./assets/drive2.png";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
function Delivery(){
 return(
    <div className="w-full h-screen flex items-center justify-center ">
        <div className="relative w-full h-full overflow-hidden ">
            <img src={food}
            className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-20">
            <div className="absolute bottom-0 left-0 right-0 top-110 inset-0 bg-black/2 z-20">
              <div className="mt-5 flex flex-col p-6 gap-6 items-center justify-center">
                <h2 className="font-medium text-2xl text-center text-gray-200 "><span className="">Crush Your </span>Hunger, The Boss way!</h2>
             <p className=" text-gray-200 text-lg text-center">Order fast foods in minutes!</p>
            <Link to="/deliverymainpage" className="shadow-lg w-full flex rounded-xl bg-yellow-600 
              
              font-medium text-lg mt-2 text-white py-4 px-9 items-center justify-between">
             
                <div></div>
               Browse Menu
                <span><ArrowRightIcon className="w-5 h-5 cursor-pointer"/></span>
                
            </Link>
              
              </div>
            </div>
            </div>



        </div>

    </div>
 )
}
export default Delivery;