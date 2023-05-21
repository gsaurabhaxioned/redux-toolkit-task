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
  const dispatch = useDispatch();
  const { cart, total } = useSelector((state) => state.cartSlice);
  const [errMsg, setErrMsg] = useState("");
  const prod = useSelector((state)=>state.cartSlice.products)
  const fetchProducts = async () => {
    try {
      setErrMsg("");
      const products = await axios.get("https://fakestoreapi.com/products");
      dispatch(setProducts(products.data));
    } catch (err) {
      setErrMsg(err.toJSON().message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // console.log(prod)

  const { products, carts = cart } = useSelector((state) => state.cartSlice);
  return (
    <>
      <h2>Added in your cart</h2>
      <ButtonComponent>Pay: {total.toFixed(2)} $</ButtonComponent>
      <AllProductsComp>
        <Wrapper>
          {carts.map((id) => {
            let prod = products.find((product) => product.id === id);
            if (prod) {
              return errMsg.length < 1 ? (
                <ProdContainer prod={prod} />
              ) : (
                <h2>{errMsg}</h2>
              );
            }
          })}
        </Wrapper>
      </AllProductsComp>
    </>
  );
};

export default Cartlist;
