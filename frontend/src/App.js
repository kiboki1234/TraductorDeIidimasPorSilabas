import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [originalText, setOriginalText] = useState("");

  // Actualiza este dominio según tu URL en Render
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
      <header className="App-header">
        <h1>Traductor al idioma Pa-Pe-Pi-Po-Pu</h1>
        <div className="comment-box">
          <textarea
            rows="4"
            cols="50"
            placeholder="Escribe tu texto aquí..."
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

        <h2>Texto Traducido:</h2>
        <div className="result-box">
          <p>{translatedText}</p>
          <button onClick={() => copyToClipboard(translatedText)}>
            Copiar texto traducido
          </button>
        </div>

        <h2>Texto Original:</h2>
        <div className="result-box">
          <p>{originalText}</p>
          <button onClick={() => copyToClipboard(originalText)}>
            Copiar texto original
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
