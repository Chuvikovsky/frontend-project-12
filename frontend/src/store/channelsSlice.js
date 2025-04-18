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
    },
    changeChannel: (state, { payload }) =>
      !payload
        ? { ...state, currentChannelId: defaultChannelId }
        : { ...state, currentChannelId: payload },
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
  },
});

const channelSelectors = channelsAdapter.getSelectors(
  (state) => state.channels
);

export const { addChannel, changeChannel, removeChannel, renameChannel } =
  channelsSlice.actions;
export { channelSelectors };
export default channelsSlice.reducer;
