import React, { Suspense, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AllProductsComp, Wrapper } from './styles/container.styled'
import InfiniteScroll from 'react-infinite-scroller';

const ProductCard = React.lazy(()=>import('./ProductCard'))

const ProductComponent = () => {
  const prod = useSelector((state)=>state.cartSlice.products)
  const [hasMore, setHasMore] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4)
  const [data, setData] = useState(prod.slice(startIndex,endIndex)) 
  console.log("data", data)

  const loadMore = () => { 
    const newProducts = prod.slice(startIndex + 4, endIndex + 4);
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
    // Defining fallback UI styles
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

useEffect(()=> {
  if(prod.length < 20) {
    setData(prod)
  }else {
    setStartIndex(0)
    setEndIndex(4)
    setData(prod.slice(startIndex,endIndex))
  }
  
},[prod])

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