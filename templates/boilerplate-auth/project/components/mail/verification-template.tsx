import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MdOutlineIntegrationInstructions } from 'react-icons/md';

export const VerificationTemplate = ({ confirmLink }: { confirmLink: string }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <MdOutlineIntegrationInstructions className="mr-2 h-8 w-8 text-gray-600 dark:text-gray-400" />
            <span className="text-lg font-bold text-gray-800 dark:text-gray-200">Acme Inc.</span>
          </div>
        </header>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Verify Your Email</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We ve sent a verification code to your email address. Please enter the code below to
            confirm your identity.
          </p>
          <div className="flex items-center justify-center">
            <div className="rounded-md bg-gray-100 px-4 py-2 text-2xl font-bold text-gray-800 dark:bg-gray-700 dark:text-gray-200">
              123456
            </div>
            <Button
              className="ml-4 text-gray-800 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
              variant="outline"
            >
              Copy Code
            </Button>
          </div>
          <a href={confirmLink}>Confirm Email</a>
        </div>
        <footer className="mt-6 text-center text-gray-600 dark:text-gray-400">
          <p>
            If you have any questions, please contact us at
            <a className="text-blue-500 hover:underline" href="#">
              support@acme.com
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};
