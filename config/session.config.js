const session = require("express-session");
const { NODE_ENV } = process.env;

const isProduction = NODE_ENV === "production";

module.exports = (app) => {
  // required for the app when deployed to Heroku (in production)
  app.set("trust proxy", 1);

  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: isProduction === "production" ? "none" : "lax",
        secure: isProduction,
        httpOnly: true,
        maxAge: 60000,
      },
    })
  );
};
