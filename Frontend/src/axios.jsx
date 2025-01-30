import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { store } from "./Redux/Store"; 
import dayjs from "dayjs";

const baseURL = "http://127.0.0.1:8000";

const getAuthTokens = () => {
  const state = store.getState();
  return state.auth.token ? { token: state.auth.token, refresh: state.auth.refresh } : null;
};

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(async (req) => {
  // Get authTokens from Redux state
  const authTokens = getAuthTokens();

  if (!authTokens) {
    return req; // If no tokens, just proceed with the request
  }

  req.headers.Authorization = `Bearer ${authTokens.token}`;

  const user = jwtDecode(authTokens.token);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  try {
    // If token is expired, try to refresh the token using the refresh token
    const response = await axios.post(`${baseURL}/auth/token/refresh/`, {
      refresh: authTokens.refresh,
    });

    // Update Redux store with new tokens
    store.dispatch({
      type: "auth/loginSuccess",
      payload: {
        token: response.data.token,
        refresh: response.data.refresh,
        email: state.auth.email, 
      },
    });

    req.headers.Authorization = `Bearer ${response.data.token}`;
  } catch (error) {
    console.error("Error refreshing token:", error);
    // You can dispatch a logout action here if token refresh fails
    store.dispatch({ type: "auth/logout" });
  }

  return req;
});

export default axiosInstance;
