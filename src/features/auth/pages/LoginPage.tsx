import { LoginForm } from '../components/LoginForm';
import { useAuthT } from '../hooks';

function LoginPage(): React.ReactElement {
  const t = useAuthT();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">{t('Login')}</h1>
          <p className="mt-2 text-muted-foreground">
            {t('Enter your credentials to access your account')}
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
