import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { selectedProduct,addedToCart,removedFromCart,clearProduct } from '../features/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { AddButton, DetailInfoComp, DetailInfoFigure, ProdContent, ProdDetailWrapper, RemoveButton } from './styles/container.styled'

const ProductDetail = () => {
  const {productId} = useParams()
  const dispatch = useDispatch()
  const store = useSelector(state => state)
  const state = useSelector(state=>state.cartSlice.selectedProduct)
  const cart = useSelector(state=> state.cartSlice.cart)
  const [errMsg,setErrMsg] = useState("");

 
  
  const fetchProductDetail = async () => {
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
    // console.log("use effect")
    fetchProductDetail()
    dispatch(clearProduct())
    console.log(state)
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
            <p>{state.description && state.description}</p>
          </div>
          <div className="other-details">
            <p>Price - {state.price && state.price} $</p>
            <p>In Stock - {state.rating.count && state.rating.count} </p>
            <p>Ratings - {state.rating.rate && state.rating.rate}</p>
            <p>Category - {state.category && state.category}</p>
          </div>
        {cart.some(cart => cart === state.id) ?<RemoveButton className='remove-btn' onClick={()=>{dispatch(removedFromCart(state.id))}}>Remove from Cart</RemoveButton>:<AddButton className='add-btn' onClick={()=>{dispatch(addedToCart(state.id));console.log(store)}}>Add To Cart</AddButton>
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