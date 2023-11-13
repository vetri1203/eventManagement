import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const usertoken = Cookies.get("tokenName");
    const Navigate = useNavigate();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Mail, setMail] = useState(jwtDecode(usertoken).Email);
  const [PhoneNumber, setPhoneNumber] = useState("");
    const [Result, setResult] = useState('');
  useEffect(() => {
    const fetchUserData = async () => {
      if (!usertoken) {
        // Handle the case where the user is not authenticated.
        return alert("Login again...");
      }

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

  return (
    <>
      <fieldset>
        <legend>{FirstName}</legend>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />

          <label htmlFor="LastName">Last Name</label>
          <input
            type="text"
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />

          <label htmlFor="PhoneNumber">Phone Number</label>
          <input
            type="text"
            value={PhoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <br />

          <button type="submit">Update</button>
        </form>
        <span
          style={{
            color:
              Result === "Profile updated successfully" ? "green" : "red",
          }}
        >
          {Result}
        </span>
      </fieldset>
    </>
  );
};

export default UpdateUser;
