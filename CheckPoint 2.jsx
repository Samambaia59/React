import React, { useState } from "react";

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#0a192f",
    color: "#e0e0e0",
    minHeight: "100vh",
  },
  tituloPrincipal: {
    textAlign: "center",
    color: "#00d1d1",
    borderBottom: "1px solid #00d1d1",
    paddingBottom: "10px",
    letterSpacing: "2px",
  },
  listaPrincipal: {
    backgroundColor: "rgba(10, 25, 40, 0.75)",
    border: "1px solid #00d1d1",
    borderRadius: "8px",
    padding: "10px 30px",
    maxWidth: "800px",
    margin: "20px auto",
    boxShadow: "0 0 10px rgba(0, 209, 209, 0.3)",
  },
  secao: {
    padding: "15px 0",
  },
  divisor: {
    border: 0,
    height: "1px",
    backgroundColor: "rgba(0, 209, 209, 0.3)",
  },
  h2: {
    borderBottom: "1px solid #00d1d1",
    paddingBottom: "5px",
    color: "#00d1d1",
    letterSpacing: "1px",
  },
  barraProgresso: {
    width: "100%",
    backgroundColor: "#000",
    borderRadius: "5px",
    height: "25px",
    overflow: "hidden",
  },
  lista: {
    listStyleType: "none",
    paddingLeft: "0",
  },
  itemLista: {
    padding: "8px 0",
    borderBottom: "1px solid #0a192f",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#00d1d1",
    color: "#0a192f",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "5px",
    fontWeight: "bold",
    transition: "transform 0.2s",
  },
  buttonSecundario: {
    backgroundColor: "#334",
    color: "#e0e0e0",
  },
  input: {
    width: "calc(100% - 20px)",
    padding: "8px",
    margin: "5px 0",
    border: "1px solid #00d1d1",
    borderRadius: "4px",
    backgroundColor: "#000",
    color: "#e0e0e0",
  },
};

