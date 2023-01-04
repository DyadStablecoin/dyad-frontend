import Label from "./Label";

export default function PopupTable({ children }) {
  return (
    <table>
      <th></th>
      <th>
        <Label>Before</Label>
      </th>
      <th>
        <Label>After</Label>
      </th>
      {children}
    </table>
  );
}
