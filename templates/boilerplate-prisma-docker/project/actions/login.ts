'use server';

import bcrypt from 'bcryptjs';
import { generateJWT } from '@/lib/jwt';
import { setSession } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { LoginFormValues } from '@/components/auth/login-form';
import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';


export const login = async (values: LoginFormValues) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.hashPassword) {
    return { error: 'Email does not exist' };
  }

  

  try {
    const passwordMatch = await bcrypt.compare(password, existingUser.hashPassword);
    if (!passwordMatch) {
      return { error: 'Invalid credentials!' };
    }

    const jwt = await generateJWT(existingUser.id, existingUser.role);

    const user = { ...existingUser, jwt };

    await setSession(user);

    await revalidatePath('/');



    return { success: 'Login successful!' };
  } catch (error) {
    if (error instanceof Error) {
      switch (error.cause) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }
    throw error;
  }
};
