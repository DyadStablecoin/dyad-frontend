export default function PopupTableRow({ label, _old, _new }) {
  return (
    <tr>
      <td className="text-left text-sm">{label}</td>
      <td>{_old}</td>
      <td>{_new}</td>
    </tr>
  );
}
