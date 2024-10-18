const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({ position: -1 });

  const newProducts = products.map((item) => {
    item.newPrice = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed();
    return item;
  });

  res.render("client/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products: newProducts,
  });
};

module.exports.detail = async (req, res) => {
  try {
    const slug = req.params.slug;
    const find = {
      deleted: false,
      slug: slug,
      status: "active",
    };
    const product = await Product.findOne(find);
    res.render("client/pages/products/detail", {
      product: product,
      pageTitle: "Chi tiết sản phẩm",
    });
  } catch (error) {
    res.redirect("/products");
  }
};
