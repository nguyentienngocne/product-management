const Account = require("../../models/account.model");
const config = require("../../config/system");
const bcrypt = require("bcrypt");

module.exports.login = (req, res) => {
  res.render("admin/pages/auth/login", {
    pageTitle: "Trang đăng nhập",
  });
};

module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const user = await Account.findOne({ email: email, deleted: false });
  if (!user) {
    req.flash("error", "Email không chính xác");
    res.redirect("back");
    return;
  }
  const password = req.body.password;
  const hashPassword = user.password;
  bcrypt.compare(password, hashPassword, (err, result) => {
    if (err) {
      req.flash("error", err);
      return;
    } else if (result === true) {
      if (user.status !== "inactive") {
        res.cookie("token", user.token);
        res.redirect(`${config.prefixAdmin}/dashboard`);
      } else {
        req.flash("error", "Tài khoản đã bị xóa");
        res.redirect("back");
        return;
      }
    } else {
      req.flash("error", "Mật khẩu sai");
      res.redirect("back");
      return;
    }
  });
};
