import React from 'react';
import Avatar from '@mui/material/Avatar';
import photo from '../assets/images/photo.jpg';
import "./Founder.css";
export default function Founder() {
  return (
    <div className='founder_container'>
    <div className='founder_mid'>
     <Avatar alt="User Avatar" src={photo} style={{width:180,height:180,margin:30}} />
     <p>Co-Founder</p>
     </div>
     <div className='founder_mid1'>
     <h1>Md Tauseef</h1>
      <p>Hi i am full stack developer i did make projectwith the help of ReactJS NodeJS Express MongoDB </p>
     </div>
      
    </div>
  )
}
