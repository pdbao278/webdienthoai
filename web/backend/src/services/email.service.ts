export async function sendEmail(to: string, subject: string, htmlContent: string) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'no-reply@phonestore.com';
  const senderName = process.env.BREVO_SENDER_NAME || 'PhoneStore';

  if (!apiKey) {
    console.warn('⚠️ BREVO_API_KEY is not set. Email will not be sent actually.');
    console.log(`[EMAIL] To: ${to} | Subject: ${subject}`);
    console.log(`[EMAIL CONTENT]:\n${htmlContent}`);
    return;
  }

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to }],
      subject: subject,
      htmlContent: htmlContent
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Failed to send email:', errorData);
    throw new Error('Email sending failed');
  }
  
  return await response.json();
}
