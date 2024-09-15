import React from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';

export default function ViewLecture({ isOpen, onClose, courseId }) {
  if (!isOpen) {
    return null;
  }

  const coursetitle = "React Course";

  return (
    <div className='ViewLecture_cnt'>
      <button onClick={onClose}>Close</button>
      <div className='view_mid'>
        <h1>{coursetitle}</h1>
      </div>
      <VideCard 
        title="Lecture Title" 
        description="Lecture Description" 
        num={1} 
        lectureId="lecture123" 
        courseId={courseId} 
        deleteButtonHandler={(courseId, lectureId) => console.log(`Delete lecture ${lectureId} from course ${courseId}`)}
      />
    </div>
  );
}

function VideCard({ title, description, num, lectureId, courseId, deleteButtonHandler }) {
  return (
    <div className='videocard_cnt'>
      <div className='videocard_mid'>
        <h1>{`#${num} ${title}`}</h1>
        <p>{description}</p>
      </div>

      <div className='videocard_mid1'>
        <button onClick={() => deleteButtonHandler(courseId, lectureId)}><RiDeleteBin7Fill /></button>
      </div>
    </div>
  );
}
