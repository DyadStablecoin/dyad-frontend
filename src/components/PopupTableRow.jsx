export default function PopupTableRow({ label, unit, _old, _new }) {
  return (
    <tr>
      <td className="text-left text-sm">
        {label} ({unit})
      </td>
      <td>{_old}</td>
      <td>{_new}</td>
    </tr>
  );
}
