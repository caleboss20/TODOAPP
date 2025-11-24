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
  const handleClick=()=>{
    setTotalItems([...totalItems,taskInput]);
    const {task,start,end,priority}=taskInput
    if(!task.trim() ||!start.trim()|| !end.trim() ||!priority.trim() )return;
    setTask({task:"",start:"",end:"",priority:""});
   
   setAddedItem(!addeditem);

  }   
  const handleDelete=(i)=>{
    const newItems=[...totalItems];
    newItems.splice(i,1);
    setTotalItems(newItems);
  } 
   
    return(
        <TodoContext.Provider
        value={{addeditem,taskInput,setTask,handleInput,handleClick,handleDelete,totalItems}}>
            {children}
        </TodoContext.Provider>
    )

}
export default TodoProvider;
export function UseTodos(){
 return useContext(TodoContext);
}