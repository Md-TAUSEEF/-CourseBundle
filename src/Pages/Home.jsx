import React, { Fragment } from 'react'
import bg from "../assets/images/bg.png"
import "./Home.css";
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { SiCoursera } from "react-icons/si";
import { SiUdemy } from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import intro from "../assets/videos/intro.mp4";

export default function Home() {
  return (
   <Fragment>
    <div className='Homecontainer'>
        <div className='Home_head'>
            <h1>LEARN FROM THE EXPORT</h1>
            <p>Find the valuable contents fromdsk technology</p>
            <Link to="/courses">
                <button className='home_btn'>EXplore Now</button>
            </Link>
        </div>
        <div className='homeimg'>
            <img src={bg} alt='this imsage'/>
        </div>

    </div>
    <div className='Home_mid'>
       <h1>OUR BRAND</h1>
       <div className='Home_midicon'>
        <FaGoogle/>
        <IoLogoYoutube/>
        <SiCoursera/>
        <SiUdemy/>
        <FaAws/>
       </div>
    </div>
    <div className='Home_container2'>
        <video autoPlay controls controlsList='nodownload nofullscreen noremoteplayback'
        disablePictureInPicture
        disableRemotePlayback
        src={intro}></video>
    </div>
   
   </Fragment>
   

  )
}
