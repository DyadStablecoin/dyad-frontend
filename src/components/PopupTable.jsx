import { COLORS } from "../consts/colors";

export default function PopupTable({ children }) {
  return (
    <table>
      <th></th>
      <th style={{ color: COLORS.Beige }}>Before</th>
      <th style={{ color: COLORS.Beige }}>After</th>
      {children}
    </table>
  );
}
