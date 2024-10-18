const Product = require("../../models/product.model");
const fillerStatusHelper = require("../../helpers/fillerStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const config = require("../../config/system");

// [GET] admin/products
module.exports.index = async (req, res) => {
  // Filler
  let fillerStatus = fillerStatusHelper(req.query);

  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  // End filler

  // Search
  let objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  // End search

  // Pagination
  const totalProducts = await Product.countDocuments(find);
  let pagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    totalProducts
  );
  // End pagination

  // Sort
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  // End Sort

  const products = await Product.find(find)
    .sort(sort)
    .limit(pagination.limitItems)
    .skip(pagination.skip);

  res.render("admin/pages/product/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    fillerStatus: fillerStatus,
    keyword: objectSearch.keyword,
    pagination: pagination,
  });
};

// [PATCH] admin/products/change-status/:status:/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });
  req.flash("success", "Cập nhật trạng thái thành công!");
  res.redirect("back");
};

// [PATCH] admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const idsList = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: idsList } }, { status: "active" });
      req.flash(
        "success",
        `Cập nhật trạng thái thành công ${idsList.length} sản phẩm`
      );
      break;
    case "inactive":
      await Product.updateMany(
        { _id: { $in: idsList } },
        { status: "inactive" }
      );
      req.flash(
        "success",
        `Cập nhật trạng thái thành công ${idsList.length} sản phẩm`
      );
      break;
    case "deleted-all":
      await Product.updateMany(
        { _id: { $in: idsList } },
        { deleted: "true", deleteAt: new Date() }
      );
      req.flash("success", `Xóa thành công ${idsList.length} sản phẩm`);
      break;
    case "change-position":
      for (let item of idsList) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      break;
    default:
      break;
  }
  res.redirect("back");
};

// [DELETE] admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { deleted: true, deleteAt: new Date() });
  req.flash("success", `Xóa thành công sản phẩm!`);

  res.redirect("back");
};

// [GET] admin/products/create
module.exports.create = (req, res) => {
  res.render("admin/pages/product/create", {
    pageTitle: "Thêm mới sản phẩm",
  });
};

// [POST] admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position == "") {
    const countProduct = await Product.countDocuments();
    req.body.position = countProduct + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  console.log(req.body);

  const newProduct = new Product(req.body);
  await newProduct.save();
  req.flash("success", "Tạo mới sản phẩm thành công.");
  res.redirect(`${config.prefixAdmin}/products`);
};

// [GET] admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const find = {
      _id: id,
      deleted: false,
    };
    const product = await Product.findOne(find);

    res.render("admin/pages/product/edit", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect(`${config.prefixAdmin}/products`);
  }
};

// [Patch] admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  try {
    await Product.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    req.flash("success", "Cập nhật sản phẩm thành công.");
  } catch (error) {
    req.flash("error", "Cập nhật sản phẩm thất bại.");
  }
  res.redirect(`${config.prefixAdmin}/products`);
};

// [GET] admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const find = {
      deleted: false,
      _id: id,
    };
    const product = await Product.findOne(find);
    res.render("admin/pages/product/detail", {
      pagetitle: "Chi tiết sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect(`${config.prefixAdmin}/products`);
  }
};
