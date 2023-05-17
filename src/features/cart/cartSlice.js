import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  cart: [],
  total: 0,
  allProducts: [],
  selectedProduct: []
}

export const cartSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setProducts: (state,action) => {
      state.products = action.payload;
      state.allProducts = action.payload
    },
    removedFromCart: (state,action) => {
      state.cart = state.cart.filter(cart=>cart !== action.payload)
    },
    addedToCart: (state,action) => {
      state.cart = [...state.cart,action.payload]
    },
    totalAmount: (state,action) => {
      state.total = state.total + action.payload
    },
    menClothingSelected: (state) => {
      state.products = state.allProducts.filter(p => p.category === "men's clothing")
    },
    womenClothingSelected: (state) => {
      state.products = state.allProducts.filter(p => p.category === "women's clothing")
    },
    electronicsSelected: (state) => {
      state.products = state.allProducts.filter(p => p.category === "electronics")
    },
    jewelrySelected: (state) => {
      state.products = state.allProducts.filter(p => p.category === "jewelery")
    },
    selectedProduct: (state,action) => {
      state.selectedProduct = action.payload
    },
    clearProduct: (state) => {
      state.selectedProduct = []
    } 
  },
})

// Action creators are generated for each case reducer function
export const { setProducts,removedFromCart,addedToCart,totalAmount,menClothingSelected,womenClothingSelected,electronicsSelected,jewelrySelected,selectedProduct,clearProduct } = cartSlice.actions

export default cartSlice.reducer