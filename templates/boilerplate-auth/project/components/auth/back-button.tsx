'use client';

import { Button } from '@ui/button';
import Link from 'next/link';

interface BackButtonProps {
  label: string;
  href: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ label, href }) => {
  return (
    <Button size="sm" className="w-full font-normal" variant="link" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
