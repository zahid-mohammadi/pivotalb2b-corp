import * as SibApiV3Sdk from '@getbrevo/brevo';

if (!process.env.BREVO_API_KEY) {
  throw new Error('BREVO_API_KEY environment variable is required for sending emails');
}

const apiConfiguration = new SibApiV3Sdk.Configuration({
  apiKey: process.env.BREVO_API_KEY
});

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi(apiConfiguration);

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

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.to = [{
    email: "zahid.m@pivotal-b2b.com",
    name: "Zahid M"
  }];

  sendSmtpEmail.sender = {
    name: "Pivotal B2B",
    email: "updates@industryevolve360.com"
  };

  sendSmtpEmail.subject = `New Contact Form Submission: ${data.subject}`;

  sendSmtpEmail.textContent = `
    New contact form submission received:

    Name: ${data.name}
    Email: ${data.email}
    Subject: ${data.subject}

    Message:
    ${data.message}
  `;

  sendSmtpEmail.htmlContent = `
    <h2>New contact form submission received</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap;">${data.message}</p>
  `;

  try {
    console.log('Attempting to send email via Brevo API...');
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    if (error instanceof Error) {
      const apiError = error as any;
      if (apiError.response?.text) {
        console.error('Brevo API error details:', apiError.response.text);
      }
    }
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

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.to = [{
    email: data.email,
    name: data.fullName
  }];

  sendSmtpEmail.sender = {
    name: "Pivotal B2B",
    email: "updates@industryevolve360.com"
  };

  sendSmtpEmail.subject = `Your eBook is Ready: ${data.ebookTitle}`;

  sendSmtpEmail.textContent = `
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
    Email: info@pivotal-b2b.com
  `;

  sendSmtpEmail.htmlContent = `
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
            <a href="mailto:info@pivotal-b2b.com" style="color: #2563eb; text-decoration: none;">Contact Us</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    console.log('Attempting to send eBook download confirmation via Brevo API...');
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('eBook download confirmation email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Error sending eBook download confirmation email:', error);
    if (error instanceof Error) {
      const apiError = error as any;
      if (apiError.response?.text) {
        console.error('Brevo API error details:', apiError.response.text);
      }
    }
    throw error;
  }
}