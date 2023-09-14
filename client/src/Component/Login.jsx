import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");

  const validEmail = (email) => {
    const checkemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return checkemail.test(email);
  };

  const validPassword = (Password) => {
    return Password.length > 7;
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (validEmail(Email)) {
      if (validPassword(Password)) {
        const response = await axios.post("http://localhost:8082/login", {
          Email,
          Password,
        });

        if (response.data === "ok Login") {
          setError("");
          setEmail("");
          setPassword("");
          alert("Loged In...");
          navigate("/");
        } else {
          return setError(response.data);
        }
      } else {
        return setError("Password length should be in the range of 8-15");
      }
    } else {
      return setError("Enter the Proper Email");
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
        <form action="post" onSubmit={HandleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={Email}
            onChange={EmailChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={Password}
            onChange={PasswordChange}
          />

          <button type="submit">Login</button>

          <button onClick={SignupLink}>Signup</button>

          <span>{Error}</span>
        </form>
      </div>
    </>
  );
};

export default Login;
