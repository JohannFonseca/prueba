'use client';
import { useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import SearchHistory from '@/components/SearchHistory';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { WeatherData } from '@/types/weather';

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setWeather(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Carga San Jose de Costa Rica como ciudad por defecto al abrir la app.
  useEffect(() => {
    const loadDefaultWeather = async () => {
      await fetchWeather('San Jose,CR');
    };

    loadDefaultWeather();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:mb-8 sm:text-3xl">
        App del Clima - G6
      </h1>
      <SearchBar onSearch={fetchWeather} isLoading={loading} />
      <SearchHistory
        onSelect={fetchWeather}
        lastCity={weather ? `${weather.city}, ${weather.country}` : undefined}
      />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {weather && !loading && <WeatherCard data={weather} />}
    </main>
  );
}
