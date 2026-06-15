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
    <div className="mt-4 w-full max-w-xl">
      <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Busquedas recientes
        </h3>
        <button
          onClick={clear}
          className="self-start text-xs text-gray-400 transition hover:text-purple-600 sm:self-auto"
        >
          Limpiar
        </button>
      </div>
      <ul className="flex flex-wrap gap-2">
        {history.map((city) => (
          <li key={city}>
            <button
              onClick={() => onSelect(city)}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 shadow-sm transition hover:border-purple-400 hover:text-purple-600"
            >
              {city}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
