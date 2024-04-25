/* Copyright 2023 Google LLC. This software is provided as-is, without warranty
 or representation for any use or purpose. Your use of it is subject to your
 agreement with Google. */
 /*This code is not production ready */

import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import Dashboard from './Pages/Dashboard/Dashboard';
import Admin from './Pages/Admin/Admin';

import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/Auth-context';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />}></Route>
        <Route path="/dashboard" exact element={<Dashboard />}></Route>
        <Route path="/admin" exact element={<Admin />}></Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    
  )
}

export default App;
