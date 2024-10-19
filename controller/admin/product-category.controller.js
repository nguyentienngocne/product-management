// [GET] admin/products-category

const ProductCategory = require("../../models/product-category.model");
const config = require("../../config//system");

module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  // Filler status
  if (req.query.status) {
    find.status = req.query.status;
  }

  // Search
  if (req.query.keyword) {
    let regex = new RegExp(req.query.keyword, "i");
    find.title = regex;
  }

  const records = await ProductCategory.find(find);
  res.render("admin/pages/product-category/index", {
    pageTitle: "Danh mục sản phẩm",
    records: records,
  });
};

module.exports.create = (req, res) => {
  res.render("admin/pages/product-category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
  });
};

module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const countProduct = await ProductCategory.countDocuments();
    req.body.position = countProduct + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const record = new ProductCategory(req.body);
  await record.save();

  res.redirect(`${config.prefixAdmin}/products-category`);
};
