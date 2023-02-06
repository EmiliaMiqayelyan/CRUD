import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "datas",
  initialState: {
    value: [],
  },

  reducers: {
    create: (state, action) => {
      state.value.push(action.payload);
      console.log(action);
    },

    edit: (state, action) => {
      state.value = state.value.filter((t) => t.id !== action.payload.id);
      state.value.push(action.payload);
    },

    remove: (state, action) => {
      state.value = state.value.filter((t) => t.id !== action.payload);
    },
  },
});

export const { create, edit, remove } = dataSlice.actions;

export default dataSlice.reducer;
