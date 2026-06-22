export default function LoadingSpinner() {
  return (
    <div
      className="mt-6 w-full max-w-xl rounded-xl border border-purple-100 bg-white/90 p-5 shadow-sm"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-center gap-3 text-purple-700">
        <span className="h-6 w-6 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
        <span className="text-sm font-medium">Obteniendo datos del clima...</span>
      </div>
    </div>
  );
}
