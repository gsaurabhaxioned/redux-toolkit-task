import React from "react";
import { useSelector } from "react-redux";
import {
  AllProductsComp,
  ButtonComponent,
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
