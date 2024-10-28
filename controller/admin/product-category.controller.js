// [GET] admin/products-category

const ProductCategory = require("../../models/product-category.model");
const config = require("../../config//system");
const createTreeHelper = require("../../helpers/createTree");

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

  const records = await ProductCategory.find(find).sort({ position: "desc" });
  const newRecords = createTreeHelper.tree(records);
  res.render("admin/pages/product-category/index", {
    pageTitle: "Danh mục sản phẩm",
    records: newRecords,
  });
};

module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);

  const newRecords = createTreeHelper.tree(records);

  res.render("admin/pages/product-category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
    records: newRecords,
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

module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await ProductCategory.updateOne({ _id: id }, { status: status });
  res.redirect("back");
};

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  await ProductCategory.updateOne({ _id: id }, { deleted: true });
  res.redirect("back");
};

module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const find = {
    _id: id,
    deleted: false,
  };
  const record = await ProductCategory.findOne(find);
  const records = await ProductCategory.find({ deleted: false });
  res.render("admin/pages/product-category/edit", {
    record: record,
    records: records,
  });
};

module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.position = parseInt(req.body.position);
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  console.log(req.body);
  await ProductCategory.updateOne({ _id: id }, req.body);
  res.redirect(`${config.prefixAdmin}/products-category`);
};

module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const record = await ProductCategory.findOne({ _id: id });

  console.log(record);
  res.render("admin/pages/product-category/detail", {
    record: record,
  });
};
