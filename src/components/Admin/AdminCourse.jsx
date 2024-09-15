import React, {  useState } from 'react';
import Sidebar from "./Sidebar";
import { RiDeleteBin7Fill } from 'react-icons/ri';
import ViewLecture from './ViewLecture';
import { useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseLectures } from '../../Redux/actions/course';

export default function AdminCourse() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const { courses } = useSelector(state => state.course);

 

  const handleChange = (courseId) => {
    dispatch(getCourseLectures(courseId));
    onOpen();
    setSelectedCourse(courseId);

  };

  const handleDelete = (courseId) => {
    console.log("delete course", courseId);
  };

  return (
    <div className='AdminCourse_cnt'>
      <h1>All Available Courses Here</h1>
      <div className='AdminCourse_mid'>
        <table className='AdminCourse_table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Poster</th>
              <th>Title</th>
              <th>Category</th>
              <th>Creator</th>
              <th>Views</th>
              <th>Lectures</th>
              <th>Subscription</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses && courses.map(item => (
              <Row key={item.id} item={item} handleChange={handleChange} handleDelete={handleDelete} />
            ))}
          </tbody>
        </table>
        {isOpen && (
          <ViewLecture isOpen={isOpen} onClose={onClose} courseId={selectedCourse} />
        )}
      </div>
      <Sidebar />
      <div className='course_lastline'>
        <p>All Available users in the database</p>
      </div>
    </div>
  );
}

function Row({ item, handleChange, handleDelete }) {
  return (
    <tr className='rowbody'>
      <td data-label="ID">#{item.id}</td>
      <td>
        <img src={item.poster.url} alt={`${item.title} poster`} />
      </td>
      <td data-label="Title">{item.title}</td>
      <td data-label="Category">{item.category}</td>
      <td data-label="Creator">{item.createdBy}</td>
      <td data-label="Views">{item.views}</td>
      <td data-label="Lectures">{item.numofvideos}</td>
      <td data-label="Subscription">
        {item.subscription?.status === 'active' ? 'Active' : 'Not Active'}
      </td>
      <td data-label="Action">
        <button onClick={() => handleChange(item.id)}>View Lecture</button>
        <button onClick={() => handleDelete(item.id)}><RiDeleteBin7Fill /></button>
      </td>
    </tr>
  );
}
