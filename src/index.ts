import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import protectedRoutes from './routes/protectedRoutes';
import productRoutes from './routes/productRoutes';
import newsRoutes from './routes/newsRoutes';
import affiliateRoutes from './routes/affiliateRoutes';
import fileRoutes from './routes/fileRoutes';
import consultationRoutes from './routes/consultationRoutes';
import projectRoutes from './routes/projectRoutes';
import paymentRoutes from './routes/paymentRoutes';
import donationRoutes from './routes/donationRoutes';
// Middleware
import { verifyToken, hasRole } from './middleware/authMiddleware';
// Model
import './models/news';
import './models/affiliate';
import './models/consultation';
import './models/project';
import './models/payment';
import './models/donation';

const app = express();
app.use(express.json());
dotenv.config();

// Kết nối đến MongoDB
connectDB();
// Routes
app.use('/api/auth', authRoutes);
app.use('/', protectedRoutes);

app.use('/api/admin/products', verifyToken, hasRole(['admin']), productRoutes);
app.use('/api/admin/news', verifyToken, hasRole(['admin']), newsRoutes);

app.use('/api/products', verifyToken,  productRoutes);
app.use('/api/news', verifyToken, newsRoutes);
app.use('/api/affiliates', affiliateRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/donations', donationRoutes);


// Khởi động server
app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});
