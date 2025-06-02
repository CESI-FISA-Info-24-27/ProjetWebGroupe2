import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
dotenv.config();

const PORT = process.env.PORT || 5000;

import userRoutes from './routes/user.route.js';


const app = express();
app.use(cors( { origin: "*", credentials: true } ));
app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});