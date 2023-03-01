import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allItems: [],
  selectedItem: {},
  error: null,
};

export const fetchSingleItem = createAsyncThunk(
  'fetchSingleItem',
  async (itemId) => {
    try {
      const { data: item } = await axios.get(`/api/items/${itemId}`);
      return { item };
    } catch (error) {
      console.error('Unable to fetch item.', error);
      return { error };
    }
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setError: (state, { payload: error }) => {
      state.error = error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingleItem.fulfilled, (state, { payload }) => {
      if (payload.error) {
        let errorMessage = 'Something went wrong.';
        if (payload.error.response.status === 500) {
          errorMessage = 'No items found.';
        }
        return { ...state, error: errorMessage };
      }
      return { ...state, selectedItem: payload.item };
    });
  },
});

const { setError } = itemsSlice.actions;
export { setError };

export default itemsSlice.reducer;
