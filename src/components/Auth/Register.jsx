import React, { useState } from 'react';
import './Register.css'; 
import { Input, Button } from '@chakra-ui/react';
import { Link} from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { register } from '../../Redux/actions/user';
import Avatar from '@mui/material/Avatar';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  
  const dispatch = useDispatch();


  const changeImageHandler = (e) => {
    const file = e.target.files[0];

    console.log('Selected file:', file);

    if (!file) {
      console.error('No file selected');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };

    reader.onerror = () => {
      console.error('Error reading file');
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !phoneNumber || !avatar) {
      console.error('All fields are required');
      return;
    }

    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('phone', phoneNumber);
    myForm.append('file', avatar);

    console.log('Form data:', myForm);

    dispatch(register(myForm))
      .then(() => {
      
        setName('');
        setEmail('');
        setPassword('');
        setPhoneNumber('');
        setAvatar(null);
        setAvatarPreview('');

   
      })
      .catch(error => {
        console.error('Registration failed:', error);
      });
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group1">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group1">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group1">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group1">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            placeholder="Enter Your Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group1">
          <label htmlFor="avatar">Choose Avatar:</label>
          <Input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={changeImageHandler}
          />
          
          { <Avatar src={avatarPreview} size="xl" />}
        </div>
        <Button type="submit" colorScheme="blue" mt={4}>Register</Button>
        <p>Already have an account? <Link to="/login">Login here</Link></p> 
      </form>
    </div>
  );
};

export default Register;
