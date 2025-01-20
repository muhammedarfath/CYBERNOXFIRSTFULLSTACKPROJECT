import { createSlice } from "@reduxjs/toolkit";



const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

const initialState = loadState() || {
  isLoggedIn: false,
  userId: null,
  username: null,
  token: null,
  refresh: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      const { username, token, refresh } = action.payload;
      state.isLoggedIn = true;
      state.username = username;
      state.token = token;
      state.refresh = refresh;
      state.loading = false;
      state.error = null;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = "Login failed";
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = null;
      state.token = null;
      state.refresh = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("authState"); 
    },
  },
});

export const { startLoading, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
