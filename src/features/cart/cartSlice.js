import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  cart: [],
  total: 0,
  cartQuantity: 0,
  allProducts: [],
  selectedProduct: []
}

export const cartSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setProducts: (state,action) => {
      state.products = action.payload;
      state.allProducts = action.payload;
    },
    removedFromCart: (state,action) => {
      state.cart = state.cart.filter(cart=>cart.id !== action.payload)
    },
    updateQty: (state,action) => {
      const newProducts = state.products.map((product) => {
        if(product.id === action.payload.id) {
          return {...product,qty:action.payload.val}
        }
        return product
      })
      return {
        ...state,
        products: newProducts,
      };
    },
    addedToCart: (state,action) => {
      const currentProd = {...action.payload,quantity: 1}
      state.cart.push(currentProd);
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
    },
    decreaseQty: (state,action) => {
      const currentIndex = state.cart.findIndex(
        item => item.id === action.payload.id
      ) 
      if(state.cart[currentIndex].quantity > 1) {
        state.cart[currentIndex].quantity -= 1
      }
    },
    increaseQty: (state,action) => {
      const currentIndex = state.cart.findIndex(
        item => item.id === action.payload.id
      ) 
        state.cart[currentIndex].quantity += 1
    } 
  },
})

// Action creators are generated for each case reducer function
export const { decreaseQty,increaseQty,updateQty,setProducts,removedFromCart,addedToCart,totalAmount,menClothingSelected,womenClothingSelected,electronicsSelected,jewelrySelected,selectedProduct,clearProduct } = cartSlice.actions

export default cartSlice.reducer