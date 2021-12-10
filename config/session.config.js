const session = require("express-session");
const MongoStore = require("connect-mongo");
const { NODE_ENV, MONGODB_URL, SESS_SECRET } = process.env;

const isProduction = NODE_ENV === "production";

function sessionInit(app) {
  // required for the app when deployed to Heroku (in production)
  app.set("trust proxy", 1);

  app.use(
    session({
      secret: SESS_SECRET,
      resave: true,
      useCredentials: true,
      saveUninitialized: false,
      cookie: {
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      },
      store: MongoStore.create({
        mongoUrl: MONGODB_URL,
        ttl: 60 * 60 * 24,
      }),
    })
  );
}

module.exports = { sessionInit };
