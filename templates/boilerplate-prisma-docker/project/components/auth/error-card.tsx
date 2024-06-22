import CardWrapper from '@components/auth/card-wrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface ErrorCardProps {}

export const ErrorCard: React.FC<ErrorCardProps> = () => {
  return (
    <CardWrapper
      hederLabel="Oops, something went wrong"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex w-full items-center justify-center">
        <ExclamationTriangleIcon className='text-destructive' />
      </div>
    </CardWrapper>
  );
};
