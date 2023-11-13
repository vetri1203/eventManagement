import express from 'express';
import { Login } from '../Components/Login.js';
import { Signup } from '../Components/Signup.js';
import { AddMahal } from '../Components/AddMahal.js';
import { Search } from '../Components/Search.js';
import { AboutMahal } from '../Components/AboutMahal.js';
import NewSearch from '../Components/NewSearch.js';
// import {  } from '../Components/Booking.js';
import bookMahal from '../Components/Booking.js';
import {UpdateUser,  UpdatedUser } from '../Components/UpdateUser.js';



export const Routes = express.Router();

Routes.post('/login',Login);
Routes.post('/signup',Signup);
Routes.post('/mahal',AddMahal);
Routes.post('/search',Search);
Routes.post('/new',NewSearch);
Routes.post('/booking',bookMahal)
Routes.post('/about', AboutMahal);
Routes.post('/update', UpdateUser);
Routes.post('/updated', UpdatedUser);