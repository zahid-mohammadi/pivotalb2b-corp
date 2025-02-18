import * as Brevo from '@getbrevo/brevo';

if (!process.env.BREVO_API_KEY) {
  throw new Error('BREVO_API_KEY environment variable is required for sending emails');
}

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactFormNotification(data: ContactFormData) {
  const sendSmtpEmail = new Brevo.SendSmtpEmail();

  sendSmtpEmail.to = [{ email: 'zahid.m@pivotal-b2b.com', name: 'Zahid M' }];
  sendSmtpEmail.sender = { email: 'notifications@pivotal-b2b.com', name: 'Pivotal B2B Notifications' };
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
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}