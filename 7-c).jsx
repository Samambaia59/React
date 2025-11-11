import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Verificacao({ texto }) {
  if (texto.length <= 3) return <p>Digite no minimo 3 caracteres</p>;
  return <p>Texto válido</p>;
}

function corCaracter(texto) {
  if (texto.length <= 3) {
    return "#FF0000";
  } else {
    return "#00ff00ff"
  }
}

function InputTempoReal () {
  const [texto, setTexto] = useState('');

  return (
    <div>
      <h2 style={{color : corCaracter(texto)}}>Titulo: {Verificacao({texto})}</h2>
      <input
        type = "text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Digite algo..."
      />
      <Verificacao texto={texto}/>
    </div>
  );
}

export default InputTempoReal;