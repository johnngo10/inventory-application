const Category = require("../models/Category");
const Item = require("../models/Item");

// Display Item create form on GET
exports.item_create_get = function (req, res) {
  const categoryName = req.params.name;
  Category.find(function (err, data) {
    if (err) {
      res.status(404).json({ message: err.message });
    } else {
      res
        .status(200)
        .render("item_form", { categories: data, categoryName: categoryName });
    }
  });
};

// Handle Item create on POST
exports.item_create_post = function (req, res) {
  const { name, description, category, price, number_in_stock } = req.body;
  if (!name || !description) {
    res.send("missing required fields");
  } else {
    const item = new Item({
      name,
      description,
      category,
      price,
      number_in_stock,
    });

    item.save().then((result) => {
      res.redirect(`/category/${category}`);
    });
  }
};
