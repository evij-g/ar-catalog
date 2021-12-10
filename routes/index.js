const router = require("express").Router();
const {
  getHome,
  getLogin,
  getSignup,
  getPrivate,
  login,
  signup,
  private,
  createElement,
  logout,
  deleteUser,
  getEditElement,
  editElement,
  deleteElement,
} = require("../controllers");

const fileUploader = require("../config/cloudinary.config");

const { isAnon, isLoggedIn, isAdmin } = require("../middlewares/index");

router
  .get("/", isAnon, getHome)
  .get("/login", isAnon, getLogin)
  .get("/private", isLoggedIn, getPrivate)
  .get("/signup", isAdmin, getSignup)
  .get("/edit-element:id", isAdmin, getEditElement)

  .post("/edit-element:id", isAdmin, fileUploader.single("image"), editElement)
  .post("/delete-element:id", isAdmin, deleteElement)
  .post("/login", isAnon, login)
  .post("/signup", isAdmin, signup)
  .post("/private", isLoggedIn, private)
  .post("/create", isLoggedIn, fileUploader.single("image"), createElement)
  .post("/logout", isLoggedIn, logout)
  .post("/delete-user:id", isAdmin, deleteUser);

module.exports = router;
