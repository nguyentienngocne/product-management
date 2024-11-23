const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const config = require("../../config/system");
const hashedPassword = require("../../helpers/hashPassword");

module.exports.index = async (req, res) => {
  const records = await Account.find({
    deleted: false,
  }).select("-password -token");

  for (const item of records) {
    const role = await Role.findOne({
      deleted: false,
      _id: item.role_id,
    });
    item.role = role;
  }
  res.render("admin/pages/account/index", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  });
};

module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  let roles = await Role.find(find);
  res.render("admin/pages/account/create", {
    pageTitle: "Tạo mới tài khoản",
    roles: roles,
  });
};

module.exports.createPost = async (req, res) => {
  const emailExist = await Account.findOne({
    deleted: false,
    email: req.body.email,
  });
  if (emailExist) {
    req.flash("error", `Email ${req.body.email} đã tồn tại`);
    res.redirect("back");
  } else {
    req.body.password = await hashedPassword.hashPassword(req.body.password);
    const record = new Account(req.body);
    await record.save();
    req.flash("success", "Tạo tài khoản thành công");
    res.redirect(`${config.prefixAdmin}/accounts`);
  }
};

module.exports.edit = async (req, res) => {
  let find = {
    deleted: false,
    _id: req.params.id,
  };

  try {
    const record = await Account.findOne(find);
    const roles = await Role.find({
      deleted: false,
    });
    res.render("admin/pages/account/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      record: record,
      roles: roles,
    });
  } catch (error) {
    res.redirect(`${config.prefixAdmin}/accounts`);
  }
};

module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  const emailExist = await Account.findOne({
    _id: { $ne: id },
    email: req.body.email,
    deleted: false,
  });
  if (emailExist) {
    req.flash("error", `Email ${req.body.email} đã tồn tại`);
  } else {
    if (req.body.password) {
      req.body.password = await hashedPassword.hashPassword(req.body.password);
    } else {
      delete req.body.password;
    }

    await Account.updateOne({ _id: id }, req.body);

    req.flash("success", "Cập nhật thành công!");
  }
  res.redirect("back");
};
