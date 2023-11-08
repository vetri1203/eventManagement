import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './Component/Login';
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import Signup from './Component/Signup';
import Home from './Component/Home';
import AboutMahal from './Component/AboutMahal';
import Details from './Component/Details';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path='/' Component={App}/>
    <Route path='/login' Component={Login}/>
    <Route path='/signup' Component={Signup}/>
    <Route path='/home' Component={Home}/>
    <Route  path='/about' Component ={AboutMahal}/>
    <Route path='/details' Component={Details}/> 
  </Routes>
  
  </BrowserRouter>
);

