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
  deleteElement,
  editImage,
  getARSingleElement
} = require("../controllers");

const fileUploader = require("../config/cloudinary.config");

const { isAnon, isLoggedIn, isAdmin } = require("../middlewares/index");

router
  .get("/", isAnon, getHome)
  .get("/login", isAnon, getLogin)
  .get("/catalog", isLoggedIn, getCatalogElements)
  .get("/userlist", isAdmin, getAllUsers)
  .get("/signup", isAdmin, getSignup)
  .get("/edit-element:id", isLoggedIn, getEditElement)
  .get("/upload", isLoggedIn, getCreateForm)
  .get("/single-element:id", isAnon, getSingleElement)
  .get("/ar-view:id", isAnon, getARSingleElement)

  

  .post("/edit-element:id", isAdmin, editElement)
  .post("/edit-image:id", isAdmin, fileUploader.single('imageUrl'), editImage)
  .post("/delete-element:id", isAdmin, deleteElement)
  .post("/login", isAnon, login)
  .post("/signup", isAdmin, signup)
  .post("/userlist", isAdmin, getAllUsers)
  //.post("/private", isLoggedIn, getCatalogElements)
  .post("/catalog", isAnon, getCatalogElements)
  .post("/create", isAdmin, fileUploader.single("imageUrl"), createElement)
  .post("/logout", isLoggedIn, logout)
  .post("/delete-user:id", isAdmin, deleteUser)
  .post("/single-element:id", isAnon, getSingleElement)

module.exports = router;
