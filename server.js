import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import connectToDB from './src/config/db.js';

const PORT = process.env.PORT || 5000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});