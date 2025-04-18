import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const defaultChannelId = '1';
const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      channelsAdapter.addOne(state, payload);
      if (state.currentChannelId === null && payload.id === defaultChannelId) {
        state.currentChannelId = defaultChannelId;
      }
    },
    changeChannel: (state, { payload }) => {
      if (!payload?.channel) {
        state.currentChannelId = defaultChannelId;
        return;
      }
      state.currentChannelId = payload.channel.id;
    },
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
  },
});

export const {
  addChannel, changeChannel, removeChannel, renameChannel,
} = channelsSlice.actions;

const channelSelectors = channelsAdapter.getSelectors(
  (state) => state.channels,
);

export { channelSelectors };
export default channelsSlice.reducer;
