const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store for OTPs
const otps = new Map();

let transporter;

// Initialize Nodemailer with Ethereal Email
async function initMailer() {
  try {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log('Ethereal Email initialized');
  } catch (err) {
    console.error('Failed to create Ethereal account', err);
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
      from: '"Naval Soap Factory" <noreply@navalsoap.com>',
      to: email,
      subject: 'Your Login Verification Code',
      text: `Your OTP for login is: ${otp}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Login Verification</h2>
          <p>Your One-Time Password (OTP) for accessing your account is:</p>
          <h1 style="color: #0f766e; letter-spacing: 5px;">${otp}</h1>
          <p>Please enter this code to securely log in. It will expire soon.</p>
        </div>
      `,
    });

    const url = nodemailer.getTestMessageUrl(info);
    console.log(`OTP sent to ${email}: ${otp}`);
    console.log('Preview URL: %s', url);

    res.json({ success: true, message: 'OTP sent', url });
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
