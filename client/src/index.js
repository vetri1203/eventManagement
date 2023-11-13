import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./Component/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Signup from "./Component/Signup";
import details from "./Component/Detail";
import AboutMahal from "./Component/AboutMahal";
import home from "./Component/Home";
import UpdateUser from "./Component/UpdateUser.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={App} />
      <Route path="/login" Component={Login} />
      <Route path="/signup" Component={Signup} />
      <Route path="/details" Component={details} />
      <Route path="/about" Component={AboutMahal} />
      <Route path="/home" Component={home} />
      <Route path="/update" Component={UpdateUser} />
    </Routes>
  </BrowserRouter>
);
