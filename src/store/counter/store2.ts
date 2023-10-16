import { createSlice } from "@reduxjs/toolkit";

const slice2 = createSlice({
  name: "slice2",
  initialState: {
    /* initial state */ value: 0,
  },
  reducers: {
    //  action.payload 中包含了传递的额外数据
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

export const { actions: slice2Actions, reducer: slice2Reducer } = slice2;
