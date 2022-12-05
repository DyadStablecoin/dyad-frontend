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
        className="bg-black text-white text-xl w-full px-4 py-2 border-gray-100 rounded-md focus:ring-1 focus:ring-gray-100 focus:border-gray-100"
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
