'use client';
import { useEffect } from 'react';
import { useSearchHistory } from '@/hooks/useSearchHistory';

interface Props {
  onSelect: (city: string) => void;
  lastCity?: string;
}

export default function SearchHistory({ onSelect, lastCity }: Props) {
  const { history, add, clear } = useSearchHistory();

  useEffect(() => {
    if (lastCity) add(lastCity);
  }, [lastCity, add]);

  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-xl mt-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Búsquedas recientes
        </h3>
        <button
          onClick={clear}
          className="text-xs text-gray-400 hover:text-purple-600 transition"
        >
          Limpiar
        </button>
      </div>
      <ul className="flex flex-wrap gap-2">
        {history.map((city) => (
          <li key={city}>
            <button
              onClick={() => onSelect(city)}
              className="px-3 py-1 rounded-full bg-white border border-gray-200 text-sm text-gray-700 hover:border-purple-400 hover:text-purple-600 shadow-sm transition"
            >
              {city}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
