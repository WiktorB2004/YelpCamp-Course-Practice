const MongoDBStore = require("connect-mongo");
const dbUrl = "mongodb://localhost:27017/yelp-camp";
// const dbUrl = process.env.DB_URL;

const store = MongoDBStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 3600,
});

store.on("error", function (e) {
  console.log("Session Store Error", e);
});

module.exports.sessionConfig = {
  store,
  name: "session",
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
