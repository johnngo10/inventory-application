const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

router.get("/", function (req, res) {
  Category.find(function (err, data) {
    if (err) {
      res.status(404).json({ message: err.message });
    } else {
      res.status(200).render("index", { categories: data });
    }
  });
});

router.get("/category/:name", function (req, res) {
  const categoryName = req.params.name;
  res.render("category", { categoryName: categoryName });
});

router.get("/new-category", function (req, res) {
  res.render("category_form");
});

router.post("/new-category", function (req, res) {
  const { name, description } = req.body;

  if (!name || !description) {
    res.send("missing required fields");
  } else {
    const category = new Category({
      name,
      description,
    });

    category.save().then((result) => {
      res.redirect("/");
    });
  }
});

router.get("/new-item", function (req, res) {
  res.render("item_form");
});

module.exports = router;
