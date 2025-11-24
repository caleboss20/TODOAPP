

import TodoList from './TodoList'
import "./index.css";
import { Route,Routes } from 'react-router-dom';
import AddTask from './AddTask';

function App() {
 return(
  
    <Routes>
        <Route path='/Home' element={<TodoList />} />
         <Route path='/AddTask' element={<AddTask />} />
      </Routes>
 )
}

export default App
