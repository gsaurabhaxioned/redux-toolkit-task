import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  addedToCart,
  removedFromCart,
  totalAmount,
  updateQty,
} from "../features/cart/cartSlice";
import axios from "axios";
import {
  AddButton,
  AllProductsComp,
  ButtonComponent,
  CounterComp,
  ProdContainerComp,
  ProdDescriptionComp,
  ProdImageComp,
  RemoveButton,
  SelectQtyComp,
  Wrapper,
} from "./styles/container.styled";
import ProdContainer from "./ProdContainer";

const Cartlist = () => {
  const { cart, total } = useSelector((state) => state.cartSlice);
  const { carts = cart } = useSelector((state) => state.cartSlice);
  return (
    <>
      <h2>Added in your cart</h2>
      <ButtonComponent>Pay: {total.toFixed(2)} $</ButtonComponent>
      <AllProductsComp>
        <Wrapper>
          {carts.map((prod) => {
              return  (
                <ProdContainer prod={prod} />
              ) 
          })}
        </Wrapper>
      </AllProductsComp>
    </>
  );
};

export default Cartlist;
