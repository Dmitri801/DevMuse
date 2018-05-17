import axios from 'axios';
import  setAuthToken  from '../utils/setAuthToken';
import { GET_ERRORS } from './types';
import { SET_CURRENT_USER } from './types';
import jwt_decode from 'jwt-decode';


// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push('/login'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    ); 
}


// Login - Get User Token
export const loginUser = (userData) => (dispatch) => {
  axios.post('/api/users/login', userData)
      .then(res => {
        // Save To localStorage
        const { token } = res.data; 
          // Set Token to ls
        localStorage.setItem('jwtToken', token);
        // Set Token To Auth Header
        setAuthToken(token)
        // Decode Token To Get User Data
        const decoded = jwt_decode(token);
        // Set Current User
        dispatch(setCurrentUser(decoded))
      })
      .catch(err => 
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
    }


export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Log User Out
export const logOutUser = () => dispatch => {
  // Remove Token From Local Storage
  localStorage.removeItem('jwtToken');
  // Remove Auth Header
  setAuthToken(false);
  // Set Current User To Empty Object
  dispatch(setCurrentUser({}))

}