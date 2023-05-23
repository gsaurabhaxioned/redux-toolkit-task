import { createSlice } from '@reduxjs/toolkit'
import { fetchProducts } from '../../actions';

const initialState = {
  products: [],
  loading: false,
  error: null,
  cart: [],
  total: 0,
  cartQuantity: 0,
  allProducts: [],
  selectedProduct: []
}

export const cartSlice = createSlice({
  name: 'cart',
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
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.allProducts= action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.products = [];
        state.allProducts= [];
      });
    }
})

// Action creators are generated for each case reducer function
export const { decreaseQty,increaseQty,updateQty,setProducts,removedFromCart,addedToCart,totalAmount,menClothingSelected,womenClothingSelected,electronicsSelected,jewelrySelected,selectedProduct,clearProduct } = cartSlice.actions

export default cartSlice.reducer