import nodemailer from 'nodemailer';

// SMTP Configuration
const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // Use SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
};

// Verify SMTP configuration
if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
  console.error('SMTP credentials are missing. Email functionality will not work.');
}

const transporter = nodemailer.createTransport(smtpConfig);

// Verify SMTP connection on startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to send emails');
  }
});

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface EbookDownloadData {
  fullName: string;
  email: string;
  company: string;
  ebookTitle: string;
  ebookUrl: string;
}

export async function sendContactFormNotification(data: ContactFormData) {
  console.log('Preparing to send email notification with data:', {
    name: data.name,
    email: data.email,
    subject: data.subject,
    messageLength: data.message.length
  });

  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
  const fromName = process.env.SMTP_FROM_NAME || 'Pivotal B2B';
  const replyTo = process.env.SMTP_REPLY_TO || 'zahid.m@pivotal-b2b.com';

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: 'zahid.m@pivotal-b2b.com',
    replyTo: data.email,
    subject: `New Contact Form Submission: ${data.subject}`,
    text: `
New contact form submission received:

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}
    `,
    html: `
      <h2>New contact form submission received</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${data.message}</p>
    `
  };

  try {
    console.log('Attempting to send email via SMTP...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendEbookDownloadConfirmation(data: EbookDownloadData) {
  console.log('Preparing to send eBook download confirmation email:', {
    fullName: data.fullName,
    email: data.email,
    company: data.company,
    ebookTitle: data.ebookTitle
  });

  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
  const fromName = process.env.SMTP_FROM_NAME || 'Pivotal B2B';
  const replyTo = process.env.SMTP_REPLY_TO || 'zahid.m@pivotal-b2b.com';

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: data.email,
    replyTo: replyTo,
    subject: `Your eBook is Ready: ${data.ebookTitle}`,
    text: `
Hi ${data.fullName},

Thank you for downloading "${data.ebookTitle}" from Pivotal B2B!

Your eBook is now ready for you to access. Click the link below to view and read it:

${data.ebookUrl}

We hope you find valuable insights in this resource. If you have any questions or would like to discuss how we can help ${data.company} achieve its marketing goals, don't hesitate to reach out.

Best regards,
The Pivotal B2B Team

---
Pivotal B2B
Precision-Driven B2B Marketing Solutions
Website: https://pivotal-b2b.com
Email: ${replyTo}
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e3a8a 0%, #4f46e5 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
    .button { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
    .highlight { background: #eff6ff; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 28px;">Your eBook is Ready! 📚</h1>
    </div>
    
    <div class="content">
      <p>Hi ${data.fullName},</p>
      
      <p>Thank you for downloading <strong>"${data.ebookTitle}"</strong> from Pivotal B2B!</p>
      
      <div class="highlight">
        <p style="margin: 0;"><strong>✓ Your eBook download has been confirmed</strong></p>
        <p style="margin: 10px 0 0 0;">Access it anytime using the link below.</p>
      </div>
      
      <div style="text-align: center;">
        <a href="${data.ebookUrl}" class="button" style="color: white;">Access Your eBook Now →</a>
      </div>
      
      <p>We hope you find valuable insights in this resource. If you have any questions or would like to discuss how we can help <strong>${data.company}</strong> achieve its marketing goals, don't hesitate to reach out.</p>
      
      <p style="margin-top: 30px;">Best regards,<br><strong>The Pivotal B2B Team</strong></p>
    </div>
    
    <div class="footer">
      <p style="margin: 0;"><strong>Pivotal B2B</strong></p>
      <p style="margin: 5px 0;">Precision-Driven B2B Marketing Solutions</p>
      <p style="margin: 10px 0 0 0;">
        <a href="https://pivotal-b2b.com" style="color: #2563eb; text-decoration: none;">Website</a> | 
        <a href="mailto:${replyTo}" style="color: #2563eb; text-decoration: none;">Contact Us</a>
      </p>
    </div>
  </div>
</body>
</html>
    `
  };

  try {
    console.log('Attempting to send eBook download confirmation via SMTP...');
    const info = await transporter.sendMail(mailOptions);
    console.log('eBook download confirmation email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending eBook download confirmation email:', error);
    throw error;
  }
}
