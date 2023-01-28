export default function PopupTableRow({ label, unit, _old, _new }) {
  return (
    <tr>
      <td className="text-left text-sm">
        {label} ({unit})
      </td>
      {_old && <td>{_old}</td>}
      {_new && <td>{_new}</td>}
    </tr>
  );
}
