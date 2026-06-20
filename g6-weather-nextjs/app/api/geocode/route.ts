import { NextRequest, NextResponse } from 'next/server';

interface GeoResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q');

  if (!query || query.trim().length < 2) {
    return NextResponse.json([]);
  }

  const apiKey = process.env.OWM_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { message: 'Falta configurar la API Key de OpenWeatherMap' },
      { status: 500 }
    );
  }

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`;

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });

    if (!res.ok) {
      throw new Error('Error al consultar sugerencias');
    }

    const data: GeoResult[] = await res.json();

    const suggestions = data.map((item) => ({
      label: item.state
        ? `${item.name}, ${item.state}, ${item.country}`
        : `${item.name}, ${item.country}`,
      city: item.name,
      country: item.country,
    }));

    return NextResponse.json(suggestions);
  } catch {
    return NextResponse.json([]);
  }
}