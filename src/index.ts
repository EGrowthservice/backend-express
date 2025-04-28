import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import protectedRoutes from './routes/protectedRoutes';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
// Middleware
import { verifyToken, hasRole } from './middleware/authMiddleware';
// Model
import './models/productVariant'; 
import './models/productAttribute'; 
import './models/attribute'; 
import './models/reviewProduct'; 

const app = express();
app.use(express.json());
dotenv.config();

// Kết nối đến MongoDB
connectDB();
// Routes
app.use('/api/auth', authRoutes);
app.use('/', protectedRoutes);

app.use('/api/categories', verifyToken, hasRole(['admin']), categoryRoutes);
app.use('/api/products', verifyToken, hasRole(['admin']), productRoutes);


// Khởi động server
app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});
