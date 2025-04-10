import { createSlice } from "@reduxjs/toolkit";

const channelsSlice = createSlice({
  name: "channels",
  initialState: {
    currentChannelId: 1,
    channelsList: [],
  },
  reducers: {
    addChannel: (state, action) => {
      const isChannelPresent = state.channelsList.find(
        (ch) => ch.id === action.payload.id
      );
      if (!isChannelPresent) {
        state.channelsList.push(action.payload);
      }
    },
  },
});

export const { addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
