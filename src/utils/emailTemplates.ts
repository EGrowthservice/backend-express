// utils/emailTemplates.ts

export const verifyEmailContent = (link: string) => {
    return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              font-size: 24px;
              color: #4CAF50;
              text-align: center;
            }
            p {
              font-size: 16px;
              line-height: 1.5;
            }
            .button {
              display: inline-block;
              background-color: #4CAF50;
              color: white;
              padding: 12px 20px;
              text-align: center;
              text-decoration: none;
              border-radius: 4px;
              font-weight: bold;
              margin-top: 20px;
            }
            .footer {
              font-size: 14px;
              color: #888;
              text-align: center;
              margin-top: 40px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Xác Thực Tài Khoản</h1>
            <p>Chào bạn!</p>
            <p>Cảm ơn bạn đã đăng ký tài khoản tại chúng tôi. Để hoàn tất việc đăng ký, vui lòng xác thực tài khoản của bạn bằng cách nhấp vào nút dưới đây:</p>
            <a href="${link}" class="button">Xác Thực Tài Khoản</a>
            <p>Chúng tôi sẽ không bao giờ yêu cầu bạn cung cấp mật khẩu qua email.</p>
            <div class="footer">
              <p>Trân trọng,</p>
              <p>Đội ngũ hỗ trợ khách hàng</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };
  
  export const resetPasswordContent = (link: string) => {
    return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              font-size: 24px;
              color: #4CAF50;
              text-align: center;
            }
            p {
              font-size: 16px;
              line-height: 1.5;
            }
            .button {
              display: inline-block;
              background-color: #4CAF50;
              color: white;
              padding: 12px 20px;
              text-align: center;
              text-decoration: none;
              border-radius: 4px;
              font-weight: bold;
              margin-top: 20px;
            }
            .footer {
              font-size: 14px;
              color: #888;
              text-align: center;
              margin-top: 40px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Đặt Lại Mật Khẩu</h1>
            <p>Chào bạn!</p>
            <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.</p>
            <p>Để đặt lại mật khẩu, vui lòng nhấp vào nút dưới đây:</p>
            <a href="${link}" class="button">Đặt Lại Mật Khẩu</a>
            <div class="footer">
              <p>Trân trọng,</p>
              <p>Đội ngũ hỗ trợ khách hàng</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };
  
  export const changePasswordNotificationContent = () => {
    return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              font-size: 24px;
              color: #4CAF50;
              text-align: center;
            }
            p {
              font-size: 16px;
              line-height: 1.5;
            }
            .footer {
              font-size: 14px;
              color: #888;
              text-align: center;
              margin-top: 40px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Thông Báo Thay Đổi Mật Khẩu</h1>
            <p>Chào bạn,</p>
            <p>Chúng tôi muốn thông báo rằng mật khẩu tài khoản của bạn đã được thay đổi. Nếu bạn không thực hiện thay đổi này, vui lòng liên hệ với chúng tôi ngay lập tức.</p>
            <div class="footer">
              <p>Trân trọng,</p>
              <p>Đội ngũ hỗ trợ khách hàng</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };
  