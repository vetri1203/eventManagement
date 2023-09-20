import express from 'express';
import { Login } from '../Components/Login.js';
import { Signup } from '../Components/Signup.js';
import { AddMahal } from '../Components/AddMahal.js';
import { Search } from '../Components/Search.js';



export const Routes = express.Router();

Routes.post('/login',Login);
Routes.post('/signup',Signup);
Routes.post('/mahal',AddMahal);
Routes.post('/search',Search)