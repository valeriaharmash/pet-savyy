import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import auth from './slices/auth';
import itemsReducer from './slices/items';
import cartReducer from '../features/cartSlice';
import userReducer from './slices/users';

const store = configureStore({
  reducer: {
    auth: auth,
    items: itemsReducer,
    cart: cartReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger()),
});

export default store;
export * from './slices/auth';