function App() {
  const [nomePersonagem, setNomePersonagem] = useState("Herói");
  const [raca, setRaca] = useState("Humano");
  const [classe, setClasse] = useState("Guerreiro");
  const [statusVisivel, setStatusVisivel] = useState(false);

  const [pontosDisponiveis, setPontosDisponiveis] = useState(10);
  const [atributos, setAtributos] = useState({
    forca: 1,
    resistencia: 1,
    inteligencia: 1,
    sorte: 1,
  });

  const forca = atributos.forca;
  const resistencia = atributos.resistencia;
  const inteligencia = atributos.inteligencia;
  const sorte = atributos.sorte;

  const maxHp = 100;
  const [hp, setHp] = useState(maxHp);

  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const XP_PARA_LEVEL = 300;

  const [inventarioAberto, setInventarioAberto] = useState(false);
  const [itens, setItens] = useState([
    "Blaster Curto",
    "Pacote de Cura",
    "Holomapa",
  ]);

  const [ouro, setOuro] = useState(50);
  const [lojaVisivel, setLojaVisivel] = useState(false);
  const LOJA_ITENS = [
    { nome: "Pacote de Cura", preco: 15 },
    { nome: "Rifle de Plasma", preco: 50 },
    { nome: "Célula de Energia", preco: 20 },
  ];

  const [missoes, setMissoes] = useState([
    {
      id: 1,
      texto: "Contatar mais guerreiros",
      categoria: "Principal",
      completa: false,
    },
  ]);
  const [novaMissaoInput, setNovaMissaoInput] = useState("");
  const [novaMissaoCategoria, setNovaMissaoCategoria] = useState("Secundária");

  const [palavraBase, setPalavraBase] = useState("");
  const [encantamentoGerado, setEncantamentoGerado] = useState("");

  const [party, setParty] = useState([
    { id: 1, nome: "Gustavo", classe: "Guerreiro", nivel: 1 },
    { id: 2, nome: "João", classe: "Mago", nivel: 2 },
    { id: 3, nome: "Samanbaia", classe: "Arqueiro", nivel: 3 },
  ]);

  const handleCurar = () => {
    const pocaoIndex = itens.indexOf("Pacote de Cura");
    if (pocaoIndex > -1) {
      setHp((h) => Math.min(h + 10, maxHp));
      const novosItens = [...itens];
      novosItens.splice(pocaoIndex, 1);
      setItens(novosItens);
    } else {
      alert("Você não tem 'Pacote de Cura'!");
    }
  };

  const handleDano = () => {
    setHp((h) => Math.max(h - 15, 0));
  };

  const getCorVida = (hpAtual, hpMax) => {
    const perc = (hpAtual / hpMax) * 100;
    if (perc < 30) return "#f44336";
    if (perc <= 70) return "#ffeb3b";
    return "#4caf50";
  };

  const ganharXp = (quantidade) => {
    const novoXpTotal = xp + quantidade;
    if (novoXpTotal >= XP_PARA_LEVEL) {
      setLevel(level + 1);
      setXp(0);
      alert("VOCÊ SUBIU DE NÍVEL!");
    } else {
      setXp(novoXpTotal);
    }
  };

  const handleAddMissao = () => {
    if (novaMissaoInput.trim() === "") return;
    const novaMissao = {
      id: Date.now(),
      texto: novaMissaoInput,
      categoria: novaMissaoCategoria,
      completa: false,
    };
    setMissoes([...missoes, novaMissao]);
    setNovaMissaoInput("");
  };

  const handleToggleMissao = (id) => {
    let missaoCompleta = false;
    const novasMissoes = missoes.map((m) => {
      if (m.id === id) {
        if (!m.completa) {
          missaoCompleta = true;
        }
        return { ...m, completa: !m.completa };
      }
      return m;
    });
    setMissoes(novasMissoes);

    if (missaoCompleta) {
      ganharXp(100);
      setOuro((o) => o + 25);
    }
  };

  const handleGerarEncantamento = () => {
    if (!palavraBase) return;
    const invertida = palavraBase.split("").reverse().join("");
    setEncantamentoGerado(`Calipso ${invertida.toUpperCase()}!`);
  };

  const handleUpdateNivelParty = (id, novoNivel) => {
    const n = parseInt(novoNivel) || 1;
    setParty(party.map((m) => (m.id === id ? { ...m, nivel: n } : m)));
  };
  const partyOrdenada = [...party].sort((a, b) => b.nivel - a.nivel);

  const handleAumentarAtributo = (attr) => {
    if (pontosDisponiveis > 0) {
      setAtributos((a) => ({ ...a, [attr]: a[attr] + 1 }));
      setPontosDisponiveis((p) => p - 1);
    }
  };

  const handleDiminuirAtributo = (attr) => {
    if (atributos[attr] > 1) {
      setAtributos((a) => ({ ...a, [attr]: a[attr] - 1 }));
      setPontosDisponiveis((p) => p + 1);
    }
  };

  const handleComprarItem = (item) => {
    if (ouro >= item.preco) {
      setOuro((o) => o - item.preco);
      setItens((i) => [...i, item.nome]);
    } else {
      alert("Ouro insuficiente!");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.tituloPrincipal}>PAINEL DO HERÓI: {nomePersonagem}</h1>

      <div style={styles.listaPrincipal}>
        <div style={styles.secao}>
          <h2 style={styles.h2}>Personagem</h2>
          <label>Nome:</label>
          <input
            type="text"
            value={nomePersonagem}
            onChange={(e) => setNomePersonagem(e.target.value)}
            style={styles.input}
          />
          <label>Raça:</label>
          <select
            style={styles.input}
            value={raca}
            onChange={(e) => setRaca(e.target.value)}
          >
            <option>Humano</option>
            <option>Elfo</option>
            <option>Anão</option>
            <option>Orc</option>
          </select>
          <label>Classe:</label>
          <select
            style={styles.input}
            value={classe}
            onChange={(e) => setClasse(e.target.value)}
          >
            <option>Guerreiro</option>
            <option>Mago</option>
            <option>Arqueiro</option>
            <option>Ladino</option>
          </select>
          <button
            style={styles.button}
            onClick={() => setStatusVisivel(!statusVisivel)}
          >
            {statusVisivel ? "Esconder" : "Mostrar"} Efeitos de Status
          </button>
          {statusVisivel && (
            <ul style={styles.lista}>
              <li style={styles.itemLista}>
                {hp < maxHp * 0.3 ? "Vida Baixa (Crítico)" : "Saudável"}
              </li>
              <li style={styles.itemLista}>
                {classe === "Mago" ? "Afinidade Arcana" : "Vigor Físico"}
              </li>
            </ul>
          )}
        </div>

        <hr style={styles.divisor} />

        <div style={styles.secao}>
          <h2 style={styles.h2}>Atributos</h2>
          <h3>Pontos para Distribuir: {pontosDisponiveis}</h3>
          <ul style={styles.lista}>
            {Object.keys(atributos).map((attr) => (
              <li key={attr} style={styles.itemLista}>
                <span>
                  {attr.charAt(0).toUpperCase() + attr.slice(1)}:{" "}
                  <strong>{atributos[attr]}</strong>
                </span>
                <div>
                  <button
                    style={{ ...styles.button, padding: "5px 10px" }}
                    onClick={() => handleAumentarAtributo(attr)}
                    disabled={pontosDisponiveis === 0}
                  >
                    +
                  </button>
                  <button
                    style={{
                      ...styles.button,
                      ...styles.buttonSecundario,
                      padding: "5px 10px",
                    }}
                    onClick={() => handleDiminuirAtributo(attr)}
                    disabled={atributos[attr] === 1}
                  >
                    -
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <ul>
            <li>Dano: {forca + 10}</li>
            <li>Dano reduzido: {resistencia + 10}</li>
            <li>Mana: {inteligencia + 10}</li>
            <li>
              Chance de critico {Math.min((sorte / 300) * 100, 100).toFixed(0)}%
            </li>
          </ul>
        </div>

        <hr style={styles.divisor} />

        <div style={styles.secao}>
          <h2 style={styles.h2}>Combate</h2>
          <h3>
            Vida (HP): {hp} / {maxHp}
          </h3>
          <div style={styles.barraProgresso}>
            <div
              style={{
                width: `${(hp / maxHp) * 100}%`,
                height: "100%",
                backgroundColor: getCorVida(hp, maxHp),
              }}
            ></div>
          </div>
          <button
            style={styles.button}
            onClick={handleCurar}
            disabled={itens.indexOf("Pacote de Cura") === -1}
          >
            Usar Pacote de Cura (+10 HP)
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonSecundario }}
            onClick={handleDano}
            disabled={hp === 0}
          >
            Sofrer Dano (-15 HP)
          </button>
          {hp === 0 && <h3 style={{ color: "red" }}>VOCÊ MORREU!</h3>}
        </div>

        <hr style={styles.divisor} />

        <div style={styles.secao}>
          <h2 style={styles.h2}>Experiência</h2>
          <h3>Nível: {level}</h3>
          <p>
            XP: {xp} / {XP_PARA_LEVEL}
          </p>
          <div style={styles.barraProgresso}>
            <div
              style={{
                width: `${(xp / XP_PARA_LEVEL) * 100}%`,
                height: "100%",
                backgroundColor: "#03a9f4",
              }}
            ></div>
          </div>
          <button style={styles.button} onClick={() => ganharXp(50)}>
            Derrotar Inimigo (+50 XP)
          </button>
        </div>

        <hr style={styles.divisor} />

        <div style={styles.secao}>
          <h2 style={styles.h2}>Inventário</h2>
          <button
            style={styles.button}
            onClick={() => setInventarioAberto(!inventarioAberto)}
          >
            {inventarioAberto ? "Fechar Mochila 📜" : "Abrir Mochila 🎒"}
          </button>
          {inventarioAberto && (
            <ul style={styles.lista}>
              {itens.length > 0 ? (
                itens.map((item, index) => (
                  <li key={index} style={styles.itemLista}>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li style={styles.itemLista}>Mochila vazia</li>
              )}
            </ul>
          )}
        </div>

        <hr style={styles.divisor} />

        <div style={styles.secao}>
          <h2 style={styles.h2}>Economia</h2>
          <h3>Créditos: {ouro} 🪙</h3>
          <button style={styles.button} onClick={() => setOuro((o) => o + 25)}>
            Receber Pagamento (+25)
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonSecundario }}
            onClick={() => setLojaVisivel(!lojaVisivel)}
          >
            {lojaVisivel ? "Fechar Mercado" : "Abrir Mercado"}
          </button>
          {lojaVisivel && (
            <>
              <h3 style={styles.h2}>Itens à Venda</h3>
              <ul style={styles.lista}>
                {LOJA_ITENS.map((item, index) => (
                  <li key={index} style={styles.itemLista}>
                    <span>
                      {item.nome} ({item.preco} 🪙)
                    </span>
                    <button
                      style={{ ...styles.button, padding: "5px 10px" }}
                      onClick={() => handleComprarItem(item)}
                      disabled={ouro < item.preco}
                    >
                      Comprar
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <hr style={styles.divisor} />

        <div style={styles.secao}>
          <h2 style={styles.h2}>Diário de Viagens</h2>
          <p>Missões Completas: {missoes.filter((m) => m.completa).length}</p>
          <div>
            <input
              type="text"
              placeholder="Novo registro..."
              value={novaMissaoInput}
              onChange={(e) => setNovaMissaoInput(e.target.value)}
              style={styles.input}
            />
            <select
              style={styles.input}
              value={novaMissaoCategoria}
              onChange={(e) => setNovaMissaoCategoria(e.target.value)}
            >
              <option>Principal</option>
              <option>Secundária</option>
              <option>Urgente</option>
            </select>
            <button style={styles.button} onClick={handleAddMissao}>
              Adicionar Registro
            </button>
          </div>
          <h3 style={styles.h2}>
            Missões Ativas ({missoes.filter((m) => !m.completa).length})
          </h3>
          <ul style={styles.lista}>
            {missoes
              .filter((m) => !m.completa)
              .map((m) => (
                <li
                  key={m.id}
                  style={{
                    ...styles.itemLista,
                    borderColor: m.categoria === "Urgente" ? "red" : "inherit",
                  }}
                >
                  <span>
                    ({m.categoria}) {m.texto}
                  </span>
                  <button
                    style={{ ...styles.button, padding: "5px 10px" }}
                    onClick={() => handleToggleMissao(m.id)}
                  >
                    Completar
                  </button>
                </li>
              ))}
          </ul>
        </div>

        <hr style={styles.divisor} />

        <div style={styles.secao}>
          <h2 style={styles.h2}>Party (Ranking)</h2>
          <ol style={styles.lista}>
            {partyOrdenada.map((m, index) => (
              <li key={m.id} style={styles.itemLista}>
                <span>
                  <strong>
                    {index + 1}. {m.nome}
                  </strong>{" "}
                  ({m.classe})
                </span>
                {m.id === 1 ? (
                  <span>Nível: {level} (Você)</span>
                ) : (
                  <input
                    type="number"
                    value={m.nivel}
                    onChange={(e) =>
                      handleUpdateNivelParty(m.id, e.target.value)
                    }
                    style={{ ...styles.input, width: "50px" }}
                  />
                )}
              </li>
            ))}
          </ol>
        </div>

        <hr style={styles.divisor} />

        <div style={styles.secao}>
          <h2 style={styles.h2}>Encantamentos</h2>
          <input
            type="text"
            placeholder="Palavra mágica base..."
            value={palavraBase}
            onChange={(e) => setPalavraBase(e.target.value)}
            style={styles.input}
          />
          <button style={styles.button} onClick={handleGerarEncantamento}>
            Gerar Encantamento
          </button>
          {encantamentoGerado && (
            <h3 style={styles.h2}>{encantamentoGerado}</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
