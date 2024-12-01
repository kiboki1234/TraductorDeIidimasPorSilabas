const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const translateRoutes = require("./routes/translateRoutes");

const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api", translateRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
