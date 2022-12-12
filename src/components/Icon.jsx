export default function Icon({ children, onClick }) {
  return (
    <span
      className="cursor-pointer flex items-center justify-center"
      onClick={onClick && onClick}
    >
      {children}
    </span>
  );
}
