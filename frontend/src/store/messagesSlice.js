import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: [],
  reducers: {
    addMessage: (state, action) => {
      const isMessagePresent = state.find((m) => m.id === action.payload.id);
      if (!isMessagePresent) {
        state.push(action.payload);
      }
    },
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
