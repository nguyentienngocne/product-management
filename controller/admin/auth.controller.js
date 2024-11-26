const Account = require("../../models/account.model");
const config = require("../../config/system");
const bcrypt = require("bcrypt");

// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
  if (req.cookies.token) {
    res.redirect(`${config.prefixAdmin}/dashboard`);
  } else {
    res.render("admin/pages/auth/login", {
      pageTitle: "Trang đăng nhập",
    });
  }
};

// [Post] /admin/auth/login
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

// [GET] /admin/auth/logout
module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect(`${config.prefixAdmin}/auth/login`);
};
