import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const channelId = action.payload;
      const toRemoveMessages = Object.values(state.entities)
        .filter((m) => m.channelId === channelId)
        .map((m) => m.id);
      messagesAdapter.removeMany(state, toRemoveMessages);
    });
  },
});

const messagesSelectors = messagesAdapter.getSelectors(
  (state) => state.messages
);

export { messagesSelectors };
export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
