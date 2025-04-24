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
    logIn: (state, action) => ({ isLoggedIn: true, username: action.payload }),
    logOut: () => {
      removeToken();
      return { isLoggedIn: false, username: null };
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
