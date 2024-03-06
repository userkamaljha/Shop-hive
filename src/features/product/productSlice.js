import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductsByFilters, fetchProductsBySort } from './productAPI';

const initialState = {
  products: [],
  status: 'idle',
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);
export const fetchProductsByFilterAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({filter, pagination}) => {
    const response = await fetchProductsByFilters(filter, pagination);
    return response.data;
  }
);
export const fetchProductsBySortAsync = createAsyncThunk(
  'product/fetchProductsBySort',
  async (sort) => {
    const response = await fetchProductsBySort(sort);
    return response.data;
  }
);



export const productSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
      })
      .addCase(fetchProductsBySortAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsBySortAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
  },
});


export const selectAllProducts = (state) => state.product.products;

export default productSlice.reducer;