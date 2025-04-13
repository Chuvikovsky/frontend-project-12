import { createSlice } from "@reduxjs/toolkit";
import { removeChannel } from "./channelsSlice";

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
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const channelId = action.payload;
      console.log("before", state);
      state = state.filter((m) => m.channelId !== channelId);
      console.log("after", state);
    });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
