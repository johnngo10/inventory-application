const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Items",
    },
  ],
});

categorySchema.pre("findOneAndDelete", async function (data) {});
categorySchema.post("findOneAndDelete", async function (category) {
  if (category.products.length) {
    Category.deleteMany({});
  }
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
