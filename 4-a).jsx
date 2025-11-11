import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function CartaoPessoa({nome, idade, profissao}){  
  return(
    <div>
      <h2>{nome}</h2>
      <p><strong>Idade: </strong>{idade}</p>
      <p><strong>Profissão: </strong>{profissao}</p>
    </div>
  );
}


function App() {
  return (
    <div>
      <CartaoPessoa nome = "Gustavo" idade = {19} profissao = "Estudante"/>
    </div>
  );
}


export default App;