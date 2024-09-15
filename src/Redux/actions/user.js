import axios from "axios";
import { server } from "../store";

//<============login user====================>//
const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'loginRequest' });

    const { data } = await axios.post(
      `${server}/api/auth/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: 'loginFail', payload: errorMessage });
  }
};

//<=============loadUser===================>//
const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: 'loadUserRequest' });

    const { data } = await axios.get(`${server}/api/auth/me`, {
      withCredentials: true,
    });

    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: 'loadUserFail', payload: errorMessage });
  }
};

//<=================register==================>//
const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: 'registerRequest' });

    const response = await axios.post(`${server}/api/auth/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    const { data } = response;

    if (!data) throw new Error('No data received from server');

    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: 'registerFail', payload: errorMessage });
  }
};

//<===================Logout function=========================>//
const logout = () => async (dispatch) => {
  try {
    dispatch({ type: 'logoutRequest' });

    const { data } = await axios.get(`${server}/api/auth/logout`, {
      withCredentials: true,
    });

    dispatch({ type: 'logoutSuccess', payload: data.message });

    // Remove the token from localStorage
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: 'logoutFail', payload: errorMessage });
  }
};



//<===============buybuySubscription===================>//

 const buySubscription = () => async (dispatch) => {
  try {
    dispatch({ type: 'buySubscriptionRequest' });

    const { data } = await axios.get(`${server}/api/payment/buysubscription`, {
      withCredentials: true,
    });

    dispatch({ type: 'buySubscriptionSuccess', payload: data.subscriptionId });
  } catch (error) {
    dispatch({
      type: 'buySubscriptionFail',
      payload: error.response?.data?.message || error.message,
    });
  }
};





 const cancelSubscription = () => async dispatch => {
  try {
    dispatch({ type: 'cancelSubscriptionRequest' });

    const { data } = await axios.delete(`${server}/api/payment/subscription/chencel`, {
      withCredentials: true,
    });

    dispatch({ type: 'cancelSubscriptionSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'cancelSubscriptionFail',
      payload: error.response.data.message,
    });
  }
};


export { loadUser, login, logout, register,buySubscription,cancelSubscription };
