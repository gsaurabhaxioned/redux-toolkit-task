import React from 'react'
import { Cart } from './Cart'
import { Link } from 'react-router-dom'
import { HeaderWrapper } from './styles/container.styled'
import { HeaderComp } from './styles/header.styled'

const Header = () => {
  return (
    <HeaderComp>
      <HeaderWrapper>
      <Link to="/">
      <h2>My Store</h2>
      </Link>
      <Cart />
      </HeaderWrapper>
    </HeaderComp>
  )
}

export default Header