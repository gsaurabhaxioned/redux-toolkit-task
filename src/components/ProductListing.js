import React, { Suspense, useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../actions'

const Filter = React.lazy(()=> import('./Filter'))
const ProductComponent = React.lazy(() => import('./ProductComponent'))

const ProductListing = () => {
  const dispatch = useDispatch();
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

  const FallbackUI = () => {
    // Define your fallback UI styles
    const fallbackStyles = {
      color: '#fff',
      textAlign: 'center',
      fontSize: '50px',
    };
  
    return <p style={fallbackStyles}>Loading...</p>;
  };

  return (
    <div>
      <h1>All Products</h1>
      <>
      <Suspense fallback={<FallbackUI />}>
      <Filter />
      </Suspense>
      <Suspense fallback={<FallbackUI />}>
      <ProductComponent  />
      </Suspense>
      </>
      </div>
  )
}

export default ProductListing