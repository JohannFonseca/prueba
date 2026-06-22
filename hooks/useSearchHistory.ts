'use client';
import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'search_history';
const MAX_ITEMS = 5;
const CHANGE_EVENT = 'search-history-change';

const EMPTY: string[] = [];

let cachedRaw: string | null = null;
let cachedValue: string[] = EMPTY;

function parse(raw: string | null): string[] {
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    const clean = parsed.filter(
      (c): c is string => typeof c === 'string' && c.trim().length > 0
    );
    return clean.length ? clean.slice(0, MAX_ITEMS) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): string[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedValue;
  cachedRaw = raw;
  cachedValue = parse(raw);
  return cachedValue;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener('storage', callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function write(items: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {

  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/**
 * Historial de las últimas 5 ciudades buscadas, persistente en localStorage.
 */
export function useSearchHistory() {
  const history = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

 
  const add = useCallback((city: string) => {
    const value = city.trim();
    if (!value) return;
    const current = getSnapshot();
    const rest = current.filter((c) => c.toLowerCase() !== value.toLowerCase());
    write([value, ...rest].slice(0, MAX_ITEMS));
  }, []);

  const clear = useCallback(() => write(EMPTY), []);

  return { history, add, clear };
}
