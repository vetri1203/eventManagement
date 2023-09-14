import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './Component/Login';
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import Signup from './Component/Signup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path='/' Component={App}/>
    <Route path='/login' Component={Login}/>
    <Route path='/signup' Component={Signup}/>
  </Routes>
  
  </BrowserRouter>
);

