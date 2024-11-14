import React, { useState } from "react";

const CircuitSimulator = () => {
  const [loading, setLoading] = useState(true); // Estado para monitorar o carregamento

  // Função chamada quando o iframe termina de carregar
  const handleLoad = () => {
    setLoading(false); // Quando o conteúdo é carregado, define o loading como falso
  };

  return (
    <div>
      <h2>Simulador de Circuito Elétrico</h2>

      {/* Exibe o indicador de carregamento enquanto o iframe não for carregado */}
      {loading && (
        <div
          style={{
            position: "fixed", // Faz o carregamento ocupar toda a tela
            top: 0,
            left: 0,
            width: "100vw", // Largura da tela
            height: "100vh", // Altura da tela
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Fundo semitransparente
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999, // Para garantir que o spinner apareça sobre o conteúdo
          }}
        >
          <div>
            <div className="spinner" style={{ marginBottom: "20px" }}></div>
            <p>Carregando o simulador...</p>
          </div>
        </div>
      )}

      {/* O iframe que carrega o simulador */}
      <iframe
        src="https://www.falstad.com/circuit/circuitjs.html"
        width="100%"
        height="900px"
        frameBorder="0"
        title="Simulador de Circuito Elétrico"
        onLoad={handleLoad} // Chama handleLoad quando o iframe termina de carregar
      ></iframe>

      {/* Estilos do Spinner */}
      <style>
        {`
          .spinner {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #3498db;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite;
            margin: auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default CircuitSimulator;
