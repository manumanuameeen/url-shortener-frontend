import { useState } from 'react';
import { Input } from './common/Input';
import { Button } from './common/Button';

interface UrlFormProps {
  onShorten: (url: string) => Promise<any>;
  isLoading: boolean;
  error: string | null;
}

export function UrlForm({ onShorten, isLoading, error }: UrlFormProps) {
  const [newUrl, setNewUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    try {
      await onShorten(newUrl);
      setNewUrl('');
    } catch {
      // Error handled by parent or hook
    }
  };

  return (
    <>
      <form className="shortener-form" onSubmit={handleSubmit}>
        <Input
          type="url"
          placeholder="Paste your long URL here (e.g., https://github.com)"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          required
        />
        <Button type="submit" isLoading={isLoading}>
          Shorten URL
        </Button>
      </form>
      {error && <div className="error-msg">{error}</div>}
    </>
  );
}
