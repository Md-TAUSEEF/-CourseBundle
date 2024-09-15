import React, { useState } from 'react';
import "./ForgetPassword.css";
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../Redux/actions/profile';
import toast from 'react-hot-toast';

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const { loading } = useSelector(state => state.profile);

  const dispatch = useDispatch();

  const frowordpsd = (e) => {
    e.preventDefault();

    // Create a promise for the toast to monitor
    const promise = dispatch(forgetPassword(email));

    toast.promise(
      promise,
      {
        loading: 'Sending reset link...',
        success: 'Reset link sent successfully!',
        error: 'Failed to send reset link.',
      }
    );
  };

  return (
    <>
      <div className='ForgetPassword_cnt'>
        <h1>Forget Password Here</h1>
        <form onSubmit={frowordpsd}>
          <div className='ForgetPassword_mid'>
            <input
              type='email'
              id='email'
              value={email}
              placeholder='Enter your Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button 
            type='submit'
            disabled={loading}
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </>
  );
}
