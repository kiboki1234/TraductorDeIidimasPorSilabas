import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [originalText, setOriginalText] = useState("");

  const API_URL = "https://traductordeiidimasporsilabas.onrender.com/api";

  const handleTranslate = async () => {
    try {
      const response = await fetch(`${API_URL}/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      if (response.ok) {
        setTranslatedText(data.translatedText);
      } else {
        alert(data.error || "Error al traducir el texto");
      }
    } catch (error) {
      alert("Error al conectar con el backend");
    }
  };

  const handleReverseTranslate = async () => {
    try {
      const response = await fetch(`${API_URL}/reverse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      if (response.ok) {
        setOriginalText(data.originalText);
      } else {
        alert(data.error || "Error al traducir el texto inversamente");
      }
    } catch (error) {
      alert("Error al conectar con el backend");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Texto copiado al portapapeles");
    });
  };

  return (
    <div className="App">
      <header>
        <h1>Traductor al idioma Pa-Pe-Pi-Po-Pu</h1>
      </header>
      <div className="translation-container">
        <div className="input-container">
          <textarea
            placeholder="Escribe aquí el texto..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="button-group">
            <button onClick={handleTranslate}>Traducir al idioma</button>
            <button onClick={handleReverseTranslate}>
              Traducir al texto original
            </button>
          </div>
        </div>
        <div className="result-container">
          <div className="result-box">
            <h2>Texto Traducido</h2>
            <p>{translatedText || "El texto traducido aparecerá aquí..."}</p>
            <button onClick={() => copyToClipboard(translatedText)}>
              Copiar
            </button>
          </div>
          <div className="result-box">
            <h2>Texto Original</h2>
            <p>{originalText || "El texto original aparecerá aquí..."}</p>
            <button onClick={() => copyToClipboard(originalText)}>Copiar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
