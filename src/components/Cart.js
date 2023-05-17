import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { QuantityComp } from './styles/header.styled'

export const Cart = () => {
  const cartData = useSelector((state)=>state.cartSlice.cart)
  const cartItems = [...new Set(cartData)]
  // console.log(cartItems)
  return (
    <div className='cart-section'>
      <Link to="/cartItems/">
        <h3>My Cart <QuantityComp>{cartItems.length}</QuantityComp></h3>
      </Link>
    </div>
  )
}
