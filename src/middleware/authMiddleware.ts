import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
interface AuthenticatedRequest extends Request {
    user?: {
      id: string;
      email: string;
      role: string;
    };
  }
const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
  
      if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
  
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
      (req as any).user = decoded; // Gán user vào req để các route sau có thể dùng
      next(); // Thành công thì chỉ gọi next()
    } catch (err) {
      res.status(401).json({ message: 'Invalid Token' });
    }
  };

  const hasRole = (roles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
      if (!req.user || !roles.includes(req.user.role)) {
        res.status(403).json({ message: 'Access denied' });
        return;
      }
      next();
    };
  };
  export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Không có token xác thực' });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
      req.user = { id: decoded.id, email: decoded.email, role: decoded.role };  
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
  };
export { verifyToken, hasRole };
