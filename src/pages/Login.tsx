import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/auth.api';
import { MESSAGES } from '../constants/messages';
import { ROUTES } from '../constants/routes';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import '../styles/Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await authApi.login({ email, password });
      login(data.access_token, data.user);
      navigate(ROUTES.DASHBOARD);
    } catch (err: any) {
      setError(
        err.response?.data?.message || MESSAGES.AUTH.LOGIN_ERROR
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card title="Welcome Back" subtitle="Login to manage your shortened URLs">
      {error && <div className="auth-error">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" isLoading={isLoading}>
          Login
        </Button>
      </form>

      <div className="auth-footer">
        Don't have an account? <Link to={ROUTES.REGISTER}>Sign up</Link>
      </div>
    </Card>
  );
}
