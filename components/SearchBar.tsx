'use client';
import { useEffect, useRef, useState } from 'react';

interface Props {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

interface Suggestion {
  label: string;
  city: string;
  country: string;
}

export default function SearchBar({ onSearch, isLoading }: Props) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = input.trim();
    if (query.length < 2) {
      // Clear suggestions inside an effect asynchronously to avoid synchronous setState trigger
      const timer = setTimeout(() => {
        setSuggestions([]);
      }, 0);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setSuggestions(data);
      } catch {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value?: string) => {
    const query = (value ?? input).trim();
    if (query) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion: Suggestion) => {
    const value = `${suggestion.city}, ${suggestion.country}`;
    setInput(value);
    handleSearch(value);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Buscar ciudad..."
          className="min-h-11 flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={() => handleSearch()}
          disabled={isLoading}
          className="min-h-11 rounded-lg bg-purple-600 px-6 py-2 font-medium text-white transition hover:bg-purple-700 disabled:opacity-50"
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {suggestions.map((s, i) => (
            <li key={`${s.label}-${i}`}>
              <button
                type="button"
                onClick={() => handleSelectSuggestion(s)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-purple-50"
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}