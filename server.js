import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

//import userRoutes from './routes/user.routes.js';
import authRouter from './src/routes/auth.routes.js';
import connectToDB from './src/config/db.js';
import { errorHandler } from './src/middleware/errorHandler.js';
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.use(errorHandler);

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  await connectToDB();
});
 
export default app;