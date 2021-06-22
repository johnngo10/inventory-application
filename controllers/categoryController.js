const Category = require("../models/Category");
const Item = require("../models/Item");

// Display a list of all categories
exports.category_list = function (req, res) {
  Category.find(function (err, data) {
    if (err) {
      res.status(404).json({ message: err.message });
    } else {
      res.status(200).render("index", { categories: data });
    }
  });
};

// Display detail page for a specific category
exports.category_detail = function (req, res) {
  const categoryName = req.params.name;
  let items;

  Item.find({ category: categoryName }, function (err, data) {
    if (err) {
      res.status(404).json({ message: err.message });
    } else {
      items = data;
      res.render("category", { categoryName: categoryName, items: items });
    }
  });
};

// Display Category create form on GET
exports.category_create_get = function (req, res) {
  res.render("category_form");
};

// Handle Category create on POST
exports.category_create_post = function (req, res) {
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
};
