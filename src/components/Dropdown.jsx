import { Select } from "@chakra-ui/react";

export default function Dropdown({ options, onChange }) {
  return (
    <Select onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => (
        <option key={option} value={option} style={{ color: "black" }}>
          {option}
        </option>
      ))}
    </Select>
  );
}
