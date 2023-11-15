import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Style/UpdateUser.css'

const UpdateUser = () => {
  const usertoken = Cookies.get("tokenName");
    const Navigate = useNavigate();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Mail, setMail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState("");
    const [Result, setResult] = useState('');
  useEffect(() => {
      const fetchUserData = async () => {
      if (!usertoken) {
        // Handle the case where the user is not authenticated.
          alert("Login again...");
          return Navigate('/login');
      }
        setMail(jwtDecode(usertoken).Email);
          

      try {
        const response = await axios.post(`http://localhost:8082/update`, {
          Mail,
        });

        if (response.status === 200) {
          const data = response.data;
          setPhoneNumber(data.PhoneNumber);
          setFirstName(data.FirstName);
          setLastName(data.LastName);
        } else {
          // Handle errors or display a message to the user.
          console.error(response.data.error);
        }
      } catch (e) {
        console.error("Network error:", e);
      }
    };

    fetchUserData();
  }, [Mail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8082/updated`, {
        Mail,FirstName,
        LastName,
        PhoneNumber,
      });

        if (response.status === 200) {
           
          setResult("Profile updated successfully");

            
              
            
        //   console.log("Update successful.");
        } else {
          setResult("Unable to update. Please try again later.");
        //   console.error(response.data.error);
        }
    } catch (e) {
        setResult("Unable to update. Please try again later.");
        alert("Unable to update. Please try again later.");
        window.location.reload();
    }
  };


  const Redirect = ()=>{
    Navigate('/home')
  }
  return (
    <>
      <fieldset>
        <legend>{FirstName}</legend>
        <div className="div-updates">
          <form action="" onSubmit={handleSubmit} className="form-updatepage">
            <label htmlFor="firstName" className="label-class">First Name</label><br />
            <input
              type="text"
              id="firstName"
              value={FirstName}
              className="input-update"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br />

            <label htmlFor="LastName" className="label-class">Last Name</label><br />
            <input
              type="text" id="LastName"
              value={LastName}
              className="input-update"
              onChange={(e) => setLastName(e.target.value)}
            />
            <br />

            <label htmlFor="PhoneNumber" className="label-class">Phone Number</label><br />
            <input
              type="text" id="PhoneNumber"
              value={PhoneNumber}
              className="input-update"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <br />

            <button type="submit" className="update">Update</button>
          </form>
        </div>
        <div className="span-and-back-btn">
          <span
          className="span-style"
            style={{
              color:
                Result === "Profile updated successfully" ? "green" : "red",
            }}
          >
            {Result}
          </span>
          <button onClick={Redirect} className="button-back">Back to Home</button>
        </div>

      </fieldset>
    </>
  );
};

export default UpdateUser;
