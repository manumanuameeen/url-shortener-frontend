import { useState } from 'react';
import { Copy, Link as LinkIcon, Check } from 'lucide-react';
import type { Url } from '../types';

interface UrlCardProps {
  url: Url;
}

export function UrlCard({ url }: UrlCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullUrl = `${import.meta.env.VITE_API_URL}/${url.shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fullShortUrl = `${import.meta.env.VITE_API_URL}/${url.shortCode}`;

  return (
    <div className="url-card">
      <div className="url-info">
        <a
          href={fullShortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="short-link"
        >
          <LinkIcon size={18} className="link-icon" />
          <span className="short-link-text">{fullShortUrl}</span>
        </a>
        <span className="original-link" title={url.originalUrl}>
          {url.originalUrl}
        </span>
      </div>
      <div className="url-actions">
        <button
          className="icon-btn"
          onClick={handleCopy}
          title="Copy to clipboard"
        >
          {copied ? <Check size={20} color="#10b981" /> : <Copy size={20} />}
        </button>
      </div>
    </div>
  );
}
