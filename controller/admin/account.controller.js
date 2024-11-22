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
