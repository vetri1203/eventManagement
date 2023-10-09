import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Style/Signup.css';
import firstimage from '../Component/Images/Perfect_Planners.png';
import secondimaeg from '../Component/Images/signupimage.jpeg';

const Signup = () => {
  const nav = useNavigate();

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [getdata, setgetData] = useState({
    isLoading: false,
    isData: undefined,
    serverError: null,
  });


  useEffect(() => {
    if (getdata.isLoading) {
      setMsg("Loading");
      console.log("Loading....");
    } else {
      setMsg("");
    }
  }, [getdata.isLoading]);

  const validEmail = (email) => {
    const checkemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return checkemail.test(email);
  };

  const validNumber = (PNumber) => {
    const checknumber = /^[0-9]$/;
    return checknumber.test(PNumber);
  };

  const validPassword = (Password) => {
    return Password.length > 7;
  };

 


  const HandleSubmit = async (e) => {
    setError("");
    e.preventDefault();

    if (validEmail(Email)) {
      setgetData((prev) => ({ ...prev, isLoading: true }));
      if (!validNumber(PhoneNumber)) {
        if (validPassword(Password)) {
          try {
            const response = await axios.post("http://localhost:8081/signup", {
              FirstName,
              LastName,
              Email,
              PhoneNumber,
              Password,
            });

            if (response.data === "Signup successful") {
              setgetData((prev) => ({
                ...prev,
                isLoading: false,
                isData: response.data,
              }));

              setEmail("");
              setPassword("");
              setFirstName("");
              setLastName("");
              setPhoneNumber("");
              setError("");
              alert(response.data);
              nav("/login");
            } else {
              setgetData((prev)=>({...prev,isLoading:false}))
              return setError(response.data);
            }
          } catch (error) {
            setgetData((prev) => ({
              ...prev,
              isLoading: false,
              isData: undefined,
              serverError: error,
            }));
          }
          //connect to database
        } else {
          setPassword("");
          return setError("Password length should be in the range of 8-15");
        }
      } else {
        return setError("Enter the Proper Number");
      }
    } else {
      return setError("Enter the Proper Email");
    }
  };

  const loginNav = () => {
    nav("/login");
  };

  return (
    <div className="main_container">
    <>

    <img src={firstimage} alt="logo" className="logosignupImage" />

    <img src={secondimaeg} alt="loginimage" className="signupimage" />
      <form action="post" onSubmit={HandleSubmit}>

      <h1 className="HeadingSignup">SignUp</h1><br/>

      <h4 className="Quotesignup">Unlock exclusive access and join our community by SignUp up today.</h4><br/>

        <input
        className="FirstName"
          type="text"
          value={FirstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />

        <input
        className="LastName"
          type="text"
          value={LastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />

        <input
          className="PhoneNumber"
          type="tel" 
          value={PhoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="PhoneNumber"
          required
        />

        <input
          className="Email"
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          className="Password"
          type="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <span>{Error}</span>

        <button type="submit" className="Signupbtn">Signup</button>
        <button type="submit" onClick={loginNav} className="logintopage">
          Login
        </button>
        <h1>{msg}</h1>
      </form>
    </>
    </div>
  );
};
export default Signup;
