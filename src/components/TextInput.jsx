export default function TextInput({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  type,
  min,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-500">{label}</label>
      <input
        className="bg-white text-black w-full px-4 py-2underline border-gray-300 rounded-md focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type && type}
        onBlur={(_) => onBlur && onBlur()}
        onMouseOut={(_) => onBlur && onBlur()}
        min={min && min}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
