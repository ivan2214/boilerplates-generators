import { auth, signOut } from '@/auth';

interface SettingsPageProps {}

const SettingsPage: React.FC<SettingsPageProps> = async () => {
  const session = await auth();

  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      {JSON.stringify(session)}
      <button type="submit">Sign Out</button>
    </form>
  );
};

export default SettingsPage;
