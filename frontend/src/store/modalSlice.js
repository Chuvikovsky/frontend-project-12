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
        return { type, channel: null };
      }
      return { type, channel };
    },
    closeModal: () => ({ type: null, channel: null }),
  },
});

export const { setModalType, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
