const bcrypt = require("bcryptjs");
const authenDB = require("../../database/model/authenticateDB");

exports.register = async (username, password, fullname, phone, address) => {
  if (await authenDB.usernameExists(username)) {
    throw new Error("Username already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const id = authenDB.addUser(
    username,
    hashedPassword,
    fullname,
    phone,
    address
  );
  return id;
};

exports.checkUserCredentials = async (username, password) => {
  const user = await authenDB.getUserByUsername(username);
  if (!user) return null;
  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;
  return user;
};