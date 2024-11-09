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

// [GET] admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      _id: id,
      deleted: false,
    };
    const record = await Role.findOne(find);

    res.render("admin/pages/role/edit", {
      record: record,
    });
  } catch (error) {
    res.redirect(`${config.prefixAdmin}/roles`);
  }
};

// [PATCH] admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  await Role.updateOne({ _id: id }, req.body);

  res.redirect(`${config.prefixAdmin}/roles`);
};

// [GET] admin/roles/permissions
module.exports.permission = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);

  res.render("admin/pages/role/permission", {
    pageTitle: "Phân quyền",
    records: records,
  });
};

// [PATCH] admin/roles/permissions
module.exports.permissionPatch = async (req, res) => {
  const permissions = JSON.parse(req.body.permissions);
  for (const item of permissions) {
    await Role.updateOne({ _id: item.id }, { permissions: item.permissions });
  }
  req.flash("success", "Cập nhật thành công");
  res.redirect("back");
};
