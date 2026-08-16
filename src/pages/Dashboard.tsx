import { useUrls } from '../hooks/useUrls';
import { UrlCard } from '../components/UrlCard';
import { UrlForm } from '../components/UrlForm';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { urls, isLoading, error, shortenUrl } = useUrls();

  return (
    <>
      <section className="shortener-section">
        <h2>Create a new short link</h2>
        <UrlForm onShorten={shortenUrl} isLoading={isLoading} error={error} />
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
              <UrlCard key={url.id} url={url} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
