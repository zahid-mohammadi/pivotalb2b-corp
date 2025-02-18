import * as SibApiV3Sdk from '@getbrevo/brevo';

if (!process.env.BREVO_API_KEY) {
  throw new Error('BREVO_API_KEY environment variable is required for sending emails');
}

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const apiKey = SibApiV3Sdk.ApiClient.instance.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
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
    if (error instanceof Error && 'response' in error) {
      const apiError = error as any;
      if (apiError.response?.text) {
        console.error('Brevo API error details:', apiError.response.text);
      }
    }
    throw error;
  }
}