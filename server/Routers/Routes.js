import express from 'express';
import { Login } from '../Components/Login.js';
import { Signup } from '../Components/Signup.js';


export const Routes = express.Router();

Routes.post('/login',Login);
Routes.post('/signup',Signup);