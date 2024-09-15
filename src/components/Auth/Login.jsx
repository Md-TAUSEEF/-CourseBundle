import React, { useState } from 'react';
import './Login.css'; 
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {login} from '../../Redux/actions/user'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));


    setEmail(''); 
    setPassword('');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder='Enter Your Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder='Enter Your Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <Link to="/forgetpassword" className="forgot-password-link">Forgot Password?</Link>
        </div>
        <button type="submit">Login</button>

        <p>New user? <Link to="/signup">Sign up here</Link></p>
      </form>
    </div>
  );
};

export default Login;
