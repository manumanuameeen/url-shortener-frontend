import { useState, useEffect, useCallback } from 'react';
import { urlsApi } from '../api/urls.api';
import type { Url } from '../types';
import { MESSAGES } from '../constants/messages';

export function useUrls() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUrls = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await urlsApi.getAll();
      setUrls(data);
    } catch (err: any) {
      console.error('Failed to fetch URLs', err);
      setError(MESSAGES.URLS.FETCH_ERROR);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const shortenUrl = async (newUrl: string) => {
    if (!newUrl) return;
    setError(null);
    try {
      const data = await urlsApi.create(newUrl);
      setUrls((prev) => [data, ...prev]);
      return data;
    } catch (err: any) {
      const data = err.response?.data;
      if (Array.isArray(data?.message)) {
        setError(data.message[0]);
      } else {
        setError(data?.message || MESSAGES.URLS.CREATE_ERROR);
      }
      throw err;
    }
  };

  const removeUrl = async (id: string) => {
    try {
      await urlsApi.remove(id);
      setUrls((prev) => prev.filter((url) => url.id !== id));
    } catch (err: any) {
      console.error('Failed to delete URL', err);
      // Optional: Add a toast notification here
      throw err;
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  return {
    urls,
    isLoading,
    error,
    shortenUrl,
    removeUrl,
    fetchUrls,
  };
}
