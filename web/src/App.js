import React from 'react';
import './App.css';

//// importar logo
// import logo from './assets/logo.svg'

// importar componente Login
import Routes from './routes'

// Esse componente é uma função que retorna um conteudo html
function App() {
  return (
    //// h1 de teste
    // <h1>
    //   Hello omnistack!
    // </h1>

    //// adicionando logo na tela
    // <img src={logo} alt="Tindev"/>
    <Routes />
  )
}

export default App;
