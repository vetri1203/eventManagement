import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { Routes } from "./Routers/Routes.js";

const app = express();
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(Routes);

//dataBase connection

// Mongodb Compass: 'mongodb://127.0.0.1:27017/event'
//Mongodb Atlas: process.env.MONGO_URL

mongoose 
  .connect("mongodb://127.0.0.1:27017/event") 
  // .connect(process.env.MONGO_URL)
  .then(() => console.log("DataBase connected sucessfully"))
  .catch((e) => console.log(`Error while connecting DataBase ${e}`));

//assigning port number
app.listen(8082, () =>
  console.log(`app listening in port of ${process.env.PORT_No}`)
);
