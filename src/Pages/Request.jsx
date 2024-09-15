import React, { useState } from 'react';
import './Contact.css'; 
import { Link } from 'react-router-dom';

const Request = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', course);
  
  };

  return (
    <div className="contact-container">
      <h2>Request New Course</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder='enter your name'
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder='enter your email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="course">Course:</label>
          <textarea
            id="course"
            value={course}
            placeholder='explain your course'

            onChange={(e) => setCourse(e.target.value)}
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit">Send Email</button>

        <div className='req_course'>
        See All avilable course
            <Link to="/courses">
                <button>Click Here</button>
            </Link>
        </div>
      </form>
    </div>
  );
};

export default Request;
