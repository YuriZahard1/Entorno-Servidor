const path = require("path");
const express = require("express");

const app = express();

// 1. Configurar Pug como motor de plantillas
app.set("view engine", "ejs");
app.set("views", "views");

// Importar rutas
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// 2. Middlewares base
app.use(express.urlencoded({ extended: false })); // O bodyParser.urlencoded({ extended: false })
app.use(express.static(path.join(__dirname, "public")));

// 3. Registro de rutas
app.use("/admin", adminData.routes);
app.use(shopRoutes);

// 4. Middleware 404 (Renderizando vista dinámica en vez del .html estático)
app.use((req, res, next) => {
  res
    .status(404)
    .render("404", { pageTitle: "Página no encontrada", path: "/404" });
});

app.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
});
