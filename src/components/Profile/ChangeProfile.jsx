import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UpdateProfile } from '../../Redux/actions/profile';

import toast from 'react-hot-toast';
import { loadUser } from '../../Redux/actions/user';

const ChangeProfile = ({ user }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);

      console.log("login user",user);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateProfilePromise = dispatch(UpdateProfile(name, email));
    
    toast.promise(
      updateProfilePromise,
      {
        loading: 'Updating profile...',
        success: 'Profile updated successfully!',
        error: 'Failed to update profile.',
      }
    );

    try {
      await updateProfilePromise;
      dispatch(loadUser());
      setName('');
      setEmail('');
    } catch (error) {
      // Handle error if needed
    }
  };

  return (
    <div className='update_passwordcnt'>
      <h1>Change Profile</h1>
      <div className='updatepassword_mid'>
        <form onSubmit={handleSubmit}>
          <input
            required
            type='text'
            value={name}
            placeholder='Enter your name'
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            type='email'
            value={email}
            placeholder='Enter your Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type='submit'>Change</button>
        </form>
      </div>
    </div>
  );
}

export default ChangeProfile;
