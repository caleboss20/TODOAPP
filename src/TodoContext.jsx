<<<<<<< HEAD
import { createContext, useState, useContext } from "react";
const TodoContext = createContext();
function TodoProvider({ children }) {
  const [totalItems, setTotalItems] = useState([]); // your array of tasks
  const [addeditem, setAddedItem] = useState(false);
  const [taskInput, setTask] = useState({
    task: "",
    start: "",
    end: "",
    priority: "",
  });
  // Handle input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };
  // Add task
  const handleClick = () => {
    const { task, start, end, priority } = taskInput;
    if (!task.trim() || !start.trim() || !end.trim() || !priority.trim())
      return;
    setTotalItems([...totalItems, taskInput]);
    setTask({ task: "", start: "", end: "", priority: "" });
    setAddedItem(!addeditem);
  };
  // Delete task by index
  const handleDelete = (i) => {
    const newItems = [...totalItems];
    newItems.splice(i, 1); // same logic as your original
=======
import { createContext,useState,useContext } from "react";
const TodoContext=createContext();

function TodoProvider({children}){
 const [taskInput,setTask]=useState(
    {
        task:"",
        start:"",
        end:"",
        priority:"",


    }
);
 const [totalItems,setTotalItems]=useState([]);
 const [addeditem,setAddedItem]=useState(false);
 
 const handleInput=(e)=>{
 const {name,value}=e.target;
 setTask(prev=>({...prev,[name]:value}));
 }
  const handleClick = () => {
  const { task, start, end, priority } = taskInput;
  if(!task.trim() || !start.trim() || !end.trim() || !priority.trim()) return;
  setTotalItems([...totalItems, taskInput]);
  setTask({ task:"", start:"", end:"", priority:"" });
  setAddedItem(!addeditem);
}
  const handleDelete=(i)=>{
    const newItems=[...totalItems];
    newItems.splice(i,1);
>>>>>>> af4a0c3f19f3127ae54cb168956ab83834902b53
    setTotalItems(newItems);
  };
  return (
    <TodoContext.Provider
      value={{
        totalItems,
        addeditem,
        taskInput,
        setTask,
        handleInput,
        handleClick,
        handleDelete,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
export default TodoProvider;
<<<<<<< HEAD
// Safe hook for hot reload
export function UseTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    console.warn("UseTodos must be used within a TodoProvider");
    return {};
  }
  return context;
=======
export function UseTodos(){
 return useContext(TodoContext);
>>>>>>> af4a0c3f19f3127ae54cb168956ab83834902b53
}
