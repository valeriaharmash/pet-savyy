import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allItems: [],
  selectedItem: {},
  error: null,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setError: (state, { payload: error }) => {
      state.error = error;
    },
  },
  extraReducers: (builder) => {},
});

const { setError } = itemsSlice.actions;
export { setError };

export default itemsSlice.reducer;
