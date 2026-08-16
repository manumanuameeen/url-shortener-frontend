import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth.api';
import { MESSAGES } from '../constants/messages';
import { ROUTES } from '../constants/routes';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import '../styles/Auth.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authApi.register({ name, email, password });
      navigate(ROUTES.LOGIN);
    } catch (err: any) {
      const data = err.response?.data;
      if (Array.isArray(data?.message)) {
        setError(data.message[0]);
      } else {
        setError(data?.message || MESSAGES.AUTH.REGISTER_ERROR);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card title="Create an Account" subtitle="Join us to start shortening your URLs">
      {error && <div className="auth-error">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          type="text"
          id="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          minLength={6}
        />

        <Button type="submit" isLoading={isLoading}>
          Sign Up
        </Button>
      </form>

      <div className="auth-footer">
        Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
      </div>
    </Card>
  );
}
