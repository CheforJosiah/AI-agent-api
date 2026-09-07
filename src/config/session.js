import session from "express-session";
import MongoStore from "connect-mongo";

const sessionConfig = session({
  store: process.env.MONGODB_URI
    ? MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
    : undefined,
  secret: process.env.SESSION_SECRET || "your_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24
  }
});

export default sessionConfig;
