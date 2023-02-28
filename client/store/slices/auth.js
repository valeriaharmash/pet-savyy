import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { use } from 'chai';
import history from '../../history';
import { removeUserToken, setUserToken } from '../../utils';

const initialState = { user: null, error: null };

const getUserByToken = createAsyncThunk('getUserByToken', async (authToken) => {
  if (authToken) {
    const { data: user } = await axios.get('/auth/me', {
      headers: {
        authorization: authToken,
      },
    });
    return user;
  }
  return null;
});

const authenticate = createAsyncThunk(
  'authenticate',
  async ({ email, password, method, firstName, lastName }) => {
    try {
      const {
        data: { token },
      } = await axios.post(`/auth/${method}`, {
        email,
        password,
        firstName,
        lastName,
      });

      setUserToken(token);
      return {};
    } catch (error) {
      return { error };
    }
  }
);

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, { payload: user }) => {
      return { ...state, user };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserByToken.fulfilled, (state, { payload: user }) => {
      return { ...state, user };
    });
    builder.addCase(authenticate.fulfilled, (state, { payload }) => {
      if (payload.error) {
        return { ...state, error };
      }
      return state;
    });
  },
});

const { setUser } = auth.actions;

export { setUser, getUserByToken, authenticate };

export default auth.reducer;
