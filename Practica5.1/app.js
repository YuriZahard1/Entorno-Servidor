const express = require("express");
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  console.log("Primer middleware: Procesando petición...");
  next();
});

app.use((req, res, next) => {
  console.log("Segundo middleware: Generando respuesta...");
  next();
});

app.get("/users", (req, res) => {
  res.send(
    "<h1>Lista de Usuarios</h1><ul><li>Usuario 1</li><li>Usuario 2</li></ul>",
  );
});

app.get("/", (req, res) => {
  res.send("<h1>Página Principal</h1>");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:3000`);
});
