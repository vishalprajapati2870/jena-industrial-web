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

function createInvoicePDF(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      let buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      const pageWidth = doc.page.width;       // 595
      const margin = 50;
      const contentWidth = pageWidth - margin * 2; // 495

      // ─────────────────────────────────────────
      // 1. INVOICE TITLE – centred at top
      // ─────────────────────────────────────────
      doc.fontSize(22).fillColor('#111827').font('Helvetica-Bold')
         .text('INVOICE', margin, 50, { align: 'center', width: contentWidth });

      // ─────────────────────────────────────────
      // 2. Invoice meta row  (No | Date | Status)
      // ─────────────────────────────────────────
      const metaY = 82;
      const metaBoxX = margin + 40;
      const metaBoxW = contentWidth - 80;
      const metaBoxH = 28;

      // Light border box
      doc.roundedRect(metaBoxX, metaY, metaBoxW, metaBoxH, 4)
         .strokeColor('#e5e7eb').lineWidth(1).stroke();

      doc.fontSize(9).fillColor('#374151').font('Helvetica-Bold');

      // Invoice No
      doc.text('Invoice No:', metaBoxX + 10, metaY + 9, { continued: true });
      doc.fillColor('#111827').font('Helvetica').text(`  ${order.id || 'INV-XXXXXX'}`);

      // Date (centered)
      doc.fillColor('#374151').font('Helvetica-Bold')
         .text('Date:', metaBoxX + 178, metaY + 9, { continued: true });
      doc.fillColor('#111827').font('Helvetica').text(`  ${order.date || ''}`);

      // Status badge (teal pill on right)
      const statusLabel = (order.status || 'CONFIRMED').toUpperCase();
      const statusBoxX = metaBoxX + metaBoxW - 82;
      const statusBoxY = metaY + 6;
      doc.roundedRect(statusBoxX, statusBoxY, 72, 16, 8)
         .fillColor('#4b5563').fill();
      doc.fontSize(7).fillColor('#ffffff').font('Helvetica-Bold')
         .text(statusLabel, statusBoxX, statusBoxY + 5, { width: 72, align: 'center' });

      // ──────────────────────────────────────────────
      // 3. FROM / BILLED TO – two columns side by side
      // ──────────────────────────────────────────────
      const sectionY = metaY + metaBoxH + 24;
      const colW = contentWidth / 2;

      // FROM
      doc.fontSize(7.5).fillColor('#6b7280').font('Helvetica-Bold')
         .text('FROM', margin, sectionY, { width: colW });

      // BILLED TO
      doc.fontSize(7.5).fillColor('#6b7280').font('Helvetica-Bold')
         .text('BILLED TO', margin + colW, sectionY, { width: colW, align: 'right' });

      let fromY = sectionY + 14;

      // FROM details (left column)
      doc.fontSize(13).fillColor('#111827').font('Helvetica-Bold')
         .text('Naval Soap Factory', margin, fromY, { width: colW });
      fromY += 18;
      doc.fontSize(9).fillColor('#111827').font('Helvetica-Bold')
         .text('Silver Detergent Private Limited', margin, fromY, { width: colW });
      fromY += 13;
      doc.fontSize(8.5).fillColor('#4b5563').font('Helvetica')
         .text('6/D/1, Anand Industrial Estate, Borsad Road,', margin, fromY, { width: colW });
      fromY += 12;
      doc.text('ANAND - 388 001. (Guj.)', margin, fromY, { width: colW });
      fromY += 12;
      doc.text('Ph: +91 98258 21075, +91 98258 05478', margin, fromY, { width: colW });
      fromY += 12;
      doc.fillColor('#4b5563').text('navalsoap@yahoo.com', margin, fromY, { width: colW });
      fromY += 18;

      // GSTIN badge
      doc.roundedRect(margin, fromY, 130, 18, 4)
         .strokeColor('#d1d5db').lineWidth(1).stroke();
      doc.fillColor('#374151').fontSize(8).font('Helvetica-Bold')
         .text('GSTIN: 24XXXXX1234X1Z5', margin + 6, fromY + 5, { width: 118 });

      // BILLED TO details (right column) – aligned to right edge
      const rightX = margin + colW;
      let billY = sectionY + 14;

      // Customer shop name
      const shopName = order.shopName || order.customerName || 'Customer Shop Name';
      doc.fontSize(12).fillColor('#374151').font('Helvetica-Bold')
         .text(shopName, rightX, billY, { width: colW, align: 'right' });
      billY += 18;

      // Customer name (CAPS)
      doc.fontSize(8).fillColor('#111827').font('Helvetica-Bold')
         .text((order.customerName || '').toUpperCase(), rightX, billY, { width: colW, align: 'right' });
      billY += 13;

      // Address
      if (order.companyAddress) {
        doc.fontSize(8.5).fillColor('#4b5563').font('Helvetica')
           .text(order.companyAddress, rightX, billY, { width: colW, align: 'right' });
        billY += order.companyAddress.split('\n').length * 12 + 2;
      }

      // Phone
      if (order.customerPhone) {
        doc.fontSize(8.5).fillColor('#4b5563').font('Helvetica')
           .text(`Ph: ${order.customerPhone}`, rightX, billY, { width: colW, align: 'right' });
        billY += 13;
      }

      // Email
      if (order.customerEmail) {
        doc.fontSize(8.5).fillColor('#4b5563').font('Helvetica')
           .text(order.customerEmail, rightX, billY, { width: colW, align: 'right' });
      }

      // ──────────────────────────────────────────
      // 4. ITEMS TABLE
      // ──────────────────────────────────────────
      const tableY = Math.max(fromY + 36, billY + 24);
      doc.y = tableY;
      doc.x = margin;

      const tableData = {
        headers: [
          { label: 'ITEM DESCRIPTION', property: 'desc', width: 260 },
          { label: 'QTY',              property: 'qty',  width: 50, align: 'center' },
          { label: 'UNIT RATE',        property: 'rate', width: 90, align: 'right'  },
          { label: 'AMOUNT',           property: 'amt',  width: 90, align: 'right'  },
        ],
        rows: [],
      };

      const unitPrice = (item) => item.amount / item.quantity;

      if (order.items && order.items.length > 0) {
        order.items.forEach(item => {
          tableData.rows.push([
            `${item.product}\n${item.category || ''}`,
            item.quantity.toString(),
            `Rs. ${unitPrice(item).toFixed(2)}`,
            `Rs. ${item.amount.toFixed(2)}`,
          ]);
        });
      } else {
        const qty = order.quantity || 1;
        const amt = order.amount || 0;
        tableData.rows.push([
          `${order.product || ''}\n${order.category || ''}`,
          qty.toString(),
          `Rs. ${(amt / qty).toFixed(2)}`,
          `Rs. ${amt.toFixed(2)}`,
        ]);
      }

      const tableTopY = doc.y;

      // Draw light grey background for header (approximate height: 28px)
      doc.roundedRect(margin, tableTopY, contentWidth, 28, 6)
         .fillColor('#f8fafc').fill();
      // Draw a solid rect over the bottom corners to make them square
      doc.rect(margin, tableTopY + 14, contentWidth, 14)
         .fillColor('#f8fafc').fill();

      // Reset y and x for the table text
      doc.y = tableTopY;
      doc.x = margin;

      await doc.table(tableData, {
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#6b7280'),
        prepareRow: () => doc.font('Helvetica').fontSize(9.5).fillColor('#111827'),
        padding: 10,
        divider: {
          header: { disabled: false, width: 1, opacity: 1, color: '#e2e8f0' },
          horizontal: { disabled: false, width: 1, opacity: 1, color: '#e2e8f0' }
        }
      });
      
      const tableBottomY = doc.y;

      // Draw rounded border around the table tightly (without extra empty padding)
      doc.roundedRect(margin - 1, tableTopY - 1, contentWidth + 2, tableBottomY - tableTopY + 2, 6)
         .strokeColor('#e2e8f0').lineWidth(1).stroke();
      
      // Update doc.y to after the table border
      doc.y = tableBottomY + 20;

      // ──────────────────────────────────────────
      // 5. TOTALS – separate card UI
      // ──────────────────────────────────────────
      const totalAmount = order.totalAmount || order.amount || 0;
      const totalsBoxW = 280;
      const totalsBoxX = pageWidth - margin - totalsBoxW;
      
      let totalsRows = [];
      if (order.subtotal !== undefined) {
        totalsRows.push({ label: 'Subtotal', value: `Rs. ${order.subtotal.toFixed(2)}`, color: '#6b7280' });
        totalsRows.push({ label: 'CGST (9%)', value: `Rs. ${(order.gstAmount / 2).toFixed(2)}`, color: '#6b7280' });
        totalsRows.push({ label: 'SGST (9%)', value: `Rs. ${(order.gstAmount / 2).toFixed(2)}`, color: '#6b7280' });
      } else {
        totalsRows.push({ label: 'Subtotal', value: `Rs. ${totalAmount.toFixed(2)}`, color: '#6b7280' });
      }

      const boxPadding = 20;
      const rowHeight = 22;
      const dividerSpace = 15;
      const grandTotalHeight = 30;
      
      const boxHeight = (totalsRows.length * rowHeight) + dividerSpace + grandTotalHeight + boxPadding * 2 - 10;
      
      let totalsY = doc.y + 30;

      // Draw totals card background and border
      doc.roundedRect(totalsBoxX, totalsY, totalsBoxW, boxHeight, 8)
         .fillColor('#f8fafc').fillAndStroke('#f8fafc', '#e2e8f0')
         .strokeColor('#e2e8f0').lineWidth(1).stroke();

      totalsY += boxPadding;

      const drawTotalsRow = (label, value, color) => {
        doc.fontSize(10.5)
           .fillColor(color).font('Helvetica')
           .text(label, totalsBoxX + boxPadding, totalsY, { width: 140 });
        doc.fontSize(10.5)
           .fillColor('#111827').font('Helvetica')
           .text(value, totalsBoxX + 140, totalsY, { width: totalsBoxW - 140 - boxPadding, align: 'right' });
        totalsY += rowHeight;
      };

      totalsRows.forEach(row => drawTotalsRow(row.label, row.value, row.color));

      // Dashed divider line
      totalsY += 2;
      doc.moveTo(totalsBoxX + boxPadding, totalsY)
         .lineTo(totalsBoxX + totalsBoxW - boxPadding, totalsY)
         .dash(3, { space: 4 }).strokeColor('#cbd5e1').lineWidth(1).stroke();
      doc.undash();
      totalsY += 15;

      // Grand Total row
      doc.fontSize(16).fillColor('#111827').font('Helvetica-Bold')
         .text('Grand Total', totalsBoxX + boxPadding, totalsY + 2, { width: 140 });
      doc.fontSize(16).fillColor('#0ea5e9').font('Helvetica-Bold')
         .text(`Rs. ${totalAmount.toFixed(2)}`, totalsBoxX + 140, totalsY, { width: totalsBoxW - 140 - boxPadding, align: 'right' });


      // ──────────────────────────────────────────
      // 6. TERMS & CONDITIONS
      // ──────────────────────────────────────────
      const tcY = totalsY + 50;
      doc.fontSize(9).fillColor('#111827').font('Helvetica-Bold')
         .text('TERMS & CONDITIONS', margin, tcY);

      const tcItems = [
        'All goods sold are non-returnable.',
        'Subject to ANAND jurisdiction.',
        'This is a computer-generated invoice and does not require a physical signature.',
      ];
      let tcLineY = tcY + 14;
      tcItems.forEach(item => {
        doc.fontSize(8).fillColor('#4b5563').font('Helvetica')
           .text(`\u2022  ${item}`, margin + 4, tcLineY, { width: contentWidth - 4 });
        tcLineY += 13;
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

// REST route to send invoice to customer email
app.post('/send-invoice', async (req, res) => {
  const { order } = req.body;
  
  if (!order || !order.customerEmail) {
    return res.status(400).json({ success: false, message: 'Invalid order data or missing customer email.' });
  }

  try {
    const pdfData = await createInvoicePDF(order);

    // Send email
    await transporter.sendMail({
      from: `"Naval Soap Factory" <${process.env.EMAIL_USER}>`,
      to: order.customerEmail,
      subject: `Invoice for Order #${order.id} - Naval Soap Factory`,
      text: `Dear ${order.customerName},\n\nYour order has been confirmed. Please find your invoice attached.\n\nThank you,\nNaval Soap Factory`,
      html: `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f5f7f7;font-family:Arial, Helvetica, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;background:#f5f7f7;">
  <tr>
    <td align="center">

      <!-- Email Container -->
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e5e5;">

        <!-- Header -->
        <tr>
          <td style="background:#0f766e;color:#ffffff;padding:20px;text-align:center;font-size:22px;font-weight:bold;">
            Naval Soap Factory
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:30px;color:#333333;font-size:15px;line-height:1.6;">

            <p style="margin:0 0 15px 0;">Dear <strong>${order.customerName}</strong>,</p>

            <p style="margin:0 0 15px 0;">
              Your order has been confirmed.
            </p>

            <p style="margin:0 0 20px 0;">
              Please find your invoice attached with this email.
            </p>

            <p style="margin:25px 0 0 0;">Thank you,</p>
            <p style="margin:5px 0 0 0;font-weight:bold;color:#0f766e;">Naval Soap Factory</p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f0fdfa;text-align:center;padding:15px;font-size:12px;color:#555;">
            © ${new Date().getFullYear()} Naval Soap Factory. All rights reserved.
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>`,
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

  } catch (err) {
    console.error('Invoice Delivery/Generation Error:', err);
    res.status(500).json({ success: false, message: 'Failed to process invoice.' });
  }
});

app.post('/download-invoice', async (req, res) => {
  const { order } = req.body;
  if (!order) {
    return res.status(400).json({ success: false, message: 'Invalid order data.' });
  }

  try {
    const pdfData = await createInvoicePDF(order);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Invoice_${order.id}.pdf`);
    res.send(pdfData);

  } catch (err) {
    console.error('PDF Generation Error:', err);
    res.status(500).json({ success: false, message: 'Failed to generate invoice PDF.' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Email OTP Backend running on port ${PORT}`);
});
