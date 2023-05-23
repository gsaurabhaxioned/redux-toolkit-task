import React, { useState } from 'react'
import ProductComponent from './ProductComponent'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../features/cart/cartSlice'
import Filter from './Filter'
import { fetchProducts } from '../actions'

const ProductListing = () => {
  const dispatch = useDispatch();
  console.log(useSelector(state => state))
  const { loading, error } = useSelector(state => state.cartSlice);
  // const [errMsg,setErrMsg] = useState("")

  // const fetchProducts = async () => { // fetching products from API
  //   try {
  //     setErrMsg("")
  //     const products = await axios.get("https://fakestoreapi.com/products");
  //     dispatch(setProducts(products.data))
  //   }
  //   catch(err) {
  //     setErrMsg(err.toJSON().message)
  //   }
  // }

  // kept the above ^ commented code for my reference 

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <p style={{color:'#fff',textAlign: 'center', fontSize: '50px'}}>Loading...</p>;
  }

  if (error) {
    return <p style={{color:'#fff',textAlign: 'center', fontSize: '50px'}}>Error: {error}</p>;
  }

  return (
    <div>
      <h1>All Products</h1>
      <>
      <Filter />
      <ProductComponent  />
      </>
      </div>
  )
}

export default ProductListing