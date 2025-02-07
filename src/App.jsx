import {React,useState,useEffect} from "react";
import { useDispatch } from "react-redux";
import authservice from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

const App = () => {
  const [loding, setLoding] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authservice.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoding(false);
      });
  }, []);

  return  !loding ? (
  <div className=" min-h-screen flex-wrap content-between bg-gray-200 ">
  <div className="w-full block">
    <Header/> 
    <main>
    <Outlet/>
    </main>
    <Footer/>

  </div>
  </div>

  ): null
};

export default App;

