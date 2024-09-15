import axios from "axios";
import { server } from "../store";

const UpdateProfile = (name, email) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfileRequest" });

    const { data } = await axios.put(
      `${server}/api/auth/update`,
      { name, email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: "updateProfileSuccess", payload: data.message });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: "updateProfileFail", payload: errorMessage });
  }
};

// <===================update profile picture====================>
const updateProfilePicture = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfilePictureRequest" });

    const { data } = await axios.put(
      `${server}/api/auth/updateprofilepecture?file`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: "updateProfilePictureSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateProfilePictureFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};


//<==============changepassword======================>//

const changePassword = (oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: 'changePasswordRequest' });

    const { data } = await axios.put(
      `${server}/api/auth/changeps`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'changePasswordSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'changePasswordFail',
      payload: error.response?.data?.message || error.message,
    });
  }
};


//<=====================forgetpassword====================>//

const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: 'forgetPasswordRequest' });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/api/auth/forwordpass`,
      { email },
      config
    );

    dispatch({ type: 'forgetPasswordSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'forgetPasswordFail',
      payload: error.response?.data?.message || error.message,
    });
  }
};

const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: 'resetPasswordRequest' });

    const { data } = await axios.put(
      `${server}/api/auth/resetpassword/${token}`,
      { password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'resetPasswordSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'resetPasswordFail',
      payload: error.response?.data?.message || error.message,
    });
  }
};

const addToPlaylist = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'addToPlaylistRequest' });

    const { data } = await axios.post(
      `${server}/api/auth/addtoplaylist`,
      { id },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'addToPlaylistSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'addToPlaylistFail',
      payload: error.response?.data?.message || error.message,
    });
  }
};

//<==================remove from playlist======================>//

const removeFromPlaylist = (id) => async (dispatch) => {
  console.log("Removing playlist with ID:", id); 
  try {
    dispatch({ type: 'removeFromPlaylistRequest' });

    const { data } = await axios.delete(
      `${server}/api/auth/deletplaylist?id=${id}`,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch({ type: 'removeFromPlaylistSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'removeFromPlaylistFail',
      payload: error.response?.data?.message || error.message,
    });
  }
};



export {
  UpdateProfile,
  updateProfilePicture,
  changePassword,
  forgetPassword,
  resetPassword,
  addToPlaylist,
  removeFromPlaylist,
};

