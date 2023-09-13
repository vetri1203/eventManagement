import { useState } from "react";
import axios from 'axios';

const Login =  ()=>{ 

    const [Email,SetEmail] = useState('');
    const [Password,SetPassword] = useState('');

    const HandleSubmit =  async(e)=>{
        e.preventDefault();
        
        const response =await axios.post("http://localhost:8081/login",{Email,Password});

      

        console.log(response.data);
        SetPassword('');
    }
    const EmailChange =(e)=>{
        SetEmail(e.target.value);
    }

    const PasswordChange =(e)=>
    {
        SetPassword(e.target.value);
    }


    return(
        <>
            <div className="Logincontainer">
                <form action="post" onSubmit={HandleSubmit}>

                    <input type="email"
                    placeholder="Email"
                    value={Email}
                    onChange={EmailChange}
                    />
                    <input type="password"
                    placeholder="Password"
                    value={Password}
                    onChange={PasswordChange} />


                    <button type="submit">Login</button>
                </form>

            </div>
        </>
    )
}

export default Login;