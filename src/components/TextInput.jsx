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
        onChange={(e) => {
          if (type === "number" && e.target.value === "string") {
            return;
          }
          onChange(e.target.value);
        }}
        type={type}
        onBlur={(e) => onBlur && onBlur()}
        onMouseOut={(e) => onBlur && onBlur()}
        min={min && min}
        onKeyPress={(event) => {
          if (type === "number") {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }
        }}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
