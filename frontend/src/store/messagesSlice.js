import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messagesList: [],
  },
  reducers: {
    addMessage: (state, action) => {
      const isMessagePresent = state.messagesList.find(
        (m) => m.id === action.payload.id,
      );
      if (!isMessagePresent) {
        state.messagesList.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const channelId = action.payload;
      state.messagesList = state.messagesList.filter(
        (m) => m.channelId !== channelId,
      );
    });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
