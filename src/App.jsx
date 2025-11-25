

import TodoList from './TodoList'
import "./index.css";
import { Route,Routes } from 'react-router-dom';
import AddTask from './AddTask';
import { useEffect, useState } from 'react';
import SplashScreen from './SplashScreen';

function App() {
   const [name, setName] = useState("");
    const [totalItems, setTotalItems] = useState(
      ()=>{
        const saved=localStorage.getItem("totalItems");
        return saved?JSON.parse(saved): [];
      });

      useEffect(()=>{
        localStorage.setItem("totalItems",JSON.stringify(totalItems))
      },[totalItems])
      
      
  const [searchQuery,setsearchQuery]=useState('');
  const [addeditem, setAddedItem] = useState(false);
  const [editError,setEditError]=useState('');
  const [editIndex,setEditIndex]=useState(null);
  const [editValue,setEditValue]=useState('');
  

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
    if (!task.trim() || !start.trim() || !end.trim() || !priority.trim()) return;
  
    const newTask= {...taskInput,completed:false}
      setTotalItems([...totalItems,newTask])
    
     setTask({ task: "", start: "", end: "", priority: "" });
    setAddedItem(!addeditem);
  };
  // Delete task by index
  const handleDelete = (i) => {
    const newItems = [...totalItems];
    newItems.splice(i, 1); 
    setTotalItems(newItems);
  };

  //for the filter items//
  const displayedItems=totalItems.filter(item=>
    searchQuery===""||
    item.task.toLowerCase().includes(searchQuery.toLowerCase())
   )

   //for toggle for strike through list//
  const toggleCompleted=(index)=>{
   const newItems=[...totalItems];
   newItems[index].completed=!newItems[index].completed;
   setTotalItems(newItems);
  }

//for the editing of todolist//
  const handleEdit=(index)=>{
    setEditIndex(index);
    setEditValue(totalItems[index].task);
  }
//for saving of edited todo//
  const handleSave=(index)=>{
   const updated=[...totalItems];
   updated[index].task=editValue.trim();
   setTotalItems(updated);
   setEditIndex(null);
   setEditValue('');
  }




 return(
    <Routes>
      <Route path='/'
       element={<SplashScreen name={name} setName={setName}/>}/>
        <Route path='/TodoList' element={
         <TodoList
         name={name} 
         handleDelete={handleDelete}
          displayedItems={displayedItems}
         totalItems={totalItems}
         searchQuery={searchQuery}
         setsearchQuery={setsearchQuery}
         toggleCompleted={toggleCompleted}
         handleEdit={handleEdit}
         handleSave={handleSave}
         editValue={editValue}
         editIndex={editIndex}
         setEditValue={setEditValue}
         />
          
         } />

         <Route path='/AddTask' element={
            
         <AddTask 
          addeditem={addeditem}
          taskInput={ taskInput}
          handleInput={handleInput}
          handleClick={handleClick}/>} />
          
      </Routes>
 )
}

export default App
