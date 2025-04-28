import { Router, Request, Response, NextFunction } from 'express';
import { register, login, verifyEmail, forgotPassword, resetPassword, changePassword, logout } from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';
import rateLimit from 'express-rate-limit';
import { HttpError } from '../utils/httpError';
import logger from '../utils/logger';
import { query, validationResult } from 'express-validator';
const validateRequest = [
    query('token')
      .notEmpty()
      .withMessage('Thiếu token xác thực')
      .isString()
      .withMessage('Token phải là chuỗi'),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new HttpError(400, 'Dữ liệu đầu vào không hợp lệ', errors.array()); 
      }
      next();
    },
  ];
// Giới hạn số lần yêu cầu cho đăng nhập
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 5, // T  Tối đa 5 yêu cầu
  message: 'Quá nhiều lần thử đăng nhập. Vui lòng thử lại sau.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Giới hạn số lần yêu cầu cho đăng ký
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 10, // Tối đa 10 yêu cầu
  message: 'Quá nhiều lần thử đăng ký. Vui lòng thử lại sau.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Giới hạn số lần yêu cầu cho quên mật khẩu
const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 giờ
  max: 3, // Tối đa 3 yêu cầu
  message: 'Quá nhiều yêu cầu quên mật khẩu. Vui lòng thử lại sau.',
  standardHeaders: true,
  legacyHeaders: false,
});

const router = Router();

// Middleware xử lý lỗi tập trung
router.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  logger.error(error);
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      success: false,
      error: error.message,
      details: error.details
    });
  } else {
    res.status(500).json({
      success: false,
      error: 'Lỗi máy chủ nội bộ'
    });
  }
});

router.post('/register', registerLimiter, register);
router.post('/login', loginLimiter, login);
router.post('/logout', logout);
router.get('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPasswordLimiter, forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password', authenticate, changePassword);

export default router;