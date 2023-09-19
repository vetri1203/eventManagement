import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import logoimage from './Component/Images/Perfect_Planners.png';
import '../src/App.css';

const App = () => {

  const Navigate = useNavigate();

  const data= useEffect(() => {
  const timer = setTimeout(() => Navigate('/login'), 3000);
  return () => clearTimeout(timer);
}, []);


  return (
    <div onLoad={data}>
      <img src={logoimage}  alt='img' className='logoimage'/>
    </div>
  );
}

export default App;
