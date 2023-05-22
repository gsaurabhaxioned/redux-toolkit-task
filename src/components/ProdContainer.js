import React from 'react';
import { useDispatch } from 'react-redux';
import {  decreaseQty, increaseQty, removedFromCart, totalAmount } from '../features/cart/cartSlice';
import {
  ButtonComponent,
  CounterComp,
  ProdContainerComp,
  ProdDescriptionComp,
  ProdImageComp,
  RemoveButton,
  SelectQtyComp
} from './styles/container.styled';

const ProdContainer = ({prod}) => {
  if (!window.localStorage.getItem("qty")) {
    window.localStorage.setItem("qty", JSON.stringify([]));
  }

 const dispatch = useDispatch(); 

  return (
    <>
      <ProdContainerComp>
        <ProdImageComp>
          <img src={prod.image} alt="View Product" />
        </ProdImageComp>
        <h2>{prod.title}</h2>
        <p>{prod.price} $</p>
        <ProdDescriptionComp>
          {prod.description.substr(0, 100)}...
        </ProdDescriptionComp>
        <p>Ratings: {prod.rating.rate}</p>
        <p>In stock: {prod.rating.count}</p>
        <span className="prod-category">{prod.category}</span>
          <RemoveButton
            className="remove-btn"
            onClick={() => {
              dispatch(removedFromCart(prod.id));
            }}
          >
            Remove from Cart
          </RemoveButton>
        <ButtonComponent
          className="buy-btn"
          id="buy-btn"
          onClick={() => {
            dispatch(totalAmount(prod.price * parseInt(prod.quantity)));
          }}
        >
          Buy ${prod.price}
        </ButtonComponent>
        <SelectQtyComp>
          <p>Select Quantity</p>
          <CounterComp>
            <span onClick={() => dispatch(decreaseQty(prod))}>-</span>
            {prod.quantity}
            <span onClick={() => dispatch(increaseQty(prod))}>+</span>
          </CounterComp>
        </SelectQtyComp>
      </ProdContainerComp>
    </>
  );
}

export default ProdContainer;
