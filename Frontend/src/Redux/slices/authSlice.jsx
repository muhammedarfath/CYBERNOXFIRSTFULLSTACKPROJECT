import { createSlice } from "@reduxjs/toolkit";



const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authTokens');
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
  email: null,
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
      const { email, token, refresh, userId } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userId = userId;
      state.token = token;
      state.refresh = refresh;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = "Login failed";
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      state.token = null;
      state.refresh = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("authTokens"); 
    },
  },
});

export const { startLoading, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
