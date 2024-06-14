'use server';

import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';

import { RegisterSchema } from '@/schemas';
import { RegisterFormValues } from '@/components/auth/register-form';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (values: RegisterFormValues) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already in use!' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      hashPassword: hashedPassword
    }
  });

  const verificationToken = await generateVerificationToken(email);

  if (verificationToken) {
    await sendVerificationEmail(verificationToken?.email, verificationToken?.token);
  }

  return {
    success: 'Check your email and verify your account!'
  };
};
