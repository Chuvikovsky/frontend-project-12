import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  channel: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalType: (state, action) => {
      const { type, channel } = action.payload;
      if (!channel) {
        state.type = type;
        state.channel = null;
        return;
      }
      state.type = type;
      state.channel = channel;
    },
    closeModal: (state) => {
      state.type = null;
      state.channel = null;
    },
  },
});

export const { setModalType, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
