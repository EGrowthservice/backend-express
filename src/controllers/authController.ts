// controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../utils/supabase';
import validator from 'validator';
import { sendEmail } from '../utils/sendEmail';
import { verifyEmailContent, resetPasswordContent } from '../utils/emailTemplates';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Tạo token xác thực email và reset password
const createToken = (payload: object, expiresIn = '15m') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// Đăng ký
export const register = async (req: Request, res: Response) => {
  const { email, password, name, role = 'user' } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Thiếu thông tin' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Email không hợp lệ' });
  }

  const { data: existingUser } = await supabase.from('users').select('*').eq('email', email).single();
  if (existingUser) {
    return res.status(400).json({ message: 'Người dùng đã tồn tại' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const { error } = await supabase.from('users').insert([
    { email, password: hashedPassword, name, role, is_verified: false }
  ]);

  if (error) return res.status(500).json({ message: 'Lỗi tạo người dùng', error });

  // Gửi email xác thực
  const verifyToken = createToken({ email }, '30m');
  const link = `http://localhost:3000/api/auth/verify-email?token=${verifyToken}`;

  const emailContent = verifyEmailContent(link);
  await sendEmail(email, 'Xác Thực Tài Khoản', emailContent);
  res.status(201).json({ message: 'Đăng ký thành công, kiểm tra email để xác thực!' });
};

// Xác thực email
export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;
  if (!token || typeof token !== 'string') {
    return res.status(400).json({ message: 'Thiếu token xác thực' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    const { email } = decoded;

    const { error } = await supabase
      .from('users')
      .update({ is_verified: true })
      .eq('email', email);

    if (error) return res.status(500).json({ message: 'Xác thực thất bại', error });

    res.status(200).json({ message: 'Xác thực thành công! Bạn có thể đăng nhập.' });
  } catch (err) {
    res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Thiếu thông tin' });
  }

  const { data: user } = await supabase.from('users').select('*').eq('email', email).single();

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Thông tin đăng nhập không đúng' });
  }

  if (!user.is_verified) {
    return res.status(403).json({ message: 'Vui lòng xác thực email trước' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  res.status(200).json({ token });
};

// Quên mật khẩu
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Nhập email' });
  }

  const { data: user } = await supabase.from('users').select('*').eq('email', email).single();
  if (!user) {
    return res.status(400).json({ message: 'Email không tồn tại' });
  }

  const resetToken = createToken({ email }, '15m');
  const link = `http://localhost:3000/reset-password?token=${resetToken}`;

  const emailContent = resetPasswordContent(link);
  await sendEmail(email, 'Đặt lại mật khẩu', emailContent);

  res.status(200).json({ message: 'Đã gửi link đặt lại mật khẩu qua email' });
};

// Đặt lại mật khẩu
export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.query;
  const { newPassword } = req.body;

  if (!token || typeof token !== 'string' || !newPassword) {
    return res.status(400).json({ message: 'Thiếu dữ liệu' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    const { email } = decoded;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const { error } = await supabase
      .from('users')
      .update({ password: hashedPassword })
      .eq('email', email);

    if (error) return res.status(500).json({ message: 'Lỗi đặt lại mật khẩu', error });

    res.status(200).json({ message: 'Đặt lại mật khẩu thành công!' });
  } catch (err) {
    res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};
export const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user?.id; 

  // Kiểm tra các trường nhập vào
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Cả mật khẩu cũ và mật khẩu mới đều là bắt buộc' });
  }

  // Lấy thông tin người dùng từ Supabase
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !user) {
    return res.status(400).json({ message: 'Người dùng không tồn tại' });
  }

  // Kiểm tra mật khẩu cũ
  const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isOldPasswordValid) {
    return res.status(400).json({ message: 'Mật khẩu cũ không chính xác' });
  }

  // Mã hóa mật khẩu mới
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // Cập nhật mật khẩu mới trong cơ sở dữ liệu
  const { error: updateError } = await supabase
    .from('users')
    .update({ password: hashedNewPassword })
    .eq('id', userId);

  if (updateError) {
    return res.status(500).json({ message: 'Lỗi khi thay đổi mật khẩu', error: updateError });
  }

  res.status(200).json({ message: 'Mật khẩu đã được thay đổi thành công' });
};
export const logout = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Đăng xuất thành công' });
};