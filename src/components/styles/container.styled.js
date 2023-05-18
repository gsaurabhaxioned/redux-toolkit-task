import { styled } from "styled-components";
import { Link } from "react-router-dom";
import keyframes from "styled-components";


export const Wrapper = styled.div`
  width: 90%;
  margin: auto;

  @media only screen and (min-width: 768px) {
      display: flex;
      flex-wrap: wrap;
      column-gap: 20px;
    }
  @media only screen and (max-width: 1024px) {
      justify-content: center;
    }
`
export const ProdDetailWrapper = styled(Wrapper)`
  display: block;
  text-align: center;
  color: #b0c4de;
  img {
    width: 225px;
  }
` 

export const FilterOptionsWrapper = styled(Wrapper)`
  width: 50%;
  display: flex;
  justify-content: space-between;
  span {
    @media only screen and (max-width: 1024px) {
      display: flex;
      justify-content: space-between;
    }
    label {
      color: #fff8dc;
    }
  }
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    row-gap: 20px;
  }
`

export const HeaderWrapper = styled(Wrapper)`
    display: flex;
    justify-content: space-between;
`

export const AllProductsComp = styled.div`
    text-align: center;
`
export const AllProductsContainer = styled.div`
    display: flex;
    position: relative;
    flex-basis: 20%;

    & > p {
    position: absolute;
    right: 0;
    z-index: 2;
    }
`

export const ProdContainerComp = styled.div`
    position: relative;
    margin: 20px 0;
    border-radius: 10px;
    text-decoration: none;
    z-index: 1;

    h2 {
      color: #7fffd4;
      font-size: 18px;
    }
    padding: 20px;
    background-color: #000;
    color: #fff;
    text-align: center;
    p {
      font-size: 20px;
    }
    span {
      color: #808080;
      @media only screen and (max-width: 767px) {
        color: #fff;
      }
    }
    @media only screen and (min-width: 768px) {
      flex-basis: 20%;
    }
    button.add-btn,button.remove-btn,button.buy-btn {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 2;
      @media only screen and (max-width: 767px) {
        position: relative;
        display: block;
        margin: 20px auto;
      }
    }
    button.buy-btn {
      width: 45%;
      background-color: #008000;
      left: 0;
    }
    @media only screen and (max-width: 767px) {
      background-color: transparent;
    }
    @media only screen and (max-width: 1024px) {
      flex-basis: 40%;
    }
`
export const ProdLinkComp = styled(Link)`
      position: relative;
    margin: 20px 0;
    border-radius: 10px;
    text-decoration: none;
    z-index: 1;

    h2 {
      color: #7fffd4;
      font-size: 18px;
    }
    padding: 20px;
    background-color: #000;
    color: #fff;
    text-align: center;
    p {
      font-size: 20px;
    }
    span {
      color: #808080;
      @media only screen and (max-width: 767px) {
        color: #fff;
      }
    }
    @media only screen and (min-width: 768px) {
      flex-basis: 20%;
    }
    button.add-btn,button.remove-btn,button.buy-btn {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 2;
      @media only screen and (max-width: 767px) {
        position: relative;
        display: block;
        margin: 20px auto;
      }
    }
    button.buy-btn {
      width: 45%;
      background-color: #008000;
      left: 0;
    }
    @media only screen and (max-width: 767px) {
      background-color: transparent;
    }
    @media only screen and (max-width: 1024px) {
      flex-basis: 40%;
    }
`

export const ProdImageComp = styled.figure`
  img {
    width: 200px;
    height: 200px;
  }
`

export const ProdDescriptionComp = styled.p`
  color: #00ffff;
    word-wrap: break-word;
`
export const CounterComp = styled.div`
  height: 18px;
  display: flex;
  justify-content: center;
  column-gap: 10px;
  align-items: center;
  p {
    cursor: pointer;
  }
`
export const SelectQtyComp = styled.div`
  input {
  width: 50px;
}
`
export const DetailInfoComp = styled.div`
  display: flex;
  @media only screen and (max-width: 767px) {
    display: block;
  }
`
export const DetailInfoFigure = styled.figure`
  flex-basis: 30%;
`
export const AlignLeft = styled.p`
  text-align: left;
`

export const ProdContent = styled.div`
  flex-basis: 50%;
`
export const ButtonComponent = styled.button`
  padding: 0.6em 2em;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:disabled {
  background-color: #c4042e;
  color: #fff;
  }

  &:disabled::before {
    background: linear-gradient(45deg,#ff0000,#ff0000);
  }
`
export const RemoveButton = styled(ButtonComponent)`
  background-color: #c4042e;
  color: #fff;
  &::before {
    background: linear-gradient(45deg,#ff0000,#ff0000);
  }
`
const glowingButton = keyframes`
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
`

export const AddButton = styled(ButtonComponent)`
  &::before {
  content: "";
  background: linear-gradient(45deg, #ff0000,#002bff,#7a00ff,#ff00c8,#ff0000);
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: ${glowingButton} 20s linear infinite;
  transition: opacity 6s ease-in-out;
  border-radius: 10px;
  }
`