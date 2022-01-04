const router = require("express").Router();


const {
  getHome,
  getLogin,
  getSignup,
  getAllUsers,
  getCatalogElements,
  getSingleElement,
  login,
  signup,
  getCreateForm,
  createElement,
  logout,
  deleteUser,
  getEditElement,
  editElement,
  editImage,
  deleteElement,
  getARSingleElement
} = require("../controllers");

const fileUploader = require("../config/cloudinary.config");

const { isAnon, isLoggedIn, isAdmin } = require("../middlewares/index");

router
  .get("/", isAnon, getCatalogElements)
  .get("/login", isAnon, getLogin)
  .get("/catalog", isLoggedIn, getCatalogElements)
  .get("/userlist", isAdmin, getAllUsers)
  .get("/signup", isAdmin, getSignup)
  .get("/edit-element:id", isAdmin, getEditElement)
  .get("/upload", isLoggedIn, getCreateForm)
  .get("/single-element:id", getSingleElement)
  .get("/ar-view:id", getARSingleElement)

  

  .post("/edit-element:id", isAdmin, fileUploader.single("imageUrl"), editElement)
  .post("/edit-image:id", isAdmin, fileUploader.single("imageUrl"), editImage)
  .post("/delete-element:id", isAdmin, deleteElement)
  .post("/login", isAnon, login)
  .post("/signup", isAdmin, signup)
  .post("/userlist", isAdmin, getAllUsers)
  .post("/catalog", isLoggedIn, getCatalogElements)
  .post("/create", isLoggedIn, fileUploader.single("imageUrl"), createElement)
  .post("/logout", isLoggedIn, logout)
  .post("/delete-user:id", isAdmin, deleteUser)
  .post("/single-element:id", isAdmin, getSingleElement)

module.exports = router;
