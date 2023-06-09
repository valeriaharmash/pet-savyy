import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import auth from './slices/auth';
import itemsReducer from './slices/items';
import usersReducer from './slices/users';
import orderReducer from './slices/orders';

const store = configureStore({
  reducer: {
    auth: auth,
    items: itemsReducer,
    users: usersReducer,
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger()),
});

export default store;
export * from './slices/auth';
