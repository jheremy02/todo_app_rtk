import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ModalEditTask from "./components/ModalEditTask";
import Modal from "react-modal";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import { useSelector } from "react-redux";
import RequireAuth from "./components/Auth/RequireAuth";
import { initFlowbite } from "flowbite";
import "react-toastify/dist/ReactToastify.css";
Modal.setAppElement("#root");

function App() {
  const isLogged = useSelector((state) => state.auth.auth);
  let location = useLocation();
  useEffect(()=>{
    initFlowbite()
  },[location])

  return (
    <Routes >
      <Route
        path="/home"
        index
        element={
          <RequireAuth isLogged={isLogged}>
            <Home></Home>
          </RequireAuth>
        }
        
      ></Route>
      <Route path="/login" element={<LoginPage></LoginPage>} ></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/" element={<Navigate to={"/home"}></Navigate>}></Route>
    </Routes>
  );
}

export default App;
