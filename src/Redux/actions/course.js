import axios from "axios";
import { server } from "../store";


// Action creator to fetch all courses


const getAllCourses = (category = '', keyword = '') => async (dispatch) => {
  try {
    dispatch({ type: "allCoursesRequest" });

  
    console.log(`${server}/api/courses/all?keyword=${keyword}&category=${category}`);

    const { data } = await axios.get(`${server}/api/courses/all?keyword=${keyword}&category=${category}`);

    console.log("API response data:", data); 

    dispatch({ type: "allCoursesSuccess", payload: data.courses }); 
  } catch (error) {
    console.error(error); 
    dispatch({
      type: 'allCoursesFail',
      payload: error.response?.data?.message || error.message,
    });
  }
};




// Action creator to get course lectures
const getCourseLectures = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'getCourseRequest' });

    const { data } = await axios.get(`${server}/api/courses/course/${id}`, {
      withCredentials: true,
    });

    console.log("API response:", data); 
    dispatch({ type: 'getCourseSuccess', payload: data.lectures });
  } catch (error) {
    dispatch({
      type: 'getCourseFail',
      payload: error.response?.data?.message || error.message,
    });
  }
};


export { getAllCourses, getCourseLectures };
