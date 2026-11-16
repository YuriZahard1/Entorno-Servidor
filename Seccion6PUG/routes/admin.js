const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const products = [
  {
    title: "El Quijote",
    price: "19.99",
  },
  {
    title: "El Principito",
    price: "19.99",
  },
];

router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Añadir Producto",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
});

// POST /admin/add-product
router.post("/add-product", (req, res, next) => {
  const { title, price, category, description } = req.body;

  const defaultTitle =
    title && title.trim() !== "" ? title : "Libro sin título";

  const parsedPrice = price ? Number(price).toFixed(2) : "0.00";

  products.push({
    id: Date.now().toString(),
    title: defaultTitle,
    price: parsedPrice,
    category,
    description,
  });

  res.redirect("/");
});

exports.routes = router;
exports.products = products;
