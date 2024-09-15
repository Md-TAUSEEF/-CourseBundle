import React from "react";
import Founder from "./Founder";
import { Link } from "react-router-dom";
import intro from "../assets/videos/intro.mp4";
import TermandCondition from "../assets/docs/TermandCondition";
import "./About.css";

const TandC = ({ termsAndCondition }) => {

  return (
    <div className="TandC_cnt">
      <h1>Term & Condition</h1>
      <div className="TandC_mid">
        <p>{termsAndCondition}</p> 
        <h1>Refund only application under 7 days</h1>
      </div>
    </div>
  );
};

export default function About() {
  return (
    <div className="About_container">
    <div className="aboutcntr">
      <h1>About Us</h1>
      <Founder />
      <div className="About_cntmid">
        <div className="About_cntmid1">
          <p>
            This is a video editing platform. There are all types of courses
            available.
          </p>
        </div>
        <div className="About_cntmid2">
          <Link to="/subscribe" style={{ textDecoration:"none",fontWeight:"bold",fontSize:"18px"}}>
            <p>Check Here Our Plans</p>
          </Link>
        </div>
      </div>
      <div className="Home_container2">
        <video
          autoPlay
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={intro}
        ></video>
      </div>
      <TandC termsAndCondition={TermandCondition} /> 
      <div className="Payment_cnt">
        <h1>Payment is secure by Razorpay</h1>
      </div>
      </div>
    </div>
  );
}
