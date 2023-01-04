export default function NavbarStat({ name, value }) {
  return (
    <div className="flex gap-4">
      <div>{name}</div>
      <div>{value}</div>
    </div>
  );
}
