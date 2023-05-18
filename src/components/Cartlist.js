import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  addedToCart,
  removedFromCart,
  totalAmount,
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

const Cartlist = () => {
  const dispatch = useDispatch();
  const { cart, total } = useSelector((state) => state.cartSlice);
  const [errMsg, setErrMsg] = useState("");
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
              prod = {
                ...prod,
                qty: 1,
              }; /* default qty */

              const setValue = () => {
                prod.qty = parseInt(
                  document.getElementsByClassName("prod-qty" + prod.id)[0].value
                );
              };

              return errMsg.length < 1 ? (
                <ProdContainerComp>
                  <ProdImageComp>
                    <img src={prod.image} alt="View Product" />
                  </ProdImageComp>
                  <h2>{prod.title}</h2>
                  <p>{prod.price} $</p>
                  <ProdDescriptionComp>
                    {prod.description.substr(0, 100)}...
                  </ProdDescriptionComp>
                  <p>Ratings : {prod.rating.rate}</p>
                  <p>In stock : {prod.rating.count}</p>
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
                    onClick={(e) => {
                      setValue();
                      dispatch(totalAmount(prod.price * prod.qty));
                    }}
                  >
                    Buy ${prod.price}
                  </ButtonComponent>
                  <SelectQtyComp>
                    <p>Select Quantity</p>
                    <CounterComp>
                      <input
                        type="number" min={1}
                        className={"prod-qty" + prod.id}
                        id="prod-qty"
                        onChange={() => setValue()}
                        defaultValue={prod.qty}
                      />
                    </CounterComp>
                  </SelectQtyComp>
                </ProdContainerComp>
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
