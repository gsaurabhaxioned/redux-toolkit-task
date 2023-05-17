import backgroundImage from '../../assets/images/background.jpg';
const { createGlobalStyle } = require("styled-components");

const GlobalStyle = createGlobalStyle`
  body,#root {
    background: url(${backgroundImage}) no-repeat center center fixed;
    background-size: cover;
    backdrop-filter: blur(5px);

    h1,h2 {
      color: #ff7f50;
      text-align: center;
    }
    h2 {
      color: #fff;
    }

    a {
      text-decoration: none;
    }
  }
`

export default GlobalStyle