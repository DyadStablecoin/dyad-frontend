import Label from "./Label";

export default function NavbarStat({ name, value }) {
  return (
    <div className="flex gap-4">
      <Label>{name}</Label>
      <Label>{value}</Label>
    </div>
  );
}
