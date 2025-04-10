import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    },
    setUser: (state, action) => {
      const { username } = action.payload;
      state.username = username;
    },
  },
});

export const { logIn, logOut, setUser } = authSlice.actions;
export default authSlice.reducer;
