import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import authRouter from './src/routes/auth.routes.js';
import connectToDB from './src/config/db.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import sessionConfig from './src/config/session.js';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Session middleware registered BEFORE authentication routes
app.use(sessionConfig);

app.use('/api/v1/auth', authRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  await connectToDB();
});
 
export default app;