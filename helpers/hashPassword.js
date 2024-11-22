const bcrypt = require("bcrypt");

module.exports.hashPassword = async (password) => {
  const saltRounds = 10; // Số vòng lặp, càng lớn càng an toàn
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
