import React, { useState,useEffect } from 'react'
import axios from 'axios';
import './Card.css';
import img1 from '../assets/profil&.png';
function Card() {
    const[user,setUser]=useState([]);

    useEffect(()=>{
       const getuser=async()=>{
           const{data:res}=await axios.get();
           setUser(res);
       }
       getuser();
    },
    []);
    
  return (
    <div className='Card'>
        <div className='upper-container'>
            <div className='image-container'>
                <img  src={img1} alt='' height="100px" width='100px'/>
            </div>
        </div>
        <div className='lower-container'>
            { user.map( user =>
                <><h3>{user.name}</h3><h3>{user.email}</h3><h3>{user.promotion}</h3></>
            
            )}
            </div>
            
            
            <button>visit Profil</button>
        </div>


    
    
  );}

export default Card;
