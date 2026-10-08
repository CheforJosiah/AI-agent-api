import express from "express";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import bookRouter from "./routes/book.routes.js";
import careerRouter from "./routes/career.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import sessionConfig from "./config/session.js";

const app = express();

app.use(express.json());

// session middleware registered BEFORE authentication routes
app.use(sessionConfig);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/profiles', userRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/careers', careerRouter);

app.use(errorHandler);

export default app;