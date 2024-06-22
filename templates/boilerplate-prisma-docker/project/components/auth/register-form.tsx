'use client';

import { useState, useTransition } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { RegisterSchema } from '@schemas/index';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';

import CardWrapper from '@components/auth/card-wrapper';
import { Input } from '@ui/input';
import { Button } from '@ui/button';
import { FormError } from '@components/form-error';
import { FormSucces } from '@components/form-succes';
import { register } from '@/actions/register';

export type RegisterFormValues = z.infer<typeof RegisterSchema>;

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('');

  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      password: '',
      name: ''
    },
    resolver: zodResolver(RegisterSchema)
  });

  function onSubmit(values: RegisterFormValues) {
    setError('');
    setSuccess('');

    startTransition(() => {
      register(values).then((res) => {
        setError(res.error);
        setSuccess(res.success);
      });
    });
  }

  return (
    <CardWrapper
      hederLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} type="text" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="email"
                      placeholder="example@me.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSucces message={success} />

          <Button type="submit" className="w-full">
            {isPending ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
