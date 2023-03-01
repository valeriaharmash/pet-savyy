import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allItems: [],
  selectedItem: {},
  error: null,
};

export const fetchItems = createAsyncThunk("getItems", async () => {
  try {
    const { data } = await axios.get("/api/items");
    return data;
  } catch (err) {
    //console.log(err)
    return [];
  }
});

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setError: (state, { payload: error }) => {
      state.error = error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

//export const { setError } = item.Slice.actions;

export const selectItems = (state) => {
  return state.items;
};

export default itemsSlice.reducer;
