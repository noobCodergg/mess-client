
import "./App.css";

import Registration from "./Pages/registration";
import Otp from "./Pages/otp";
import Login from "./Pages/login"; 

import { Route, Routes } from "react-router-dom";
import UserProvider from "./Context/UserContext";
import ProtectedRoute from "./Routes/protectedRoute";



import Unauthorized from "./Pages/Unauthorized";
import Home from "./Pages/Home";
import ShopEntry from "./Pages/shopEntry";
import MyRecord from "./Pages/myRecord";
import MealTracker from "./Pages/meal";
import Summery from "./Pages/Summery";
import Navbar from "./Pages/Navbar";
import Admin from "./Pages/Admin";






function App() {
  return (
    <UserProvider>
      <Navbar/>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
           <Route
          path="/home"
          element={
            <ProtectedRoute role={["admin","user"]}>
              <Home/>
            </ProtectedRoute>
          }
        />


          <Route
          path="/entry"
          element={
            <ProtectedRoute role={["admin","user"]}>
              <ShopEntry/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/record/:userId"
          element={
            <ProtectedRoute role={["admin","user"]}>
              <MyRecord/>
            </ProtectedRoute>
          }
        />

         <Route
          path="/meal"
          element={
            <ProtectedRoute role={["admin","user"]}>
              <MealTracker/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/summery"
          element={
            <ProtectedRoute role={["admin","user"]}>
              <Summery/>
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin"
          element={
            <ProtectedRoute role={["admin"]}>
              <Admin/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;