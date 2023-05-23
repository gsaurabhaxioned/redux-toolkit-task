import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './features/cart/cartSlice'
import thunk from 'redux-thunk'

export const store = configureStore({
  reducer: { cartSlice },
  middleware: [thunk]
})