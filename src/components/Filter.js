import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { electronicsSelected, jewelrySelected, menClothingSelected, setProducts, womenClothingSelected } from '../features/cart/cartSlice'
import { ButtonComponent, FilterOptionsWrapper } from './styles/container.styled'

const Filter = () => {
  const dispatch = useDispatch()
  const state = useSelector(state=>state)
  const clearFilters = () => {  // clear applied filter
    let radio = document. querySelector('input[type=radio]:checked');
    if(radio) radio.checked = false;
    dispatch(setProducts(state.cartSlice.allProducts))
  }
  return (
    <div className='filter-options'>
      <FilterOptionsWrapper>
      <span>
      <label>Women's clothing</label>
        <input inline name="group1" type="radio" onChange={()=>dispatch(womenClothingSelected())} />
      </span>
      <span>
        <label>Men's clothing</label>
        <input inline name="group1" type="radio" onChange={()=>dispatch(menClothingSelected())} />
      </span>
      <span>
      <label>Electronics</label>
        <input inline name="group1" type="radio" onChange={()=>dispatch(electronicsSelected())} />
      </span>
      <span>
      <label>Jewelry</label>
        <input inline name="group1" type="radio" onChange={()=>dispatch(jewelrySelected())} />
      </span>
      <ButtonComponent onClick={()=>clearFilters()}>
        Clear Filter
      </ButtonComponent>
      </FilterOptionsWrapper>
    </div>
  )
}

export default Filter