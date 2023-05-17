import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addedToCart,removedFromCart } from '../features/cart/cartSlice'
import { AddButton, AllProductsComp, ProdDescriptionComp, ProdImageComp, ProdLinkComp, RemoveButton, Wrapper } from './styles/container.styled'

const ProductComponent = () => {
  const prod = useSelector((state)=>state.cartSlice.products)
  console.log(prod)
  const cart = useSelector((state)=>state.cartSlice.cart)
  const dispatch = useDispatch()
  
  return (
    <AllProductsComp>
      <Wrapper>
      {prod.map(prod => (
        <ProdLinkComp to={`/product/${prod.id}`} key={prod.id}>
        <ProdImageComp>
          <img src={prod.image} alt="View Product" />
        </ProdImageComp>
        <h2>{prod.title}</h2>
        <p>{prod.price} $</p>
        <ProdDescriptionComp>{prod.description.substr(0,100)}...</ProdDescriptionComp>
        <p>Ratings : {prod.rating.rate}</p> 
        <p>In stock : {prod.rating.count}</p>
        <span className='prod-category'>{prod.category}</span>
        {
          cart.some(p => p === prod.id) ?
               <RemoveButton className='remove-btn' onClick={()=>{dispatch(removedFromCart(prod.id))}}>Remove from Cart</RemoveButton>:<AddButton className='add-btn' onClick={()=>{dispatch(addedToCart(prod.id))}}>Add To Cart</AddButton>
        }
        
        </ProdLinkComp>
      ))}
      </Wrapper>
    </AllProductsComp>
  )
}

export default ProductComponent