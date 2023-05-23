import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { selectedProduct,addedToCart,removedFromCart,clearProduct } from '../features/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { AddButton, AlignLeft, DetailInfoComp, DetailInfoFigure, ProdContent, ProdDetailWrapper, RemoveButton } from './styles/container.styled'

const ProductDetail = () => {
  const {productId} = useParams()
  const dispatch = useDispatch()
  const state = useSelector(state=>state.cartSlice.selectedProduct)
  const cart = useSelector(state=> state.cartSlice.cart)
  const [errMsg,setErrMsg] = useState("");

  const fetchProductDetail = async () => { //fetch product details using API
    try {
      setErrMsg("");
      const response = await axios.get(`https://fakestoreapi.com/products/${productId}`)
      dispatch(selectedProduct(response.data))
    }
    catch(err) {
      setErrMsg(err.toJSON().message)
    }
  }
  useEffect(()=>{
    fetchProductDetail()
    dispatch(clearProduct())
  },[])

  if(state.length === 0) {
    return (<h1>Loading</h1>)
  }
    return (
    <div className='product-details'>
      <ProdDetailWrapper>
        <h1>Product Details</h1>
        {
          errMsg.length < 1 ? 
          (<>
        <h2>{state.title && state.title}</h2>
        <DetailInfoComp>
        <DetailInfoFigure>
          <img src={state.image && state.image} alt="View Product" />
        </DetailInfoFigure>
        <ProdContent>
          <div className="product-description">
            <AlignLeft>{state.description && state.description}</AlignLeft>
          </div>
          <div className="other-details">
            <AlignLeft>Price - {state.price && state.price} $</AlignLeft>
            <AlignLeft>In Stock - {state.rating.count && state.rating.count} </AlignLeft>
            <AlignLeft>Ratings - {state.rating.rate && state.rating.rate}</AlignLeft>
            <AlignLeft>Category - {state.category && state.category}</AlignLeft>
          </div>
        {cart.some(prod => prod.id === state.id) ?<RemoveButton className='remove-btn' onClick={()=>{dispatch(removedFromCart(state.id))}}>Remove from Cart</RemoveButton>:<AddButton className='add-btn' onClick={()=>{dispatch(addedToCart(state.id))}}>Add To Cart</AddButton>
            }
        </ProdContent>
        </DetailInfoComp>
        </>) : (<h2>{errMsg}</h2>)
  }
      </ProdDetailWrapper>
    </div>
  )
}

export default ProductDetail