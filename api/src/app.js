import express from 'express'
import dotenv from 'dotenv';
import remedioRoutes from './routes/remedioRoutes.js';

const app = express();

dotenv.config();

app.use(express.json());

app.use('/remedios', remedioRoutes);

export default app;