const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    slug: { type: "string", slug: "title", unique: true },
    deleted: {
      type: Boolean,
      default: false,
    },
    deleteAt: Date,
  },
  { timestamps: true }
);

productSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    this.slug = await slugify(this.title, { lower: true });
  }
  next();
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
