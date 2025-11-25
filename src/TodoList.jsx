import { BellIcon, MagnifyingGlassIcon, Bars3Icon,PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import image from "./assets/mettle2.jpg";
import { Link } from "react-router-dom";
function TodoList({handleDelete, displayedItems,totalItems,
  searchQuery,setsearchQuery,toggleCompleted,
  editIndex, editValue,setEditValue,handleEdit,handleSave}) {

  return (
    <div className="w-full h-screen bg-none">
      {/* Header Section */}
      <div className="w-full h-96 relative z-0 bg-violet-200 pl-5 pr-5 ">
        <section className="pl-4 pr-4 flex justify-between w-full pt-10 bg-viole-500 h-20 items-center">
          <div className="w-12 rounded-full h-12 bg-500">
            <img src={image} className="rounded-full" alt="" />
          </div>
          <div className="flex gap-7">
            <div className="flex items-center justify-center rounded-full bg-white w-12 h-12 ">
              <BellIcon className="w-8 h-8 text-gray-500 " />
            </div>
          </div>
        </section>
        {/* Greeting & Search */}
        <div className="mt-15 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-[#121212]">Hey there, {localStorage.getItem("trimmed")}</h2>
          <div className="h-17 bg-white items-center pl-4 pr-4 rounded-full flex justify-between mt-10 w-full">
            <MagnifyingGlassIcon className="ml-4 w-7 h-7" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e)=>setsearchQuery(e.target.value)}
              className="flex-1 pr-6 pl-5 text-base border-none outline-none"
              placeholder="Search task"
            />
            <div>
              <Bars3Icon className="w-7 h-7 mr-8 " />
            </div>
          </div>
        </div>
      </div>
      {/* Tasks Section */}
      <section>
        <div className="w-full p-5 relative  z-10 -mt-12 bg-white rounded-t-4xl">
          <h2 className="text-xl font-medium p-6 text-center">{totalItems.length===0?"No Items added Yet ":displayedItems.length===0?"No tasks matched your search 🙁":"Today's Task"}</h2>
          <div className="flex flex-col gap-5">
            {/** Render each task */}
            { displayedItems.map((item,index) => (
              <div
                key={index}
                className="flex justify-between items-center gap-5 w-full p-5 bg-gray-100 rounded-3xl">
                <div className="flex gap-7 items-center">
                  <input 
                  checked={item.completed}
                  onChange={()=>toggleCompleted(index)}
                  type="checkbox"
                  className="w-6 h-6 accent-violet-500 " />
                  <div className="flex flex-col">
                    {editIndex===index?
                    (
                      <input type="text"
                      value={editValue}
                      onChange={(e)=>setEditValue(e.target.value)}
                      onBlur={()=>handleSave(index)}
                      className="text-xl w-40 outline-none border-b border-gray-400 focus:border-violet-500"
                      />
                    )
                    :
                    (<h2 className={`${item.completed? 'line-through text-gray-400 text-1xl font-medium':'text-1xl font-medium'}`}>{item.task}</h2>)
                    }

                    
                    <p className="text-[18px]">
                      {item.start} - {item.end}
                    </p>
                    <span className="text-gray-700">{item.priority}</span>
                  </div>
                </div>
                

                
                <div className="flex gap-10">
                 <div onClick={()=>handleEdit(index)}><PencilSquareIcon className="w-7 h-7"/></div>
                  <div onClick={() => handleDelete(index)}><TrashIcon className="w-7 h-7" /></div>
                </div>
              </div>
            ))}
          </div>
          {/* Add new task button */}
          <Link to="/AddTask">
            <button className="cursor-pointer border-none outline-none flex justify-center gap-4 w-full py-5 text-white text-xl font-medium bg-violet-500 rounded-xl mt-20">
              <span>
                <PlusIcon className="w-7 h-7" />
              </span>
              Add a new task
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
export default TodoList;
