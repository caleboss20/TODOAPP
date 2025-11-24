import { useState } from "react";
import {
  BellIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  PlusIcon,TrashIcon
} from "@heroicons/react/24/outline";
import image from "./assets/mettle2.jpg";
import { Link } from "react-router-dom";
import { UseTodos } from "./TodoContext";
function TodoList() {
  const {totalItems,handleDelete}=UseTodos();
  
  return (
    <div className="w-full h-screen bg-none">
      <div className="w-full h-96 relative z-0 bg-violet-200 pl-5 pr-5 ">
        <section className="pl-4 pr-4 flex justify-between w-full pt-10 bg-viole-500 h-20 items-center">
          <div className="w-12 rounded-full h-12 bg-red-500">
            <img src={image} className="rounded-full" alt="" />
          </div>
          <div className="flex gap-7">
            <div className="flex items-center justify-center rounded-full bg-white w-12 h-12 ">
              <BellIcon className="w-8 h-8 text-gray-500 " />
            </div>
          </div>
        </section>

        <div className="mt-15  flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-[#121212]">Hey there,Caleb</h2>

          <div className=" h-17 bg-white items-center pl-4 pr-4 rounded-full flex justify-between mt-10 w-full ">
            <MagnifyingGlassIcon className="ml-4 w-7 h-7" />
            <input
              type="text"
              className="flex-1 pr-6 pl-5 text-base  border-none outline-none "
              placeholder="Search task"
            />
            <div>
              <Bars3Icon className="w-7 h-7 mr-4" />
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="w-full p-5 h-155 relative shadow-2xl z-10 -mt-12 bg-white rounded-t-4xl">
          <h2 className="text-xl font-medium p-6">Today's Tasks</h2>
          <div className="flex flex-col gap-5">
            {/**for each item */}
            {totalItems.map((item,index)=>
            <div key={index} className="flex justify-between  items-center gap-5 w-full p-5 bg-gray-100 rounded-3xl">
             <div className="flex gap-7 items-center">
              <input type="checkbox" className="w-6 h-6 accent-violet-500 " />
              <div className="flex flex-col">
                <h2 className="text-2xl font-medium">{item.task}</h2>
                <p className="text-[20px]">{item.start} - {item.end}</p>
                <span className="text-gray-700">{item.priority}</span>
              </div>
              </div>
              <div onClick={handleDelete(index)}><TrashIcon className="w-7 h-7"/></div>
              
            </div>
            )}


            {/**end of the item */}
          </div>
          <Link to="/AddTask">
          <button className="cursor-pointer border-none outline-none flex justify-center gap-4 w-full py-5 text-white text-xl font-medium bg-violet-500 rounded-xl mt-20">
            <span className=""><PlusIcon className="w-7 h-7"/></span>
            Add a new task{" "}
          </button>
         </Link>
          
        </div>
      </section>
    </div>
  );
}
export default TodoList;
