import { Bars3Icon, BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function DeliveryNavbar(){
 return(
    <div className="flex pt-6 pl-4 pr-4 justify-between">
        <div><Bars3Icon className="w-6 h-6 color-black"/></div>
       <div className="flex gap-5">
        <MagnifyingGlassIcon className="w-6 h-6 color-black"/>
        <BellIcon className="w-6 h-6 color-black"/>
       </div>
    </div>
 )
}
export default DeliveryNavbar;