import { configureStore, createSlice } from "@reduxjs/toolkit";

const navIndexSlice = createSlice({
  name: "navIndex",
  initialState: { value: 100, titleLabel: "Banking", authenticated: true },
  reducers: {
    setNavIndex: (state, newvalue) => {
      state.value = newvalue.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    navIndex: navIndexSlice.reducer,
  },
  middleware: [],
});


export default {navIndexSlice, store} 