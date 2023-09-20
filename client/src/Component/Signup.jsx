import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
            const response = await axios.post("http://localhost:8082/signup", {
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
    <>
      <form action="post" onSubmit={HandleSubmit}>
        <input
          type="text"
          value={FirstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />

        <input
          type="text"
          value={LastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />

        <input
          type="tel"
          value={PhoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="PhoneNumber"
          required
        />
        <input
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <button type="submit">Signup</button>
        <button type="submit" onClick={loginNav}>
          Login
        </button>
        <span>{Error}</span>
        <h1>{msg}</h1>
      </form>
    </>
  );
};
export default Signup;
