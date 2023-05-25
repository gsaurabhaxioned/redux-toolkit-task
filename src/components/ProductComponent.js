import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addedToCart,removedFromCart } from '../features/cart/cartSlice'
import { AddButton, AllProductsComp, AllProductsContainer, ProdDescriptionComp, ProdImageComp, ProdLinkComp, RemoveButton, Wrapper } from './styles/container.styled'
import InfiniteScroll from 'react-infinite-scroller';

const ProductCard = React.lazy(()=>import('./ProductCard'))

const ProductComponent = () => {
  const prod = useSelector((state)=>state.cartSlice.products)
  const cart = useSelector((state)=>state.cartSlice.cart)
  const dispatch = useDispatch()
  const [data, setData] = useState(prod.slice(0,4)) 
  const [hasMore, setHasMore] = useState(true);
  const [startIndex, setStartIndex] = useState(4);
  const [endIndex, setEndIndex] = useState(8)
  console.log("data", data)

  const loadMore = () => {
    const newProducts = prod.slice(startIndex, endIndex);
    if (newProducts.length > 0) {
      setData((prevData) => [...prevData, ...newProducts]);
      setStartIndex(prev => prev + 4)
      console.log("start index", startIndex , typeof(startIndex))
      setEndIndex(prev => prev + 4)
      console.log("end index", endIndex)
    } else {
      setHasMore(false); // No more products to load
    }
  };
  const FallbackUI = () => {
    // Define your fallback UI styles
    const fallbackStyles = {
      color: '#fff',
      textAlign: 'center',
      fontSize: '50px',
    };
  
    return <p style={fallbackStyles}>Loading...</p>;
  };

  const handleInfinityScroll = () => {
    // console.log("scrollHeight ",document.documentElement.scrollHeight)
    // console.log("innerHeight ", window.innerHeight)
    // console.log("scrollTop ", document.documentElement.scrollTop)
    if((window.innerHeight + document.documentElement.scrollTop + 1) >= document.documentElement.scrollHeight) {
      loadMore()
  }
  }
  
useEffect(()=>{
  window.addEventListener("scroll", handleInfinityScroll)
  return () => {
    window.removeEventListener("scroll", handleInfinityScroll)
  }
},[startIndex,endIndex])

  return (
    <AllProductsComp>
      <InfiniteScroll
        hasMore={hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
      <Wrapper>
      {data.map((prod,i) => (
        <Suspense fallback={<FallbackUI />}>
        <ProductCard prod={prod} key={i} />
        </Suspense>
      ))}
      </Wrapper>
      </InfiniteScroll>
    </AllProductsComp>
  )
}

export default ProductComponent