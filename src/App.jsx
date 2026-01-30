
  import "./index.css";
  import { Route, Routes } from "react-router-dom";
  import Splashscreen from "./SplashScreen";
import MainPage from "./MainPage";
import Settings from "./Settings";
import UserProfile from "./UserProfile";
import LoginForm from "./Forms/LoginForm";
import SignUp from "./Forms/SignUp";
import { useState } from "react";
import Notifications from "./Notifications";
import MapSection from "./MapSection";


  function App() {
    
   return (
   <Routes>
    <Route path="/" element={<Splashscreen/>}></Route>
     <Route path="/mainpage" element={<MainPage  />}></Route>
     <Route path="/mapsection" element={<MapSection/>}></Route>
     <Route path="/settings" element={<Settings />}></Route>
      <Route path="/notifications" element={<Notifications />}></Route>
     <Route path="/userprofile" element={<UserProfile />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
   
   </Routes>

    
  );
}

export default App;
