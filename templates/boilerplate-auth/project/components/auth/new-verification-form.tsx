'use client';

import { useCallback, useEffect, useState } from 'react';
import CardWrapper from '@/components/auth/card-wrapper';
import { BiLoaderAlt } from 'react-icons/bi';
import { newVerification } from '@/actions/new-verification';
import { FormError } from '@/components/form-error';
import { FormSucces } from '@/components/form-succes';

interface NewFerificationFormProps {
  token?: string;
}

export const NewFerificationForm: React.FC<NewFerificationFormProps> = ({ token }) => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [verificated, setVerificated] = useState<boolean>(false);

  const viewLoading =
    !verificated && token !== undefined && token !== '' && token !== null && !error;
  const viewError = (error && !verificated) || !token;
  const viewSucces = success || verificated;

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Missing token');
      return;
    }
    newVerification(token)
      .then((res) => {
        setError(res.error);
        setSuccess(res.success);
        if (res.verificated) setVerificated(true);
      })
      .catch((err) => {
        setError('Something went wrong');
      });
  }, [token]);

  useEffect(() => {
    if (!token) {
      setError('Missing token');
      return;
    }
    if (verificated) {
      setSuccess('Already verificated');
      return;
    }
    if (token) {
      onSubmit();
    }
  }, [onSubmit, token, verificated]);

  return (
    <CardWrapper
      hederLabel="Confirm your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex w-full flex-col items-center justify-center">
        {viewError && <FormError message={error} />}
        {viewSucces && <FormSucces message={success} />}
        {viewLoading && (
          <div className="flex w-full flex-col items-center justify-center">
            <BiLoaderAlt className="animate-spin text-3xl" />
          </div>
        )}
      </div>
    </CardWrapper>
  );
};
