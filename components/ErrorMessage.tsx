interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div
      className="mt-6 w-full max-w-xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 shadow-sm"
      role="alert"
    >
      <p className="text-sm font-semibold">No se pudo obtener el clima</p>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  );
}
