import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import auth from './slices/auth';
import itemsReducer from './slices/items';
import usersReducer from './slices/users';
import cartReducer from './slices/cart';

const store = configureStore({
  reducer: {
    auth: auth,
    items: itemsReducer,
    cart: cartReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger()),
});

export default store;
export * from './slices/auth';
