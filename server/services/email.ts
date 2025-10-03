import nodemailer from 'nodemailer';

// SMTP Configuration
const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // Use STARTTLS instead of SSL
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
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

interface ProposalRequestData {
  fullName: string;
  email: string;
  company: string;
  phone?: string;
  selectedServices: string[];
  targetAccounts?: string;
  message?: string;
}

interface LeadNotificationData {
  fullName: string;
  email: string;
  company: string;
  phone?: string;
  contentType: string;
  contentTitle: string;
  source: string;
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
    .button { display: inline-block; padding: 14px 28px; background: #2563eb; background-image: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
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
        <a href="${data.ebookUrl}" class="button" style="color: #ffffff !important; text-decoration: none;">Access Your eBook Now →</a>
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

export async function sendLeadNotificationToAdmin(data: LeadNotificationData) {
  console.log('Preparing to send lead notification to admin:', data);

  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
  const fromName = process.env.SMTP_FROM_NAME || 'Pivotal B2B';
  const adminEmail = 'zahid.m@pivotal-b2b.com';

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: adminEmail,
    replyTo: data.email,
    subject: `New ${data.contentType.toUpperCase()} Download: ${data.contentTitle}`,
    text: `
New lead captured from ${data.source}:

Name: ${data.fullName}
Email: ${data.email}
Company: ${data.company}
${data.phone ? `Phone: ${data.phone}` : ''}

Content Type: ${data.contentType}
Content: ${data.contentTitle}
Source: ${data.source}

Time: ${new Date().toLocaleString()}
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 25px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
    .info-row { display: flex; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
    .info-label { font-weight: bold; min-width: 120px; color: #6b7280; }
    .info-value { color: #111827; }
    .footer { background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">🎯 New Lead Captured!</h1>
    </div>
    
    <div class="content">
      <h2 style="color: #059669; margin-top: 0;">Lead Information</h2>
      
      <div class="info-row">
        <div class="info-label">Name:</div>
        <div class="info-value">${data.fullName}</div>
      </div>
      
      <div class="info-row">
        <div class="info-label">Email:</div>
        <div class="info-value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      
      <div class="info-row">
        <div class="info-label">Company:</div>
        <div class="info-value">${data.company}</div>
      </div>
      
      ${data.phone ? `
      <div class="info-row">
        <div class="info-label">Phone:</div>
        <div class="info-value">${data.phone}</div>
      </div>
      ` : ''}
      
      <div class="info-row">
        <div class="info-label">Content Type:</div>
        <div class="info-value">${data.contentType}</div>
      </div>
      
      <div class="info-row">
        <div class="info-label">Content:</div>
        <div class="info-value">${data.contentTitle}</div>
      </div>
      
      <div class="info-row">
        <div class="info-label">Source:</div>
        <div class="info-value">${data.source}</div>
      </div>
      
      <div class="info-row" style="border-bottom: none;">
        <div class="info-label">Time:</div>
        <div class="info-value">${new Date().toLocaleString()}</div>
      </div>
    </div>
    
    <div class="footer">
      <p style="margin: 0;">Pivotal B2B Lead Notification System</p>
    </div>
  </div>
</body>
</html>
    `
  };

  try {
    console.log('Attempting to send lead notification to admin via SMTP...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Lead notification email sent successfully to admin:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending lead notification to admin:', error);
    throw error;
  }
}

export async function sendProposalRequestNotification(data: ProposalRequestData) {
  console.log('Preparing to send proposal request notification:', data);

  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
  const fromName = process.env.SMTP_FROM_NAME || 'Pivotal B2B';
  const adminEmail = 'zahid.m@pivotal-b2b.com';

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: adminEmail,
    replyTo: data.email,
    subject: `New Proposal Request from ${data.company}`,
    text: `
New proposal request received:

Name: ${data.fullName}
Email: ${data.email}
Company: ${data.company}
${data.phone ? `Phone: ${data.phone}` : ''}

Selected Services: ${data.selectedServices.join(', ')}

${data.targetAccounts ? `Target Accounts File: ${data.targetAccounts}` : ''}

${data.message ? `Message:\n${data.message}` : ''}

Time: ${new Date().toLocaleString()}
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #dc2626 0%, #f59e0b 100%); color: white; padding: 25px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
    .info-row { display: flex; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
    .info-label { font-weight: bold; min-width: 120px; color: #6b7280; }
    .info-value { color: #111827; }
    .services { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; }
    .message { background: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0; white-space: pre-wrap; }
    .footer { background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">📋 New Proposal Request!</h1>
    </div>
    
    <div class="content">
      <h2 style="color: #dc2626; margin-top: 0;">Contact Information</h2>
      
      <div class="info-row">
        <div class="info-label">Name:</div>
        <div class="info-value">${data.fullName}</div>
      </div>
      
      <div class="info-row">
        <div class="info-label">Email:</div>
        <div class="info-value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      
      <div class="info-row">
        <div class="info-label">Company:</div>
        <div class="info-value">${data.company}</div>
      </div>
      
      ${data.phone ? `
      <div class="info-row" style="border-bottom: none;">
        <div class="info-label">Phone:</div>
        <div class="info-value">${data.phone}</div>
      </div>
      ` : ''}
      
      <div class="services">
        <h3 style="margin-top: 0; color: #92400e;">Requested Services:</h3>
        <ul style="margin: 10px 0;">
          ${data.selectedServices.map(service => `<li>${service}</li>`).join('')}
        </ul>
      </div>
      
      ${data.targetAccounts ? `
      <div style="margin: 20px 0;">
        <strong>Target Accounts File:</strong> ${data.targetAccounts}
      </div>
      ` : ''}
      
      ${data.message ? `
      <div>
        <strong>Additional Message:</strong>
        <div class="message">${data.message}</div>
      </div>
      ` : ''}
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
        <strong>Received:</strong> ${new Date().toLocaleString()}
      </div>
    </div>
    
    <div class="footer">
      <p style="margin: 0;">Pivotal B2B Proposal Request Notification</p>
    </div>
  </div>
</body>
</html>
    `
  };

  try {
    console.log('Attempting to send proposal request notification via SMTP...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Proposal request notification email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending proposal request notification:', error);
    throw error;
  }
}
