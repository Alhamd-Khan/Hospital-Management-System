import React from 'react'
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./src/pages/Home";
import Appointment from "./src/pages/Appointment";
import AboutUs from "./src/pages/AboutUs";
import Register from './src/pages/Register';
import Login from './src/pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
      <>
      <Router>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/appointment' element={<Appointment/>}/>
            <Route path='/about' element={<AboutUs/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
        <ToastContainer position="top-center"/>
      </Router>
      </>
    )
}

export default App;