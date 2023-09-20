import { useState } from "react";
import  './Style/Login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import firstimage from '../Component/Images/Perfect_Planners.png';
import secondimaeg from '../Component/Images/login_image.jpg';
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const [status, setStatus] = useState("");

  const [getData, setGetData] = useState({
    isLoading: false,
    isdata: undefined,
    serverError: null,
  });

  useEffect(() => {
    if (getData.isLoading) {
      setStatus('Loading');
      console.log('Loading...');
    }
    else{
      setStatus('');
    }
  }, [getData.isLoading]);

  const validEmail = (email) => {
    const checkemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return checkemail.test(email);
  };

  const validPassword = (password) => {
    return password.length >= 8 && password.length <= 15;
  };

  const HandleSubmit = async (e) => {
    setError('');
    e.preventDefault();

    if (validEmail(Email)) {
      setGetData((prev) => ({ ...prev, isLoading: true }));
      if (validPassword(Password)) {
        try {
          const response = await axios.post("http://localhost:8082/login", {
            Email,
            Password,
          });

          if (response.data === "ok Login") {
            setGetData((prev) => ({ ...prev, isLoading: false, isdata: true }));
            setError("");
            setEmail("");
            setPassword("");
            
            setStatus("Logged In");
            navigate("/");
          } else {
            setGetData((prev) => ({ ...prev, isLoading: false }));

            setError(response.data);
          }
        } catch (error) {
          setStatus('')
          setGetData((prev) => ({
            ...prev,
            isLoading: false,
            serverError: error,
          }));
        }
      } else {
        setError("Password length should be in the range of 8-15");
      }
    } else {
      setError("Enter the Proper Email");
    }
  };

  const EmailChange = (e) => {
    setEmail(e.target.value);
  };

  const PasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const SignupLink = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="Logincontainer">

      <img src={firstimage} alt="logo" className="logoImage" />

      <img src={secondimaeg} alt="loginimage" className="loginimage" />

        <form action="post" onSubmit={HandleSubmit} className="formlogin">

          <h1 className="HeadingLogin">Login</h1><br/>

          <h4 className="QuoteLogin">To keep connected with us please login with your personal information by email and password.</h4><br/>

          <input
            className="inputEmail"
            type="email"
            placeholder="Email"
            value={Email}
            onChange={EmailChange}
          /><br/>
          <input
            className="inputPassword"
            type="password"
            placeholder="Password"
            value={Password}
            onChange={PasswordChange}
          /><br/>

          <button className="SubmitBtn" type="submit">Login</button>
         

          <button className="SubmitAccountBtn" onClick={SignupLink}>Create Account</button>

          <span>{Error}</span>
          <h1>{status}</h1>
        </form>
      </div>
    </>
  );
};

export default Login;
