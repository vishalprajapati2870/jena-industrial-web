const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit-table');
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

app.post('/send-invoice', async (req, res) => {
  const { order } = req.body;
  
  if (!order || !order.customerEmail) {
    return res.status(400).json({ success: false, message: 'Invalid order data or missing customer email.' });
  }

  try {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', async () => {
      let pdfData = Buffer.concat(buffers);
      
      // Send email
      try {
        await transporter.sendMail({
          from: `"Naval Soap Factory" <${process.env.EMAIL_USER}>`,
          to: order.customerEmail,
          subject: `Invoice for Order #${order.id} - Naval Soap Factory`,
          text: `Dear ${order.customerName},\n\nYour order #${order.id} has been confirmed. Please find your invoice attached.\n\nThank you,\nNaval Soap Factory`,
          attachments: [
            {
              filename: `Invoice_${order.id}.pdf`,
              content: pdfData,
              contentType: 'application/pdf'
            }
          ]
        });
        
        console.log(`Invoice email sent to ${order.customerEmail} for order ${order.id}`);
        res.json({ success: true, message: 'Invoice email sent successfully.' });
      } catch (emailError) {
        console.error('Error sending invoice email:', emailError);
        res.status(500).json({ success: false, message: 'Failed to send invoice email.' });
      }
    });

    // Generate PDF Content
    doc.fontSize(20).fillColor('#0f766e').font('Helvetica-Bold').text('Naval Soap Factory', { align: 'left' });
    doc.fontSize(10).fillColor('#4b5563').font('Helvetica-Bold').text('Silver Detergent Private Limited');
    doc.font('Helvetica').text('6/D/1, Anand Industrial Estate, Borsad Road,');
    doc.text('ANAND - 388 001. (Guj.)');
    doc.text('Ph: +91 98258 21075, +91 98258 05478');
    doc.text('GSTIN: 24XXXXX1234X1Z5');
    doc.moveDown();

    doc.fontSize(16).fillColor('#111827').font('Helvetica-Bold').text('INVOICE', { align: 'right' });
    doc.fontSize(10).fillColor('#4b5563').font('Helvetica').text(`Invoice No: ${order.id}`, { align: 'right' });
    doc.text(`Date: ${order.date}`, { align: 'right' });
    doc.text(`Status: ${order.status}`, { align: 'right' });
    doc.moveDown();

    doc.fontSize(12).fillColor('#111827').font('Helvetica-Bold').text('Billed To:');
    doc.fontSize(10).fillColor('#4b5563').font('Helvetica').text(order.customerName);
    if (order.companyAddress) doc.text(order.companyAddress);
    doc.text(order.customerEmail);
    doc.moveDown();

    // Table
    const tableData = {
      headers: [
        { label: "Item Description", property: 'desc', width: 220 },
        { label: "HSN/SAC", property: 'hsn', width: 60, align: 'center' },
        { label: "Qty", property: 'qty', width: 50, align: 'center' },
        { label: "Unit Rate", property: 'rate', width: 80, align: 'right' },
        { label: "Amount", property: 'amount', width: 80, align: 'right' }
      ],
      rows: []
    };

    if (order.items && order.items.length > 0) {
      order.items.forEach(item => {
        tableData.rows.push([
          `${item.product}\n${item.category}`,
          '3401',
          item.quantity.toString(),
          `Rs. ${(item.amount / item.quantity).toFixed(2)}`,
          `Rs. ${item.amount.toFixed(2)}`
        ]);
      });
    } else {
      tableData.rows.push([
        `${order.product}\n${order.category}`,
        '3401',
        (order.quantity || 1).toString(),
        `Rs. ${((order.amount || 0) / (order.quantity || 1)).toFixed(2)}`,
        `Rs. ${(order.amount || 0).toFixed(2)}`
      ]);
    }

    await doc.table(tableData, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
      prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => doc.font("Helvetica").fontSize(10)
    });

    const totalAmount = order.totalAmount || order.amount || 0;

    let totalsY = doc.y + 20;
    doc.fontSize(10).font('Helvetica-Bold');
    
    // Add totals aligned to the right
    const labelX = 350;
    const valueX = 450;
    
    if (order.subtotal !== undefined) {
      doc.text('Subtotal:', labelX, totalsY);
      doc.text(`Rs. ${order.subtotal.toFixed(2)}`, valueX, totalsY, { align: 'right', width: 90 });
      totalsY += 15;
      
      doc.text('CGST (9%):', labelX, totalsY);
      doc.text(`Rs. ${(order.gstAmount / 2).toFixed(2)}`, valueX, totalsY, { align: 'right', width: 90 });
      totalsY += 15;
      
      doc.text('SGST (9%):', labelX, totalsY);
      doc.text(`Rs. ${(order.gstAmount / 2).toFixed(2)}`, valueX, totalsY, { align: 'right', width: 90 });
      totalsY += 15;
    } else {
      doc.text('Subtotal (Incl. Tax):', labelX, totalsY);
      doc.text(`Rs. ${totalAmount.toFixed(2)}`, valueX, totalsY, { align: 'right', width: 90 });
      totalsY += 15;
    }

    totalsY += 10;
    doc.fontSize(12).fillColor('#0f766e');
    doc.text('Grand Total:', labelX, totalsY);
    doc.text(`Rs. ${totalAmount.toFixed(2)}`, valueX, totalsY, { align: 'right', width: 90 });

    doc.moveDown(4);
    doc.fontSize(10).fillColor('#111827').font('Helvetica-Bold').text('Terms & Conditions', 50);
    doc.fontSize(8).fillColor('#4b5563').font('Helvetica').text('All goods sold are non-returnable. Subject to ANAND jurisdiction. This is a computer generated invoice.', 50);

    doc.end();

  } catch (err) {
    console.error('PDF Generation Error:', err);
    res.status(500).json({ success: false, message: 'Failed to generate invoice PDF.' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Email OTP Backend running on port ${PORT}`);
});
