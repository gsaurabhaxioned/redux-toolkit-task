import React, { Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addedToCart,removedFromCart } from '../features/cart/cartSlice'
import { AddButton, AllProductsComp, AllProductsContainer, ProdDescriptionComp, ProdImageComp, ProdLinkComp, RemoveButton, Wrapper } from './styles/container.styled'
const ProductCard = React.lazy(()=>import('./ProductCard'))

const ProductComponent = () => {
  const prod = useSelector((state)=>state.cartSlice.products)
  const cart = useSelector((state)=>state.cartSlice.cart)
  const dispatch = useDispatch()

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
    <AllProductsComp>
      <Wrapper>
      {prod.map((prod,i) => (
        <Suspense fallback={<FallbackUI />}>
        <ProductCard prod={prod} key={i} />
        </Suspense>
      ))}
      </Wrapper>
    </AllProductsComp>
  )
}

export default ProductComponent