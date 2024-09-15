import { server } from '../store';
import axios from 'axios';

export const createCourse = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    dispatch({ type: 'createCourseRequest' });

    const { data } = await axios.post(
      `${server}/api/courses/createcrc`,
      formData,
      config
    );

    dispatch({ type: 'createCourseSuccess', payload: data.message });
    return data;
  } catch (error) {
    dispatch({
      type: 'createCourseFail',
      payload: error.response?.data.message || error.message,
    });
  }
};

export const deleteCourse = (id) => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteCourseRequest' });

    const { data } = await axios.delete(`${server}/api/courses/course/${id}`, config);

    dispatch({ type: 'deleteCourseSuccess', payload: data.message });
    return data;
  } catch (error) {
    dispatch({
      type: 'deleteCourseFail',
      payload: error.response?.data.message || error.message,
    });
  }
};

export const addLecture = (id, formdata) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    dispatch({ type: 'addLectureRequest' });

    const { data } = await axios.post(
      `${server}/api/courses/course/${id}`,
      formdata,
      config
    );

    dispatch({ type: 'addLectureSuccess', payload: data.message });
    return data;
  } catch (error) {
    dispatch({
      type: 'addLectureFail',
      payload: error.response?.data.message || error.message,
    });
  }
};

export const deleteLecture = (courseId, lectureId) => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteLectureRequest' });

    const { data } = await axios.delete(
      `${server}/api/courses/deletelecture?courseId=${courseId}&lectureId=${lectureId}`,
      config
    );

    dispatch({ type: 'deleteLectureSuccess', payload: data.message });
    return data;
  } catch (error) {
    dispatch({
      type: 'deleteLectureFail',
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getAllUsers = () => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'getAllUsersRequest' });

    const { data } = await axios.get(`${server}/api/auth/admin/user`, config);

    dispatch({ type: 'getAllUsersSuccess', payload: data.users });
    return data;
  } catch (error) {
    dispatch({
      type: 'getAllUsersFail',
      payload: error.response?.data.message || error.message,
    });
  }
};

export const updateUserRole = (id) => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'updateUserRoleRequest' });

    const { data } = await axios.put(`${server}/api/auth/admin/updateuserrole/${id}`, {}, config);

    dispatch({ type: 'updateUserRoleSuccess', payload: data.message });
    return data;
  } catch (error) {
    dispatch({
      type: 'updateUserRoleFail',
      payload: error.response?.data.message || error.message,
    });
  }
};

export const deleteUser = (id) => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteUserRequest' });

    const { data } = await axios.delete(`${server}/api/auth/admin/deleteuser/${id}`, config);

    dispatch({ type: 'deleteUserSuccess', payload: data.message });
    return data;
  } catch (error) {
    dispatch({
      type: 'deleteUserFail',
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getDashboardStats = () => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'getAdminStatsRequest' });

    const { data } = await axios.get(`${server}/api/other/admin/stats`, config);

    dispatch({ type: 'getAdminStatsSuccess', payload: data });
    return data;
  } catch (error) {
    dispatch({
      type: 'getAdminStatsFail',
      payload: error.response?.data.message || error.message,
    });
  }
};
