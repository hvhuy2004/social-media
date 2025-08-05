import {api} from "../../config/api";
import { API_BASE_URL } from "../../config/api";
import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE,
  REGISTER_REQUEST, 
  REGISTER_SUCCESS, 
  REGISTER_FAILURE, 
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  LOGOUT
} from "./auth.actionType";
import axios from "axios";

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({type: LOGIN_REQUEST});
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data);

    if (data.token || data.jwt) {
      const token = data.token || data.jwt;
      localStorage.setItem("jwt", token);
      
      // Dispatch login success
      dispatch({ type: LOGIN_SUCCESS, payload: token });
      
      // Tự động fetch profile sau khi login
      dispatch(getProfileAction(token));
    }
    console.log("login success", data);
  } catch (error) {
    console.log("login error:", error);
    dispatch({type: LOGIN_FAILURE, payload: error.message});
  }
};

export const registerUserAction = (registerData) => async (dispatch) => {
    dispatch({type: REGISTER_REQUEST}); // Sửa từ LOGIN_REQUEST
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData.data);

    if (data.token){
        localStorage.setItem("jwt", data.token);
    }
    console.log("register success----", data);
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt }); // Sửa từ LOGIN_SUCCESS
  } catch (error) {
    console.log("register error-------", error);
    console.log("Error response:", error.response?.data); // Debug response
    dispatch({type: REGISTER_FAILURE, payload: error.message}); // Sửa từ LOGIN_FAILURE
  }
};


export const getProfileAction = (jwt) => async (dispatch) => {
    dispatch({type: GET_PROFILE_REQUEST}); 
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        },
      }
     );


    console.log("profile ----", data);
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data }); 
  } catch (error) {
    console.log("profile error-------", error);
    dispatch({type: GET_PROFILE_FAILURE, payload: error.message}); 
  }
};


export const updateProfileAction = (reqData) => async (dispatch) => {
  dispatch({type: UPDATE_PROFILE_REQUEST}); 
  try {
    const jwt = localStorage.getItem("jwt");
    
    // Check if reqData is FormData (for file upload) or regular object
    const isFormData = reqData instanceof FormData;
    
    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      }
    };

    // Không set Content-Type cho FormData - browser tự động set với boundary
    if (!isFormData) {
      config.headers['Content-Type'] = 'application/json';
    }

    // Debug FormData content
    if (isFormData) {
      console.log("Sending FormData to backend:");
      for (let [key, value] of reqData.entries()) {
        console.log(key, value);
      }
    }

    // Chọn endpoint phù hợp
    const endpoint = isFormData ? `${API_BASE_URL}/api/users/update` : `${API_BASE_URL}/api/users`;
    const method = 'PUT';

    const { data } = await axios.put(endpoint, reqData, config);

    console.log("update profile success ----", data);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data }); 
    return data;
  } catch (error) {
    console.log("update profile error-------", error);
    console.log("Error response:", error.response?.data);
    dispatch({type: UPDATE_PROFILE_FAILURE, payload: error.message}); 
    throw error;
  }
};

// Tạo action riêng cho avatar upload
export const uploadAvatarAction = (avatarFile) => async (dispatch) => {
  dispatch({type: UPDATE_PROFILE_REQUEST}); 
  try {
    const jwt = localStorage.getItem("jwt");
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    
    console.log("Uploading file:", avatarFile.name, "Size:", avatarFile.size, "Type:", avatarFile.type);
    
    const { data } = await axios.post(`${API_BASE_URL}/api/users/avatar`, formData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        // Không set Content-Type - browser tự set với boundary
      }
    });

    console.log("Upload avatar success:", data);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data }); 
    return data;
  } catch (error) {
    console.error("Upload avatar error:", error);
    console.error("Response data:", error.response?.data);
    console.error("Response status:", error.response?.status);
    dispatch({type: UPDATE_PROFILE_FAILURE, payload: error.message}); 
    throw error;
  }
};

export const logoutUserAction = () => async (dispatch) => {
  try {
    // Xóa JWT từ localStorage
    localStorage.removeItem("jwt");
    
    console.log("Logout successful");
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log("Logout error:", error);
  }
};