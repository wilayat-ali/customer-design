import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './reducers/customerSlice';

const store = configureStore({
  reducer: {
    customers: customerReducer,
  },
});

export default store;
