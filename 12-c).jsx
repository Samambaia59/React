import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [felicidade, setFelicidade] = useState(0);
  const emojis = ['😐', '🙂', '😊', '😁', '🤩'];
  const maxFelicidade = emojis.length - 1;
  const sorrir = () => {
    if (felicidade < maxFelicidade) {
      setFelicidade(felicidade + 1);
    }
  };
  return (
    <div>
      <div>
        <h2>Medidor de Felicidade</h2>
        <div style={{ fontSize: '3rem' }}>
          {emojis[felicidade]}
        </div>
        <button onClick={sorrir} disabled={felicidade === maxFelicidade}>
          Sorrir
        </button>
        <p>Nível de Felicidade: {felicidade}</p>
      </div>
    </div>
  );
}
export default App;