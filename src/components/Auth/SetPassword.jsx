import React, {  useState } from 'react';
import "./SetPassword.css";
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../Redux/actions/profile';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function SetPassword() {
  const params = useParams();
  const navigate = useNavigate(); // Initialize navigate function

  const { loading} = useSelector(state => state.profile);

  const dispatch = useDispatch();
  const [password, setPassword] = useState(""); // Correctly initialize state

  const submitHandler = (e) => {
    e.preventDefault();

    // Create a promise for the toast to monitor
    const promise = dispatch(resetPassword(params.token, password));

    toast.promise(
      promise,
      {
        loading: 'Updating password...',
        success: 'Password updated successfully!',
        error: 'Failed to update password.',
      }
    ).then(() => {
      // Navigate after successful password reset
      navigate('/login');
    });
  };


  return (
    <div className='UpdatePassword_cnt'>
      <h1>Update Password Here</h1>
      <form onSubmit={submitHandler}>
        <div className='UpdatePassword_mid'>
          <input
            type='password'
            value={password}
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button 
        isloading={loading} type='submit'>Update Password
        </button>
      </form>
    </div>
  );
}
