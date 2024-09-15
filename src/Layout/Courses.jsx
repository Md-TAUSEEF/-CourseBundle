import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getAllCourses } from '../Redux/actions/course';
import { addToPlaylist } from '../Redux/actions/profile';
import './Courses.css';

export default function Courses() {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    "Software Developer", "Mern Stack Developer", "Full Stack Developer", "ReactJS Developer", "Data Science", 
    "Game Developer", "Machine Learning", "Cyber Security", "Chemical Engineering",
  ];

  const dispatch = useDispatch();
  const { loading, courses } = useSelector(state => state.course);

  //<============this is fetch all course=====================>//
  useEffect(() => {
    const fetchCourses = async () => {
      const promise = dispatch(getAllCourses(selectedCategory, keyword));
      toast.promise(promise, {
        loading: 'Fetching courses...',
        success: 'Courses fetched successfully!',
        error: 'Failed to fetch courses.',
      });
    };

    fetchCourses();
  }, [dispatch, selectedCategory, keyword]);

  useEffect(() => {
    console.log("Current courses state:", courses); 
  }, [courses]);

  //<================add to playlist===================>//
  const addToPlaylistHandler = (courseId) => {
    const promise = dispatch(addToPlaylist(courseId));
    toast.promise(promise, {
      loading: 'Adding to playlist...',
      success: 'Course added to playlist successfully!',
      error: 'Failed to add course to playlist.',
    });
  };

  const Course = ({ views, title, description, imgsrc, id, creator, lectureCount, loading, addToPlaylistHandler }) => {
    return (
      <div className='course_cnt1'>
        <div className='course_view'>
          <img src={imgsrc} alt='course logo' />
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className='course_view1'>
          <h2>Creator - <span>{creator}</span></h2>
        </div>
        <div className='course_view2'>
          <h2>Lectures - {lectureCount}</h2>
        </div>
        <div className='course_view3'>
          <h2>Views - {views}</h2>
        </div>
        <div className='course_view5'>
          <Link to={`/course/${id}`}>
            <button>Watch Now</button>
          </Link>
          <button onClick={() => addToPlaylistHandler(id)}>Add to playlist</button>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <div className='Courses_container'>
        <h1>ALL COURSES</h1>
        <div className='Courses_btn1'>
          <input
            type='text'
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder='Search for your course'
          />
        </div>
        <div className='course_btn2'>
          {categories.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className='courses_mid'>
          {loading ? (
            <h1>Loading...</h1>
          ) : courses && courses.length > 0 ? (
            courses.map(item => (
              <Course
                key={item._id}
                title={item.title}
                description={item.description}
                views={item.views}
                imgsrc={item.poster ? item.poster.url : ''}
                id={item._id}
                creator={item.createdBy}
                lectureCount={item.numOfVideos}
                addToPlaylistHandler={addToPlaylistHandler}
                loading={loading}
              />
            ))
          ) : (
            <h1>Courses Not Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
}
