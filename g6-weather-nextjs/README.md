# ⛅ App del Clima - Grupo 6 (G6)

Una aplicación web moderna y dinámica para consultar el clima en tiempo real, construida con **Next.js 16**, **React 19** y **Tailwind CSS v4**. La interfaz cuenta con un diseño *glassmorphism* optimizado para la legibilidad sobre un fondo gradiente animado inspirado en el atardecer, ofreciendo una experiencia de usuario premium y fluida.

---

## Características Principales

1. **Búsqueda Aproximada con Autocompletado:**
   - Consultas en tiempo real al escribir (mínimo 2 caracteres).
   - *Debounce* de 300ms integrado para evitar sobrecarga de peticiones al servidor geocodificador.
   - Lista desplegable con sugerencias de ciudades interactivas.

2. **Historial de Búsquedas Recientes:**
   - Persistencia local mediante un hook personalizado para almacenar las últimas búsquedas del usuario.
   - Acceso rápido a ciudades consultadas anteriormente con un solo clic.
   - Opción para limpiar el historial de forma instantánea.

3. **Interfaz Premium (Glassmorphism & Animaciones):**
   - Fondo gradiente animado (`sunset-bg`) que fluye suavemente mediante animaciones de fotogramas clave (`keyframes`).
   - Contenedor con efecto de vidrio esmerilado (`backdrop-blur-md` y opacidad blanca al 75%) que garantiza la legibilidad de todos los textos sobre el fondo dinámico.
   - Diseño 100% responsivo adaptable a dispositivos móviles, tablets y ordenadores de escritorio.

---

## Stack Tecnológico

- **Framework:** [Next.js 16.2](https://nextjs.org/) (Rutas de API y Renderizado del lado del cliente).
- **Librería de UI:** [React 19.2](https://react.dev/) (Hooks: `useState`, `useEffect`, `useRef`).
- **Estilos:** [Tailwind CSS v4.0](https://tailwindcss.com/) (Temas en línea, variables CSS y utilidades nativas).
- **Lenguaje:** [TypeScript 5](https://www.typescriptlang.org/) (Tipado estricto para datos climáticos y sugerencias geográficas).
- **API Climática:** [OpenWeatherMap API](https://openweathermap.org/api) (Endpoints de Clima Actual y Geocodificación Directa).

---

## Desarrollo Local

### Requisitos Previos
- Node.js (versión 18.0 o superior)
- npm o pnpm

### Pasos para Configurar e Iniciar:

1. **Instalar Dependencias:**
   ```bash
   npm install
   ```

2. **Configurar Variables de Entorno:**
   Crea un archivo llamado `.env.local` en la raíz de la carpeta del proyecto y agrega tu API Key de OpenWeatherMap:
   ```env
   OWM_API_KEY=tu_api_key_aqui
   ```

3. **Ejecutar en Servidor de Desarrollo:**
   ```bash
   npm run dev
   ```

4. **Ver la Aplicación:**
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Guía de Publicación en Vercel

Vercel es la plataforma ideal para desplegar proyectos de Next.js debido a su soporte nativo y optimización de cero configuración. Sigue estos pasos para publicar la aplicación:

### Paso 1: Subir el Proyecto a GitHub
1. Crea un repositorio en tu cuenta de GitHub (ej. `grupo6-weather-nextjs16`).
2. Sube el código del proyecto a la rama principal (`main`).

### Paso 2: Importar el Proyecto en Vercel
1. Inicia sesión en [Vercel](https://vercel.com/) (puedes usar tu cuenta de GitHub).
2. En el panel principal, haz clic en **"Add New"** y selecciona **"Project"**.
3. Importa el repositorio de GitHub de tu aplicación del clima.

### Paso 3: Configurar Variables de Entorno (Crítico)
Antes de hacer clic en Deploy, debes configurar la API Key de OpenWeatherMap en Vercel:
1. En la pantalla de configuración del proyecto, busca la sección **"Environment Variables"**.
2. Agrega la siguiente variable:
   - **Key:** `OWM_API_KEY`
   - **Value:** *[Inserta tu API Key activa de OpenWeatherMap]*
3. Haz clic en **"Add"**.

### Paso 4: Desplegar (Deploy)
1. Haz clic en el botón **"Deploy"**.
2. Vercel compilará la aplicación (ejecutando `next build`) y generará una URL pública y segura (HTTPS) para compartir.

---

## Capturas de Pantalla

A continuación se presentan capturas del funcionamiento de la aplicación en tiempo real:

| Vista Principal (Inicial) | Búsqueda y Autocompletado |
| :---: | :---: |
| ![Vista Principal](./public/screenshots/vista-principal.jpg) | ![Autocompletado](./public/screenshots/autocompletado.jpg) |

| Vista Tablet / Historial | Vista Móvil Responsiva |
| :---: | :---: |
| ![Tablet](./public/screenshots/tablet.jpg) | ![Vista Móvil](./public/screenshots/vista-movil.jpg) |

---

## Fuentes de Información y Referencias Técnicas

Para el desarrollo y fundamentación técnica de esta aplicación se consultaron y aplicaron las directrices de las siguientes fuentes oficiales:

1. **Next.js 16 Documentation (Routing y API Routes):** Guías oficiales sobre el enrutamiento basado en la carpeta `app` y la creación de endpoints de backend seguros bajo `/api/`.  
   *URL:* [https://nextjs.org/docs](https://nextjs.org/docs)
2. **React 19.0 Hooks & State Management:** Documentación sobre el ciclo de vida de componentes funcionales y optimización de renderizados mediante `useEffect` y `useRef`.  
   *URL:* [https://react.dev/reference/react](https://react.dev/reference/react)
3. **Tailwind CSS v4.0 Specification:** Detalles sobre el nuevo motor de estilos CSS y la integración de utilidades para desenfoques de fondo (*backdrop blur*) y temas personalizados.  
   *URL:* [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
4. **OpenWeatherMap Current Weather API:** Estructura de respuestas JSON y especificación de parámetros para la consulta de condiciones atmosféricas globales.  
   *URL:* [https://openweathermap.org/current](https://openweathermap.org/current)
5. **OpenWeatherMap Geocoding API:** Integración de geocodificación directa para traducción de texto de usuario a coordenadas latitud/longitud.  
   *URL:* [https://openweathermap.org/api/geocoding-api](https://openweathermap.org/api/geocoding-api)
6. **Vercel Project Environment Variables Guide:** Directrices oficiales sobre la inyección segura de secretos y configuración de entornos de producción.  
   *URL:* [https://vercel.com/docs/projects/environment-variables](https://vercel.com/docs/projects/environment-variables)
7. **MDN Web Docs - Fetch API:** Estándar del navegador para realizar peticiones HTTP asíncronas con promesas en entornos de JavaScript modernos.  
   *URL:* [https://developer.mozilla.org/es/docs/Web/API/Fetch_API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
8. **TypeScript Compiler & Language Handbook:** Tipado de interfaces complejas para la estructuración y seguridad en el flujo de datos climáticos.  
   *URL:* [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
9. **W3C CSS Backgrounds and Borders Module Level 3:** Teoría sobre el manejo de fondos gradientes múltiples y transiciones suaves para animaciones por hardware.  
   *URL:* [https://www.w3.org/TR/css-backgrounds-3/](https://www.w3.org/TR/css-backgrounds-3/)
