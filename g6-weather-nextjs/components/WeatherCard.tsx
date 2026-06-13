'use client';
import { WeatherData } from '@/types/weather';

interface Props {
  data: WeatherData;
}

// Muestra temperatura, descripción, humedad, viento e ícono del clima actual
export default function WeatherCard({ data }: Props) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

  return (
    <div className="mt-6 w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
      {/* Encabezado: ciudad, país e ícono */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {data.city}, {data.country}
          </h2>
          <p className="capitalize text-gray-500 text-sm mt-1">{data.description}</p>
        </div>
        <img
          src={iconUrl}
          alt={data.description}
          width={72}
          height={72}
          className="drop-shadow"
        />
      </div>

      {/* Temperatura principal */}
      <div className="flex items-end gap-1">
        <span className="text-6xl font-bold text-purple-600">
          {Math.round(data.temp)}°
        </span>
        <span className="text-2xl text-gray-400 mb-2">C</span>
      </div>
      <p className="text-sm text-gray-400 -mt-2">
        Sensación térmica: {Math.round(data.feels_like)}°C
      </p>

      {/* Detalles: humedad y viento */}
      <div className="grid grid-cols-2 gap-3 mt-2">
        <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center gap-1">
          <span className="text-2xl">💧</span>
          <span className="text-xl font-semibold text-gray-700">{data.humidity}%</span>
          <span className="text-xs text-gray-400 uppercase tracking-wide">Humedad</span>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 flex flex-col items-center gap-1">
          <span className="text-2xl">💨</span>
          <span className="text-xl font-semibold text-gray-700">{data.wind_speed} m/s</span>
          <span className="text-xs text-gray-400 uppercase tracking-wide">Viento</span>
        </div>
      </div>
    </div>
  );
}
