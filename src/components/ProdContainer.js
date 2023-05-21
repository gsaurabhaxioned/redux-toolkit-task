import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addedToCart, removedFromCart, totalAmount } from '../features/cart/cartSlice';
import {
  AddButton,
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

  const setValue = (id) => {
    let qtyArr = JSON.parse(window.localStorage.getItem("qty"));
    const val = parseInt(document.querySelector(".prod-qty" + id).value);
  
    let currentProduct = qtyArr.find(prod => prod.id === id);
    if (currentProduct) {
      let index = qtyArr.findIndex(prod => prod.id === currentProduct.id);
      qtyArr[index].value = val;
    } else {
      qtyArr.push({ id: id, value: val });
    }
    window.localStorage.setItem("qty", JSON.stringify(qtyArr));
  }

  const getValue = (id) => {
    let qtyArr = JSON.parse(window.localStorage.getItem("qty"));
    let currentProd = qtyArr.find(prod => prod.id === id);
    if (currentProd) {
      return parseInt(currentProd.value);
    }
    return 1;
  }

  const dispatch = useDispatch();
  const { cart, total } = useSelector((state) => state.cartSlice);

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
        {cart.some((cart) => cart === prod.id) ? (
          <RemoveButton
            className="remove-btn"
            onClick={() => {
              dispatch(removedFromCart(prod.id));
            }}
          >
            Remove from Cart
          </RemoveButton>
        ) : (
          <AddButton
            className="add-btn"
            onClick={() => {
              dispatch(addedToCart(prod.id));
            }}
          >
            Add To Cart
          </AddButton>
        )}
        <ButtonComponent
          className="buy-btn"
          id="buy-btn"
          onClick={() => {
            dispatch(totalAmount(prod.price * prod.qty));
          }}
        >
          Buy ${prod.price}
        </ButtonComponent>
        <SelectQtyComp>
          <p>Select Quantity</p>
          <CounterComp>
            <input
              type="number"
              min={1}
              className={"prod-qty" + prod.id}
              id="prod-qty"
              onChange={() => setValue(prod.id)}
              defaultValue={getValue(prod.id)}
            />
          </CounterComp>
        </SelectQtyComp>
      </ProdContainerComp>
    </>
  );
}

export default ProdContainer;
