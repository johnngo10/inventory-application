const Category = require("../models/Category");
const Item = require("../models/Item");

// Display Item create form on GET
exports.item_create_get = function (req, res) {
  const { id } = req.params;
  const previousURL = req.headers.referer;
  res.render("item_form", { id: id, previousURL: previousURL });
};

// Handle Item create on POST
exports.item_create_post = async function (req, res) {
  const { id } = req.params;
  const { name, description, category, price, number_in_stock } = req.body;
  const categorySchema = await Category.findById(id);

  if (!name || !description) {
    res.send("missing required fields");
  } else {
    const item = new Item({
      name,
      description,
      price,
      number_in_stock,
    });
    categorySchema.items.push(item);
    item.category = categorySchema;
    await categorySchema.save();
    await item.save().then((result) => {
      res.redirect(`/category/${id}`);
    });
  }
};
