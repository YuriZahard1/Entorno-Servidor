const path = require("path");
const express = require("express");
const fs = require("fs");

const router = express.Router();

// GET /admin/users
router.get("/users", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "users.html"));
});

// POST /admin/users
router.post("/users", (req, res, next) => {
  console.log(req.body);

  const username = req.body.title; // el name del input en users.html

  fs.appendFile(
    path.join(__dirname, "..", "Users.txt"),
    username + "\n",
    (err) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    },
  );
});

module.exports = router;
