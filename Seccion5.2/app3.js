const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-product", (req, res, next) => {
  res.send(
    `<form action="/product" 
    method="POST"><input type="text" 
    name="title"><button type="submit">Add Product
    </button></form>`,
  );
  //sustituir res.send('<h1>Añadir producto</h1>')
  // no llamo a next para que no se ejecute lo de abajo
});
//añadir funcion producto
app.post("/product", (req, res, next) => {
  console.log(req.body); // pedir el body
  res.redirect("/"); //usamos para redirigir a home después de añadir producto
});
app.use("/", (req, res, next) => {
  res.send("<h1>Hello from Express</h1>");
});
const server = http.createServer(app);
server.listen(3000);
