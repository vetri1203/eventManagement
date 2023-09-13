import axios from "axios";
import { useState } from "react";


const Signup = ()=>{
    const[FirstName,setFirstName]= useState('');
    const[LastName,setLastName]= useState('');
    const[PhoneNumber,setPhoneNumber]= useState('');
    const[Email,setEmail]= useState('');
    const[Password,setPassword]= useState('');


    const HandleSubmit =async(e)=>{
        e.preventDefault();
        const response = await axios.post("http://localhost:8081/signup",{
            FirstName,
            LastName,
            Email,
            PhoneNumber,
            Password
        });


        console.log(response.data);
    }
    return(
        <>

        <form action="post"onSubmit={HandleSubmit}>

            <input type="text"
            value={FirstName}
            onChange={(e)=>setFirstName(e.target.value)}
            placeholder="First Name"/>

            <input type="text"
            value={LastName}
            onChange={(e)=>setLastName(e.target.value)}
            placeholder="Last Name"/>

<input type="text"
            value={Email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"/>

<input type="text"
            value={PhoneNumber}
            onChange={(e)=>setPhoneNumber(e.target.value)}
            placeholder="PhoneNumber"/>

            <input type="password"
            value={Password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password"/>

            <button type="submit">Signup</button>

            
        </form>
        </>
    )
}
export default Signup