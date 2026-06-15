'use client';
import { useState } from 'react';

interface Props {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: Props) {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if (input.trim()) onSearch(input.trim());
  };

  return (
    <div className="flex w-full max-w-xl flex-col gap-2 sm:flex-row">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Buscar ciudad..."
        className="min-h-11 flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <button
        onClick={handleSearch}
        disabled={isLoading}
        className="min-h-11 rounded-lg bg-purple-600 px-6 py-2 font-medium text-white transition hover:bg-purple-700 disabled:opacity-50"
      >
        {isLoading ? 'Buscando...' : 'Buscar'}
      </button>
    </div>
  );
}
