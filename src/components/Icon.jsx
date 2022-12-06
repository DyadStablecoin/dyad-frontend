export default function Icon({ children, onClick }) {
  return (
    <span className="cursor-pointer" onClick={onClick && onClick}>
      {children}
    </span>
  );
}
