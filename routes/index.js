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
} = require("../controllers");
const fileUploader = require("../config/cloudinary.config");

router
  .get("/", getHome)
  .get("/login", getLogin)
  .get("/private", getPrivate)
 .get("/signup", getSignup)
  .post("/login", login)
 .post('/signup', signup)
  .post("/private", private)
  .post("/create", fileUploader.single("image"), createElement);

module.exports = router;
