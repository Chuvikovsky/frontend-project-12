import { createSlice } from '@reduxjs/toolkit';
import { removeToken } from '../utils/localStorage';

const initialState = {
  isLoggedIn: false,
  username: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.username = null;
      removeToken();
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
