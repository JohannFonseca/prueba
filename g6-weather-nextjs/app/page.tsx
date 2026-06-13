'use client';
import { useState, useEffect } from 'react';
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
    } catch (err: any) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Carga San José como ciudad por defecto al abrir la app
  useEffect(() => {
    fetchWeather('San José');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">App del Clima — G6</h1>
      <SearchBar onSearch={fetchWeather} isLoading={loading} />
      <SearchHistory onSelect={fetchWeather} lastCity={weather?.city} />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {weather && !loading && <WeatherCard data={weather} />}
    </main>
  );
}