const Element = require("../models/element.model");
const User = require("../models/user.model");
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')


async function getHome(req, res) {
  try {
    const { ...allElements } = await Element.find();
    res.render("index", { allElements });
  } catch (error) {
    console.error(error);
  }
}

function getLogin(req, res) {
  res.render("login");
}

function getSignup(req, res) {
  res.render("signup");
}

async function getPrivate(req, res) {
  try {
    const { ...allElements } = await Element.find();
    res.render("private", { allElements });
  } catch (error) {
    console.error(error);
  }
}

async function signup(req, res, next) {
  try {
    const { email, password } = req.body;
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
    
      res.status(500).render("signup", {
        errorMessage:
          "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
      });
      return;
    }
const saltRounds = 10;
const salt = await bcrypt.genSalt(saltRounds)

const hashedPassword = await bcrypt.hash(password, salt);
await User.create({
    email, passwordHash: hashedPassword
})
res.redirect('/')
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(500).render("signup", { errorMessage: error.message });
    } else if (error.code === 11000) {
      res.status(500).render("signup", {
        errorMessage:
          "Username and email need to be unique. Either username or email is already used.",
      })
    } else {
      console.error(error)
      res.redirect('/signup')
    }
  }
}
async function login(req, res) {
  try {
      const { email, password } = req.body;
    if (email === '' || password === '') {
        res.render('login', {
          errorMessage: 'Please enter both, email and password to login.'
        });
        return;
      }
      const user = await User.findOne({ email })
        if (!user) {
          res.render('login', { errorMessage: 'Email is not registered. Try with other email.' });
          return;
        } else if (bcrypt.compareSync(password, user.passwordHash)) {
          res.redirect('private');
        } else {
          res.render('login', { errorMessage: 'Incorrect password.' });
        }
      }
   

   catch (error) {
    console.error(`An error occured while trying to login: ${error}`);
  }
}

async function private(req, res) {
  try {
  } catch (error) {
    console.error(
      `An error occured while getting all elements from DB: ${error}`
    );
  }
}

async function createElement(req, res) {
  try {
    const { title, width, height, material } = req.body;
    await Element.create({
      title,
      width,
      height,
      material,
      imageUrl: req.file.path,
    });
    res.redirect("/private");
  } catch (error) {
    console.error(`An error occured while adding element to DB ${error}`);
  }
}

module.exports = {
  getHome,
  getLogin,
  getSignup,
  getPrivate,
  login,
  signup,
  private,
  createElement,
};
