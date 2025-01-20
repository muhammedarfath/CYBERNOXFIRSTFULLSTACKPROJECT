import axios from "axios";
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000";

const useAxios = () => {
  const navigate = useNavigate();

  const authState = JSON.parse(localStorage.getItem('authState')) || {};

  if (!authState.token || !authState.refresh) {
    navigate('/register');
    return axios.create({ baseURL: BASE_URL }); 
  }

  const { token, refresh } = authState;

  let access_token = token;
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${access_token}` }
  });

  axiosInstance.defaults.withCredentials = true;

  axiosInstance.interceptors.request.use(async req => {
    const { token, refresh } = authState; 

    access_token = token;
    const refresh_token = refresh;

    // Check token expiration (if available)
    if (token) {
      const user = jwtDecode(access_token);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (isExpired) {
        try {
          const response = await axios.post(`http://127.0.0.1:8000/auth/token/refresh/`, {
            refresh: refresh_token
          });

          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);
          req.headers.Authorization = `Bearer ${response.data.access}`;
          access_token = response.data.access; // Update access token for subsequent requests
          return req;
        } catch (error) {
          console.error('Refresh token failed:', error);
          localStorage.removeItem('authState'); // Clear auth state on refresh failure
          navigate('/register'); // Redirect to login on refresh failure
          return Promise.reject(error); // Reject the request to prevent further execution
        }
      }
    }

    return req;
  });

  return axiosInstance;
};

export default useAxios;