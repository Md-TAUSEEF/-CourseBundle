import React, { useState, useEffect } from 'react';
import "./Subscribe.css";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { buySubscription } from '../../Redux/actions/user';
import toast from "react-hot-toast";
import logo from '../../assets/images/logo.png';
import { server } from '../../Redux/store'; 

function Subscribe({ user }) {
  const [key, setKey] = useState(""); 

  const dispatch = useDispatch();
  const { loading, error, subscriptionId } = useSelector(state => state.subscription);
  const { error: courseError } = useSelector(state => state.course);

  const subscribeHandler = async () => {
    try {
      const response = await axios.get(`${server}/api/payment/razorpaykey`, { withCredentials: true });
      if (response.data && response.data.key) {
        setKey(response.data.key);
        await dispatch(buySubscription());  
      } else {
        toast.error("Razorpay key not found");
      }
    } catch (error) {
      toast.error("Error fetching Razorpay key");
      console.error(error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }

    if (subscriptionId && key) {
      const options = {
        key,
        name: 'personalproject',
        description: 'Get access to all premium content',
        image: logo,
        subscription_id: subscriptionId,
        callback_url: `${server}/api/payment/pymentverification`,
        prefill: {
          name: user.name,
          email: user.email,
          contact: '',
        },
        notes: {
          address: 'dsk technology',
        },
        theme: {
          color: '#FFC800',
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    }
  }, [dispatch, error, courseError, user.name, user.email, key, subscriptionId]);

  return (
    <div className='Subscribe_container'>
      <div className='subscribe_mid'>
        <h1>Welcome</h1>
        <div className='subscribe_btn1'>
          <button>Pro Pack-₹299</button>
        </div>
        <div className='subscribe_mid1'>
          <p>Join pro pack and get access to all content</p>
          <h2>₹299 Only</h2>
          <button disabled={loading} onClick={subscribeHandler}>Buy Now</button>
        </div>
        <div className='subscribe_mid2'>
          <h4>100% REFUND AT CANCELLATION</h4>
          <p>Terms & Conditions Apply</p>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
