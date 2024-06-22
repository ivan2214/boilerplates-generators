'use client';

import { useRouter } from 'next/navigation';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

const LoginButton = ({ children, asChild, mode = 'redirect' }: LoginButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    if (mode === 'redirect') {
      router.push('/auth/login');
    }
  };

  if (mode === 'modal') {
    return <span>TODO: Implement Modal</span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
