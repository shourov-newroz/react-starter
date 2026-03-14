import { Heading, Text } from '@/components/ui/typography';

import { LoginForm } from '../components/LoginForm';
import { useAuthT } from '../hooks';

function LoginPage(): React.ReactElement {
  const t = useAuthT();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-lg p-8">
          <div className="text-center mb-4 space-y-3">
            <Heading size="h1">{t('Login')}</Heading>
            <Text variant="muted" className="mt-2">
              {t('Enter your credentials to access your account')}
            </Text>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
