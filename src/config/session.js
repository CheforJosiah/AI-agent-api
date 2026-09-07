import session, { Cookie } from "express-session";
import MongoStore from "connect-mongo";

const sessionConfig = {
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  secret: process.env.SESSION_SECRET || "your_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24
  }
};

export default sessionConfig;
