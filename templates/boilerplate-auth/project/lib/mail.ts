import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.PUBLIC_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'onboardin@resend.dev',
    to: email,
    subject: 'Please confirm your email',
    text: `Please confirm your email by clicking here: ${confirmLink}`,
    html: `<p>Please confirm your email by clicking here: <a href="${confirmLink}">${confirmLink}</a></p>`
  });
};
