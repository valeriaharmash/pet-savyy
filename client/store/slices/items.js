import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

export const fetchItems = createAsyncThunk('getItems', async () => {
  try {
    const { data } = await axios.get('/api/items');
    return data;
  } catch (err) {
    //console.log(err)
    return [];
  }
});

export const updateItem = createAsyncThunk('updateItem', async (item) => {
  try {
    const { data } = await axios.put(`/api/item/${item.id}`, item);
    return data;
  } catch (error) {
    console.error('Unable to update item.', error);
    return { error };
  }
});

export const deleteItem = createAsyncThunk('deleteItem', async (id) => {
  try {
    const { data } = await axios.delete(`/api/items/${id}`);
    return { id, data };
  } catch (error) {
    console.error('Unable to delete item.', error);
    return { error };
  }
});

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
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(updateItem.fulfilled, (state, { payload }) => {
      state.singleItem = payload;
    });
    builder.addCase(deleteItem.fulfilled, (state, { payload }) => {
      state.allItems = state.allItems.filter((item) => item.id !== payload.id);
    });
  },
});

export const { setError } = itemsSlice.actions;

export const selectItems = (state) => {
  return state.items;
};

export default itemsSlice.reducer;
