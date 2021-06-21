const Item = require("../models/Item");

// Display Item create form on GET
exports.item_create_get = function (req, res) {
  res.render("item_form");
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
      res.redirect("/");
    });
  }
};
