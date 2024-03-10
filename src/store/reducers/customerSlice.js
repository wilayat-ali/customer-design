// customerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    addCustomer: (state, action) => {
        const newCustomer = {
          id: state.list.length + 1, // to generate id for new customer
          ...action.payload,
        };
        state.list.push(newCustomer);
        localStorage.setItem('customers', JSON.stringify(state.list));
      },
    removeCustomer: (state, action) => {
      // Filter out the item based on its unique identifier
      state.list = state.list.filter(customer => customer.id !== action.payload);
      localStorage.setItem('customers', JSON.stringify(state.list));
    },
    updateCustomer: (state, action) => {
        // Find the index of the customer to be updated
        const index = state.list.findIndex(customer => customer.id === action.payload.id);
        if (index !== -1) {
          // Replace the existing customer data with the updated data
          state.list[index] = action.payload;
          localStorage.setItem('customers', JSON.stringify(state.list));
        }
      },
    updateCustomersFromAPI: (state, action) => {
      state.list = action.payload;
      localStorage.setItem('customers', JSON.stringify(state.list));
    },
  },
});

export const { addCustomer, removeCustomer,updateCustomer, updateCustomersFromAPI } = customerSlice.actions;
export default customerSlice.reducer;
