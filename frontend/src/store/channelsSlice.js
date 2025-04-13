import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannel: null,
});

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
    removeChannel: (state, { payload }) => {
      state.channelsList = state.channelsList.filter(
        (ch) => ch.id !== payload.id
      );
    },
  },
});

export const { addChannel, changeChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
