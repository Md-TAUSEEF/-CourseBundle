import React, { useEffect, useState } from 'react';
import './Contactpage.css';
import { useDispatch, useSelector } from 'react-redux'; 
import { useParams, Navigate } from 'react-router-dom'; 
import { getCourseLectures } from '../Redux/actions/course';
import Loader from '../Layout/Loader';

export default function ContactPage({ user }) {
  const [lectureNumber, setLectureNumber] = useState(0);
  const { lectures = [], loading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    console.log("Dispatching getCourseLectures with id:", params.id);
    dispatch(getCourseLectures(params.id));
  }, [dispatch, params.id]);

  console.log("Lectures:", lectures);
  console.log("Loading:", loading);
  console.log("User:", user);

  if (!user || (user.role !== 'admin' && (!user.subscription || user.subscription.status !== 'active'))) {
    return <Navigate to={'/subscribe'} />;
  }

  return loading ? (
    <Loader />
  ) : (
    <div className='Contactpa_cnt'>
      <div className='contactpag_mid1'>
        {lectures.length > 0 && lectures[lectureNumber] ? (
          <>
            <div className='Home_container2'>
              <video
                autoPlay
                controls
                controlsList='nodownload noremoteplayback'
                disablePictureInPicture
                disableRemotePlayback
                src={lectures[lectureNumber]?.video?.url}
              ></video>
            </div>
  
            <div className='coursepage_mid2'>
              <h1>
                #{lectureNumber + 1} {lectures[lectureNumber]?.title}
              </h1>
              <h1>Description</h1>
              <p>{lectures[lectureNumber]?.description}</p>
            </div>
  
            <div className='course_mid3'>
              {lectures.map((item, index) => (
                <button key={item._id} onClick={() => setLectureNumber(index)}>
                  <p>
                    #{index + 1} {item.title}
                  </p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <p>No lectures available</p>
        )}
      </div>
    </div>
  );
  
}
