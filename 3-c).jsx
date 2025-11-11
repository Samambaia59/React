import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function MeuRestaurante() {
  const pratos = [
    { nome:'empadão' , preco: 32.90, descricao:'empadão gostoso'},
    { nome:'strogonoff' , preco: 45.50, descricao:'strogonoff gostoso'},
    { nome:'macarrão' , preco: 28.00, descricao:'gostosão'},
    { nome:'nhoque' , preco: 38.70, descricao:'delicia'}
  ];
  return(
    <div>
      <h1>Cardápio do Restaurante</h1>
      <div className = "menu-grid">
        {pratos.map((prato, index) => (
        <div key = {index} className = "prato-card">
          <h3>{prato.nome}</h3>
          <p className="preco">R$ {prato.preco.toFixed(2)}</p>
          <p className="descricao">{prato.descricao}</p>
        </div>
        ))}
      </div>
    </div>
  );
}
export default MeuRestaurante;