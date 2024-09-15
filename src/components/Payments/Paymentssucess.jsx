import React from 'react';
import { MdCloudDone } from "react-icons/md";
import { Link,useSearchParams } from 'react-router-dom';
import "./Paymentss.css";
 function Paymentssucess() {


  //<=========yah line upar se link lene ke liye use karte hai================>//
  const reference = useSearchParams()[0].get('reference');
  console.log("this is is refrence number",reference);
  return (
    <div className='Paymentss_cnt'>
    <h1>You have Pro Pack</h1>
    <div className='paymentss_mid'>
    <button>Payments Sucess</button>
    <div className='payments_mid1'>
      <p>Congratulation you are pro member. You have access to to prime contact</p>

      <div className='payments_icon1'>
      <MdCloudDone/>
      </div>

      <Link to="/profile">
      <h2>Go to profile</h2>  
      </Link>
      <h3>Reference: {reference}</h3>
    </div>

    </div>
      
    </div>
  )
}

export default Paymentssucess;