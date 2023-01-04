import { COLORS } from "../consts/colors";

export default function Label({ children }) {
  return (
    <div className="text-sm" style={{ color: COLORS.Beige }}>
      {children}
    </div>
  );
}
