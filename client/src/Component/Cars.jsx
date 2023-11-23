import React from 'react'
import './Style/Cars.css';
import {useNavigate } from "react-router-dom";
import cars1 from './Images/cars1.png';
import cars2 from './Images/cars2.jpeg';
import cars3 from './Images/cars3.png';
import cars4 from './Images/cars4.png';
import cars5 from './Images/cars5.jpeg';
import cars6 from './Images/cars6.png';
import cars7 from './Images/cars7.jpeg';
import cars8 from './Images/cars8.jpeg';
import cars9 from './Images/cars9.jpeg';
import cars10 from './Images/cars10.png';
import cars11 from './Images/cars11.jpeg';
import cars12 from './Images/cars12.png';

export default function Cars() {
    const navigate = useNavigate();

    const navigBack=()=>{
        navigate('/home');
    }

  return (
    <div className='cars-div'>
        <div className='Catrin-div-1' id='div-catring-multiple'>
            <img src={cars1} alt=""  className='image-catring1' id='images-cars'/>
            call : 6347884011
        </div>
        <div className='Catrin-div-2' id='div-catring-multiple'>
            <img src={cars2} alt=""  className='image-catring1' id='images-cars'/>
            call : 6347884011
        </div>
        <div className='Catrin-div-3' id='div-catring-multiple'>
            <img src={cars3} alt=""  className='image-catring1' id='images-cars'/>
            call : 6347884011
        </div>
        <div className='Catrin-div-4' id='div-catring-multiple'>
            <img src={cars4} alt=""  className='image-catring1' id='images-cars'/>
            call : 6347884011
        </div>
        <div className='Catrin-div-5' id='div-catring-multiple'>
            <img src={cars5} alt=""  className='image-catring1' id='images-cars'/>
            call : 6347884011
        </div>
        <div className='Catrin-div-6' id='div-catring-multiple'>
            <img src={cars6} alt=""  className='image-catring1' id='images-cars'/>
            call : 6347884011
        </div>
        <div className='Catrin-div-7' id='div-catring-multiple'>
            <img src={cars7} alt=""  className='image-catring1' id='images-cars'/>
            call : 6347884011
        </div>
        <div className='Catrin-div-8' id='div-catring-multiple'>
            <img src={cars8} alt=""  className='image-catring1' id='images-cars'/>
            call : 6347884011
        </div>
        <div className='Catrin-div-9' id='div-catring-multiple'>
            <img src={cars9} alt=""  className='image-catring1' id='images-cars'/>
            call : 6347884011
        </div>
        <div className='Catrin-div-10' id='div-catring-multiple'>
            <img src={cars10} alt=""  className='image-catring1' id='images-cars'/>
            call : 6347884011
        </div>
        <div className='Catrin-div-11' id='div-catring-multiple'>
            <img src={cars11} alt=""  className='image-catring1' id='images-cars'/>
            call : 6347884011
        </div>
        <div className='Catrin-div-12' id='div-catring-multiple'>
            <img src={cars12} alt=""  className='image-catring1' id='images-cars'/>
            call : 6347884011
        </div>
        <div className='button-div-abck'>
            <button className='btn-backto-home' onClick={navigBack}>Back to home</button>
        </div>
    </div>
  )
}
