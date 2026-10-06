const http = require("http");
const routes = require("./Reto"); // Importa las rutas de Reto.js
const { buffer } = require("stream/consumers");

// Aquí es donde se define 'server'
const server = http.createServer(routes.handler);

server.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
});
