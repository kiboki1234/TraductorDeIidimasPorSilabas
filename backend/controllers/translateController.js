// Controlador para manejar la lógica del idioma "pa-pe-pi-po-pu"
const translateToPaPe = (text) => {
    return text
      .split("")
      .map((char, index, array) => {
        // Detecta dígrafos como "ue" y los procesa correctamente
        if (
          char.toLowerCase() === "u" &&
          array[index - 1]?.toLowerCase() === "q" // Maneja "qu"
        ) {
          return char; // No aplica la regla para "u" después de "q"
        }
  
        if ("aeiouAEIOU".includes(char)) {
          return char + "p" + char.toLowerCase();
        }
  
        return char;
      })
      .join("");
  };
  
  
  const handleTranslation = (req, res) => {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "El texto es requerido" });
    }
    const translatedText = translateToPaPe(text);
    res.json({ translatedText });
  };

  // Lógica inversa para traducir del "pa-pe-pi-po-pu" al texto original
const translateFromPaPe = (text) => {
    return text.replace(/([aeiouAEIOU])p\1/gi, "$1");
  };
  
  const handleReverseTranslation = (req, res) => {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "El texto es requerido" });
    }
    const originalText = translateFromPaPe(text);
    res.json({ originalText });
  };
  
  module.exports = { handleTranslation, handleReverseTranslation };
  