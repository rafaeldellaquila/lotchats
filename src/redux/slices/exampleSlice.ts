// src/redux/slices/exampleSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = exampleSlice.actions;

export default exampleSlice.reducer;
