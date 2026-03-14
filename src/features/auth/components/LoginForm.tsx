import { useState, type ReactElement } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useAuth } from '../hooks/useAuth';
import { useAuthT } from '../hooks/useTranslation';

export function LoginForm(): ReactElement {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const t = useAuthT();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">
            {t('Email')}
          </Label>
          <Input
            id="email"
            type="email"
            placeholder={t('Email placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700 font-medium">
            {t('Password')}
          </Label>
          <Input
            id="password"
            type="password"
            placeholder={t('Password placeholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 font-medium" role="alert">
            {error}
          </p>
        )}
        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors"
          disabled={isLoading}
        >
          {isLoading ? t('Signing in...') : t('Sign In')}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-500">
        {t("Don't have an account?")}{' '}
        <a href="/register" className="text-indigo-600 hover:underline">
          {t('Sign up')}
        </a>
      </p>
    </>
  );
}

export default LoginForm;
