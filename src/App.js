
import React from 'react';
import './App.css';
import Header from './component/Header/Header';
import AddEmployee from './pages/Addemployee/AddEmployee';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const PrivateRoute = ({ children }) => {
  const token = window.localStorage.getItem("token");
    return token ? <><Header /> {children}</>  : <Navigate to="/login" />
  }
  return (
    <div className="App">
      <Router>
       
        <Routes>
          <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/addEmployee' element={<PrivateRoute><AddEmployee /></PrivateRoute>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
