const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store for OTPs
const otps = new Map();

let transporter;

// Initialize Nodemailer with Gmail SMTP
function initMailer() {
  try {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log('Gmail SMTP initialized');
  } catch (err) {
    console.error('Failed to create Gmail transporter', err);
  }
}

initMailer();

app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otps.set(email, otp);

  try {
    const info = await transporter.sendMail({
      from: `\"Naval Soap Factory\" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Login Verification Code by Naval Soap Factory ',
      text: `Your OTP for login is: ${otp}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5; padding: 40px 20px;">
          <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e4e4e7; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            
            <h2 style="color: #111827; margin-top: 0; text-align: center;">Login Verification</h2>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Your One-Time Password (OTP) for accessing your account is:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <h1 style="color: #0f766e; letter-spacing: 8px; font-size: 36px; margin: 0; background-color: #f0fdfa; padding: 15px 20px; border-radius: 6px; display: inline-block;">
                ${otp}
              </h1>
            </div>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
              Please enter this code to securely log in. <strong>This code will expire in 10 minutes.</strong>
            </p>
            
            <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 30px 0;">
            
            <p style="color: #6b7280; font-size: 12px; line-height: 1.5; text-align: center;">
              If you did not request this code, please safely ignore this email. <strong>Never share this OTP with anyone.</strong>
            </p>
            
          </div>
        </div>
      `,
    });

    console.log(`OTP sent to ${email}: ${otp}`);

    res.json({ success: true, message: 'OTP sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP email' });
  }
});

app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP required' });
  }

  const storedOtp = otps.get(email);
  if (storedOtp && storedOtp === otp) {
    otps.delete(email); // OTP used successfully
    res.json({ success: true, message: 'OTP verified' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Email OTP Backend running on port ${PORT}`);
});
