import { createSlice } from '@reduxjs/toolkit';

const defaultChannelId = '1';
const channelsSlice = createSlice({
  name: 'channels',
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
      if (!payload?.channel) {
        state.currentChannel = state.channelsList.find(
          (ch) => ch.id === defaultChannelId
        );
        return;
      }
      state.currentChannel = payload.channel;
    },
    removeChannel: (state, action) => {
      const channelId = action.payload;
      state.channelsList = state.channelsList.filter(
        (ch) => ch.id !== channelId
      );
    },
    renameChannel: (state, action) => {
      const { id } = action.payload;
      const channelIndex = state.channelsList.findIndex((ch) => ch.id === id);
      state.channelsList[channelIndex] = action.payload;
    },
  },
});

export const { addChannel, changeChannel, removeChannel, renameChannel } =
  channelsSlice.actions;
export default channelsSlice.reducer;
