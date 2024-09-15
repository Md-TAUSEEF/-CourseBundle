import React, { useState, useEffect } from 'react'; 
import Sidebar from "../Admin/Sidebar";
import "./Admincreate.css";
import { useDispatch, useSelector } from 'react-redux'; 
import toast from 'react-hot-toast';
import { createCourse } from '../../Redux/actions/admin'

export default function AdminCreateCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const categories = [
    "Software Developer", 
    "Mern Stack Developer", 
    "Full Stack Developer", 
    "ReactJS Developer",
    "Data Science",
    "Game Developer",
    "Machine Learning", // Fixed capitalization
    "Cyber",
    "Chemical"
  ];

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(state => state.admin); // Fixed missing useSelector

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('category', category);
    myForm.append('createdBy', createdBy);
    myForm.append('file', image); // Ensure 'file' matches your backend API field name
    dispatch(createCourse(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]); // Added useEffect

  return (
    <div className='createcourse_cnt'>
      <div className='createcourses_mid1'>
        <div className='createcourses_mid2'>
          <h1>Create Course</h1>
        </div>

        <form onSubmit={submitHandler}>
          <input 
            type='text' 
            value={title} 
            placeholder='Title' 
            onChange={e => setTitle(e.target.value)} 
            required // Added required attribute for validation
          />
          <input 
            type='text' 
            value={description} 
            placeholder='Description' 
            onChange={e => setDescription(e.target.value)} 
            required // Added required attribute for validation
          />
          <input 
            type='text' 
            value={createdBy} 
            placeholder='Created By' 
            onChange={e => setCreatedBy(e.target.value)} 
            required // Added required attribute for validation
          />

          <select value={category} onChange={e => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            {categories.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <input 
            type='file' 
            required 
            id='chooseAvatar' 
            accept='image/*' 
            onChange={changeImageHandler} 
          />

          {imagePrev && (
            <img src={imagePrev} alt='Profile Preview' />
          )}

          <button type='submit' disabled={loading}>
            {loading ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
