import {
  EntityId,
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
  } from "@reduxjs/toolkit";
  import { RootState } from "../../RootReducer";
  import { AppThunkConfig } from "../../store/thunk-extras";
  import { Product } from "./type";
  
  // Create an entity adapter for managing products
  const productEntity = createEntityAdapter<Product>({
    selectId: (product) => product.id,
  });
  

  // Define the asynchronous thunk for adding a product


  // Define the initial state using the entity adapter
  const initialState = productEntity.getInitialState({ selectProduct: null as Product | null });
  
  // Create a product slice
  const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
      updateProduct: productEntity.updateOne,
      addProduct: productEntity.addOne,
      deleteProduct: productEntity.removeOne,
      selectProduct: (state, action) => {
        state.selectProduct = action.payload;
      },
      getProductById: (state, action) => {
        state.selectProduct = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(deleteProductById.fulfilled, (state, action) => {
        productEntity.removeOne(state, action.payload);
      });
      builder.addCase(getProduct.fulfilled, (state, action) => {
        productEntity.setAll(state, action.payload);
      });
      builder.addCase(getProductById.fulfilled, (state, action) => {
        state.selectProduct = action.payload;
      });
    },
  });
  
  export default productSlice.reducer;
  
  // Define selectors
  export const productSelectors = productEntity.getSelectors(
    (state: RootState) => state.product
  );
  // Define an async thunk to fetch products
  export const addNewProduct = createAsyncThunk<Product, Partial<Product>, AppThunkConfig>(
    "product/addProduct",
    async (newProduct, { extra: { api } }) => {
      const res = await api.post<Product, Product>("product", newProduct);
      return res;
    }
  );
  
  export const updateExistingProduct = createAsyncThunk<Product, { id: number, data: Partial<Product> }, AppThunkConfig>(
    "product/updateProduct",
    async ({ id, data }, { extra: { api } }) => {
      const res = await api.put<Product, Product>(`product/${id}`, data);
      return res;
    }
  );
  
  export const deleteProductById = createAsyncThunk<EntityId, number, AppThunkConfig>(
    "product/deleteProduct",
    async (productId, { extra: { api } }) => {
      await api.delete<Product, { id: EntityId }>(`product/${productId}`);
      return productId; 
    }
  );
  
  export const getProduct = createAsyncThunk<Product[], void, AppThunkConfig>(
    "product/getProducts",
    async (_, { extra: { api } }) => {
      const res = await api.get<Product[], any>("product");
      return res;
    }
  );
  export const getProductById = createAsyncThunk<Product, number, AppThunkConfig>(
    "product/getProductById",
    async (productId, { extra: { api } }) => {
      const res = await api.get<Product, any>(`product/${productId}`);
      return res;
    }
  );
  export const { updateProduct, addProduct, deleteProduct, selectProduct } = productSlice.actions;

  