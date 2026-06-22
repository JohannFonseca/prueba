'use client';
import Image from 'next/image';
import { WeatherData } from '@/types/weather';

interface Props {
  data: WeatherData;
}

// Muestra temperatura, descripcion, humedad, viento e icono del clima actual.
export default function WeatherCard({ data }: Props) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

  return (
    <div className="mt-6 flex w-full max-w-xl flex-col gap-4 rounded-2xl bg-white p-5 shadow-lg sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="break-words text-xl font-bold text-gray-800 sm:text-2xl">
            {data.city}, {data.country}
          </h2>
          <p className="mt-1 text-sm capitalize text-gray-500">{data.description}</p>
        </div>
        <Image
          src={iconUrl}
          alt={data.description}
          width={72}
          height={72}
          className="shrink-0 drop-shadow"
        />
      </div>

      <div className="flex items-end gap-1">
        <span className="text-5xl font-bold text-purple-600 sm:text-6xl">
          {Math.round(data.temp)}&deg;
        </span>
        <span className="mb-2 text-2xl text-gray-400">C</span>
      </div>

      <p className="-mt-2 text-sm text-gray-400">
        Sensacion termica: {Math.round(data.feels_like)}&deg;C
      </p>

      <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col items-center gap-1 rounded-xl bg-blue-50 p-4">
          <span className="text-xs font-semibold uppercase text-blue-500">Agua</span>
          <span className="text-xl font-semibold text-gray-700">{data.humidity}%</span>
          <span className="text-xs uppercase tracking-wide text-gray-400">Humedad</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-xl bg-purple-50 p-4">
          <span className="text-xs font-semibold uppercase text-purple-500">Viento</span>
          <span className="text-xl font-semibold text-gray-700">{data.wind_speed} m/s</span>
          <span className="text-xs uppercase tracking-wide text-gray-400">Velocidad</span>
        </div>
      </div>
    </div>
  );
}
