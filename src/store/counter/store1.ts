import { createSlice } from "@reduxjs/toolkit";

const slice1 = createSlice({
  name: "slice1",
  initialState: {
    /* initial state */ value: 0,
  },
  reducers: {
    // actions for slice1
    increment: (state, action) => {
      state.value += action.payload;
    },
    decrement: (state, action) => {
      state.value -= action.payload;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { actions: slice1Actions, reducer: slice1Reducer } = slice1;
