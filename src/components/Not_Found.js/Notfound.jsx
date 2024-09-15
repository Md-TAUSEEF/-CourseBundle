import React from "react";
import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Notfound.css";
export default function Notfound() {
  return (
    <div className="Notfound_cnt">
      <div className="notfound_mid">
        <MdError />
        <div className="notfound_mid1">
          <h1>Page Not Found</h1>
        </div>
        <Link to="/">
          <h2>Go to Home</h2>
        </Link>
      </div>
    </div>
  );
}
