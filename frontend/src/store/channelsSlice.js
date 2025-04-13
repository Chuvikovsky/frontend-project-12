import { createSlice } from "@reduxjs/toolkit";

const defaultChannelId = "1";
const channelsSlice = createSlice({
  name: "channels",
  initialState: {
    currentChannel: null,
    channelsList: [],
  },
  reducers: {
    addChannel: (state, { payload }) => {
      const isChannelPresent = state.channelsList.find(
        (ch) => ch.id === payload.id
      );
      if (!isChannelPresent) {
        state.channelsList.push(payload);
      }
      if (state.currentChannel === null && payload.id === defaultChannelId) {
        state.currentChannel = payload;
      }
    },
    changeChannel: (state, { payload }) => {
      state.currentChannel = payload.channel;
    },
    removeChannel: (state, action) => {
      const channelId = action.payload;
      state.channelsList = state.channelsList.filter(
        (ch) => ch.id !== channelId
      );
    },
  },
});

export const { addChannel, changeChannel, removeChannel } =
  channelsSlice.actions;
export default channelsSlice.reducer;
