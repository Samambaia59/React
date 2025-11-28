import React from "react";

function App() {
  const dadosMissao = {
    comandante: "Gustavo",
    progresso: 65,
    planetaDestino: {
      nome: "Europa",
      temperatura: -171,
      gravidade: "0.13g (1.31 m/s²)",
      descricao:
        "Lua de Júpiter, com uma superfície de gelo que pode esconder um oceano de água líquida.",
    },
    previsaoEspacial: {
      clima: "Cinturão de Radiação",
      radiacaoCosmica: "Crítica",
    },
    relatorioBordo: [
      "Saída da órbita de Marte concluída.",
      "Assistência gravitacional de Júpiter executada.",
      "Sensores de gelo profundo ativados.",
      "Aguardando janela para inserção orbital em Europa.",
    ],
  };

  const getIconeClima = (temperatura) => {
    if (temperatura < -100) return "🥶";
    if (temperatura < 0) return "❄️";
    return "☀️";
  };

  const getIconePrevisao = (clima) => {
    const icones = {
      "Cinturão de Radiação": "☢️",
      "Vento Solar Moderado": "💨",
    };
    return icones[clima] || "🛰️";
  };

  const getCorProgresso = (progresso) => {
    if (progresso < 40) return "#ff6b81";
    if (progresso < 60) return "#ffa502";
    return "#00d15eff";
  };

  const dataAtual = new Date();

  const styles = {
    global: `
      html, body, #root {
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: 'Roboto Mono', monospace;
      }
    `,
    dashboard: {
      background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
      color: "#f0f0f0",
      padding: "40px 20px",
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      boxSizing: 'border-box',
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "25px",
      width: "100%",
      maxWidth: "1200px",
      marginTop: '40px',
    },
    infoBox: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      border: "1px solid rgba(0, 209, 209, 0.5)",
      borderRadius: "8px",
      padding: "20px",
      backdropFilter: "blur(8px)",
      boxShadow: '0 0 15px rgba(0, 209, 209, 0.2)',
      transition: 'all 0.3s ease',
    },
    titulo: {
      color: "#00d1d1",
      textAlign: "center",
      fontWeight: '400',
      letterSpacing: '3px',
      fontSize: '2.5rem',
    },
  };

  return (
    <>
      <style>{styles.global}</style>
      <div style={styles.dashboard}>
        <h1 style={styles.titulo}>
          Bem-vindo, Comandante {dadosMissao.comandante}!
        </h1>

        <div style={styles.grid}>
          <div style={styles.infoBox}>
            <p>
              Data Estelar: {dataAtual.getFullYear()}.
              {dataAtual.getMonth() + 1}.{dataAtual.getDate()}
            </p>
            <p>
              Horário de {dadosMissao.planetaDestino.nome}: {dataAtual.getHours()}:
              {dataAtual.getMinutes()}:{dataAtual.getSeconds()}
            </p>
          </div>

          <div style={styles.infoBox}>
            <h2>Status da Missão</h2>
            <p>Progresso até Europa: {dadosMissao.progresso}%</p>
            <div style={{ width: "100%", backgroundColor: "rgba(0,0,0,0.2)", borderRadius: "5px" }}>
              <div
                style={{
                  width: `${dadosMissao.progresso}%`,
                  backgroundColor: getCorProgresso(dadosMissao.progresso),
                  height: "20px",
                  borderRadius: "5px",
                  boxShadow: `0 0 10px ${getCorProgresso(dadosMissao.progresso)}`,
                }}
              ></div>
            </div>
          </div>

          <div style={styles.infoBox}>
            <h2>Planeta de Destino</h2>
            <p>
              Nome: {dadosMissao.planetaDestino.nome}{" "}
              {getIconeClima(dadosMissao.planetaDestino.temperatura)}
            </p>
            <p>
              Temperatura Média: {dadosMissao.planetaDestino.temperatura}°C
            </p>
            <p>Gravidade: {dadosMissao.planetaDestino.gravidade}</p>
            <p>Descrição: {dadosMissao.planetaDestino.descricao}</p>
          </div>

          <div style={styles.infoBox}>
            <h2>Previsão do Tempo Espacial</h2>
            <p>
              {getIconePrevisao(dadosMissao.previsaoEspacial.clima)} Clima:{" "}
              {dadosMissao.previsaoEspacial.clima}
            </p>
            <p>Nível de Radiação: {dadosMissao.previsaoEspacial.radiacaoCosmica}</p>
          </div>

          <div style={styles.infoBox}>
            <h2>Relatório de Bordo</h2>
            <ol>
              {dadosMissao.relatorioBordo.map((evento, index) => (
                <li key={index}>{evento}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;