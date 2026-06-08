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
    <div className="flex gap-2 w-full max-w-xl">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Buscar ciudad..."
className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-black bg-white"      />
      <button
        onClick={handleSearch}
        disabled={isLoading}
        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition"
      >
        {isLoading ? 'Buscando...' : 'Buscar'}
      </button>
    </div>
  );
}