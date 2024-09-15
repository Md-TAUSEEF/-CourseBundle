import React, { useEffect, useState } from 'react';
import "./Updatepassword.css";
import { changePassword } from '../../Redux/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

export default function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.profile);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePassword(oldPassword, newPassword))
      .then(() => {
        setOldPassword('');
        setNewPassword('');
      });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearerror" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearmessage" });
    }
  }, [dispatch, error, message]);

  return (
    <div className='update_passwordcnt'>
      <Toaster /> 
      <h1>Change Password</h1>
      <div className='updatepassword_mid'>
        <form onSubmit={handleSubmit}>
          <input
            required
            type='password'
            value={oldPassword}
            placeholder='Enter your old Password'
            onChange={e => setOldPassword(e.target.value)}
          />
          <input
            required
            type='password'
            value={newPassword}
            placeholder='Enter your New Password'
            onChange={e => setNewPassword(e.target.value)}
          />
          <button disabled={loading} type='submit'>
            {loading ? 'Changing...' : 'Change'}
          </button>
        </form>
      </div>
    </div>
  );
}
