const session = require("express-session");
const MongoDBStore = require("connect-mongo")(session);
const secret = process.env.SECRET || "thisshouldbeabettersecret!";
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/yelp-camp";

const store = MongoDBStore.create({
  mongoUrl: dbUrl,
  secret: secret,
  touchAfter: 24 * 3600,
});

store.on("error", function (e) {
  console.log("Session Store Error", e);
});

module.exports.sessionConfig = {
  store,
  name: "session",
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
