import express from 'express';
import authRoutes from './routes/authRoutes';
import protectedRoutes from './routes/protectedRoutes';

const app = express();
app.use(express.json());
// Cấu hình rate limiter

// Routes
app.use('/auth', authRoutes);
app.use('/', protectedRoutes);

// Khởi động server
app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});
