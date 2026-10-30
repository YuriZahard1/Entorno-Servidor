const fs = require("fs");
const path = require("path");
const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  const usersFile = path.join(__dirname, "..", "Users.txt");
  const indexFile = path.join(__dirname, "..", "views", "index.html");

  fs.readFile(indexFile, "utf8", (err, html) => {
    if (err) return next(err);

    fs.readFile(usersFile, "utf8", (err, data) => {
      let items = "<li>No hay usuarios guardados</li>";

      if (!err && data.trim()) {
        items = data
          .trim()
          .split("\n")
          .map((user) => `<li>${user}</li>`)
          .join("");
      }

      res.send(html.replace("<!--USERS-->", items));
    });
  });
});

module.exports = router;
