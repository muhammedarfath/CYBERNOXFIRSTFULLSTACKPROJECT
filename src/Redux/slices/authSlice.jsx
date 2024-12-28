import { createSlice } from '@reduxjs/toolkit';


const initialState =  {
  isLoggedIn: false,
  userId: null,
  username: null,
  loading: false, 
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      const { username } = action.payload; 
      state.isLoggedIn = true; 
      state.username = username;
      state.loading = false; 
      state.error = null; 
      localStorage.setItem('authState', JSON.stringify(state));
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = 'Login failed'; 
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = null;
      state.loading = false; 
      state.error = null; 

      localStorage.removeItem('authState');
    },
  },
});

export const { startLoading, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
