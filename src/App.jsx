
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
import DeleteAccount from "./Components/DeleteAccount";
import FaqSection from "./FaqSection";
import ForgotPassword from "./Components/ForgotPassword";
import Delivery from "./Delivery";
import DeliveryMainpage from "./DeliveryMainpage";


  function App() {
    
   return (
   <Routes>
    <Route path="/" element={<Splashscreen/>}></Route>
     <Route path="/delivery" element={<Delivery />}></Route>
     <Route path="/deliverymainpage" element={<DeliveryMainpage />}></Route>
     <Route path="/mainpage" element={<MainPage  />}></Route>
     <Route path="/mapsection" element={<MapSection/>}></Route>
     <Route path="/settings" element={<Settings />}></Route>
          <Route path="/faqsection" element={<FaqSection />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
      <Route path="/notifications" element={<Notifications />}></Route>
     <Route path="/userprofile" element={<UserProfile />}></Route>
       <Route path="/deleteaccount" element={<DeleteAccount />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
   
   </Routes>

    
  );
}

export default App;
