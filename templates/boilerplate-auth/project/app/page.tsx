import LoginButton from '@components/auth/login-button';
import { Button } from '@ui/button';

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-cyan-200">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold drop-shadow-md">🔐 Auth</h1>
        <p className="text-lg">A simple authentication service</p>
        <div>
          <LoginButton>
            <Button size="lg" variant="secondary">
              Sign In
            </Button>
          </LoginButton> 
        </div>
      </div>
    </main>
  );
}
