const Role = require("../../models/role.model");
const config = require("../../config/system");

// [GET] admin/roles
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await Role.find(find);

  res.render("admin/pages/role/index", {
    pageTitle: "Nhóm quyền",
    records: records,
  });
};

// [GET] admin/roles/create
module.exports.create = (req, res) => {
  res.render("admin/pages/role/create", {
    pageTitle: "Tạo nhóm quyền",
  });
};

// [POST] admin/roles/create
module.exports.createPost = async (req, res) => {
  const record = new Role(req.body);
  await record.save();
  res.redirect(`${config.prefixAdmin}/roles`);
};
