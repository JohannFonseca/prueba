import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get('city');

  if (!city) {
    return NextResponse.json(
      { message: 'El parámetro city es requerido' },
      { status: 400 }
    );
  }

  const apiKey = process.env.OWM_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=es`;

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json(
          { message: `Ciudad "${city}" no encontrada` },
          { status: 404 }
        );
      }
      throw new Error('Error al consultar el clima');
    }

    const data = await res.json();

    return NextResponse.json({
      city: data.name,
      country: data.sys.country,
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      icon: data.weather[0].icon,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error de red. Intenta de nuevo.' },
      { status: 500 }
    );
  }
}