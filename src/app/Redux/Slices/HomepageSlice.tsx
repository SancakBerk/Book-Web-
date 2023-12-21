'use client';
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const Fetchalldata = createAsyncThunk<object[], void>(
  'Homepage/Fetchalldata',
  async () => {
    try {
      let alldata: object[] | null = null;
      await axios({
        method: 'GET',
        url: 'https://assign-api.piton.com.tr/api/rest/categories',
      }).then(async (res) => {
        alldata = await Promise.all(
          res.data.category.map(async (item) => {
            const product_response = await axios({
              method: 'GET',
              url: `https://assign-api.piton.com.tr/api/rest/products/${item.id}`,
            });
            return {
              ...item,
              product: product_response.data.product,
            };
          })
        );
      });
      return alldata;
    } catch (error) {
      throw error;
    }
  }
);

const HomepageSlice = createSlice({
  name: 'Homepage',
  initialState: {
    categoriesanddatas: [] as object[],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Fetchalldata.pending, (state) => {
        state.status = 'pending';
        console.log('pending');
      })
      .addCase(Fetchalldata.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categoriesanddatas = action.payload || [];
      })
      .addCase(Fetchalldata.rejected, (state, action) => {
        state.status = 'failed';
        console.error('Error fetching data:', action.error.message);
      });
  },
});
export default HomepageSlice.reducer;
