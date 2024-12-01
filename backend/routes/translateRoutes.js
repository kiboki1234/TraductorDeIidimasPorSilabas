const express = require("express");
const router = express.Router();
const { handleTranslation, handleReverseTranslation } = require("../controllers/translateController");

// Ruta para traducir al idioma "pa-pe-pi-po-pu"
router.post("/translate", handleTranslation);

// Ruta para traducir del idioma "pa-pe-pi-po-pu" al original
router.post("/reverse", handleReverseTranslation);

module.exports = router;
