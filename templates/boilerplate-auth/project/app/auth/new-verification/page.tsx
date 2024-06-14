import { NewFerificationForm } from '@/components/auth/new-verification-form';

const NewVerificationPage = ({
  searchParams
}: {
  searchParams: {
    token?: string;
  };
}) => {
  return <NewFerificationForm token={searchParams.token} />;
};

export default NewVerificationPage;
