import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Copy, Link as LinkIcon, LogOut, Check } from 'lucide-react';
import '../styles/Dashboard.css';

interface Url {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [urls, setUrls] = useState<Url[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);


  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await api.get('/urls');
      setUrls(response.data);
    } catch (err: unknown) {
      console.error('Failed to fetch URLs', err);
    }
  };

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/urls', { originalUrl: newUrl });

      setUrls([response.data, ...urls]);
      setNewUrl('');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as { message?: string | string[] };
        if (Array.isArray(data?.message)) {
          setError(data.message[0]);
        } else {
          setError(data?.message ?? 'Failed to shorten URL.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (shortCode: string) => {
    const fullUrl = `${import.meta.env.VITE_API_URL}/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedCode(shortCode);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Welcome, {user?.name || 'User'}!</h1>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </header>

      <section className="shortener-section">
        <h2>Create a new short link</h2>
        <form className="shortener-form" onSubmit={handleShorten}>
          <input
            type="url"
            placeholder="Paste your long URL here (e.g., https://github.com)"
            className="url-input"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            required
          />
          <button type="submit" className="shorten-btn" disabled={isLoading}>
            {isLoading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>
        {error && <div className="error-msg">{error}</div>}
      </section>

      <section className="urls-section">
        <h2>Your Shortened URLs</h2>
        {urls.length === 0 ? (
          <div className="empty-state">
            <p>You haven't created any short URLs yet.</p>
          </div>
        ) : (
          <div className="urls-grid">
            {urls.map((url) => (
              <div key={url.id} className="url-card">
                <div className="url-info">
                  <a
                   href={`${import.meta.env.VITE_API_URL}/${url.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="short-link"
                  >
                    <LinkIcon size={18} />
                    {`${import.meta.env.VITE_API_URL}/${url.shortCode}`}
                  </a>
                  <span className="original-link" title={url.originalUrl}>
                    {url.originalUrl}
                  </span>
                </div>
                <div className="url-actions">
                  <button 
                    className="icon-btn" 
                    onClick={() => handleCopy(url.shortCode)}
                    title="Copy to clipboard"
                  >
                    {copiedCode === url.shortCode ? <Check size={20} color="#10b981" /> : <Copy size={20} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
