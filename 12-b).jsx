import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [favoritos, setFavoritos] = useState(0);
  const [favoritado, setFavoritado] = useState(false);
  const favorito = () => {
    if (favoritado) {
      setFavoritos(favoritos - 1);
      setFavoritado(false);
    } else {
      setFavoritos(favoritos + 1);
      setFavoritado(true);
    }
  };
  return (
    <div>
      <div>
        <h2>Sistema de Favoritos</h2>
        <button onClick={favorito}>
          {favoritado ? "Desfavoritar ★" : "Favoritar ☆"}
        </button>
        <p>
          {favoritos} {favoritos === 1 ? "favorito" : "favoritos"}
        </p>
      </div>
    </div>
  );
}
export default App;