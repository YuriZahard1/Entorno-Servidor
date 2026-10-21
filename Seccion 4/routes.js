import express from "express";
import fs from "fs";

const router = express.Router();

// Ruta Principal
router.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`
    <html>
      <head><title>Assignment 1</title></head>
      <body>
        <p>Enter Username</p>
        <form action="/create-user" method="POST">
          <input type="text" name="username">
          <button type="submit">Send</button>
        </form>
        <br><a href="/users">Users</a>
      </body>
    </html>
  `);
});

// Mostrar Usuarios
router.get("/users", (req, res) => {
  fs.readFile("users.txt", "utf-8", (err, data) => {
    let userListHtml = "<li>No hay usuarios guardados</li>";
    if (!err && data.trim()) {
      const usersArray = data.trim().split("\n");
      userListHtml = usersArray.map((user) => `<li>${user}</li>`).join("");
    }
    res.setHeader("Content-Type", "text/html");
    res.send(`
      <html>
        <head><title>Users</title></head>
        <body><ul>${userListHtml}</ul><br><a href="/">Formulario</a></body>
      </html>
    `);
  });
});

// Guardar Usuario
router.post("/create-user", (req, res) => {
  const username = req.body.username;
  if (username) {
    fs.appendFile("users.txt", username + "\n", () => {
      res.redirect(302, "/");
    });
  } else {
    res.redirect(302, "/");
  }
});

export default router;
