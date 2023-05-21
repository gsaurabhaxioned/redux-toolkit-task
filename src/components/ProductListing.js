import React, { useState } from 'react'
import ProductComponent from './ProductComponent'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../features/cart/cartSlice'
import Filter from './Filter'

const ProductListing = () => {
  const dispatch = useDispatch();
  const state = useSelector(state=>state)
  const [errMsg,setErrMsg] = useState("")
  const fetchProducts = async () => { // fetching products from API
    try {
      setErrMsg("")
      const products = await axios.get("https://fakestoreapi.com/products");
      dispatch(setProducts(products.data))
    }
    catch(err) {
      setErrMsg(err.toJSON().message)
    }
  }

  useEffect(()=>{
    fetchProducts()
  },[])

  return (
    <div>
      <h1>All Products</h1>
      { errMsg.length < 1 ? 
      (
      <>
      <Filter />
      <ProductComponent />
      </>
      )
      :
      (<h2>{errMsg}</h2>)
      }
      </div>
  )
}

export default ProductListing