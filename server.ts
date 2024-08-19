import express from "express";
import cors from "cors";
import routes from './routes';
import { errorHandler } from "./middleware/errorMiddleware";
import mongoose, { ConnectOptions } from "mongoose";

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI as string)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const app = express();

app.use(cors());
app.use(express.json());

// Use routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;