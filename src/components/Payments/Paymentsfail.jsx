import React from "react";
import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";
export default function Paymentsfail() {
  return (
    <div className="Notfound_cnt">
      <div className="notfound_mid">
        <MdError />
        <div className="notfound_mid1">
          <h1>Try Again</h1>
        </div>
        <Link to="/about">
          <h2>Go to subscribe</h2>
        </Link>
      </div>
    </div>
  );
}
