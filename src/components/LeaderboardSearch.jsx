import { SearchOutlined } from "@ant-design/icons";
import Icon from "./Icon";
import TextInput from "./TextInput";

export default function LeaderboardSearch({ owner, setOwner, refetch }) {
  return (
    <div className="flex justify-end w-[80rem] items-center gap-4">
      <TextInput
        placeholder="Filter by Address..."
        value={owner}
        onChange={(v) => setOwner(v)}
        specificKeyFunction={(key) => {
          if (key === "Enter") refetch();
        }}
      />
      <Icon onClick={refetch}>
        <SearchOutlined style={{ color: "#584BAA", fontSize: "1.5rem" }} />
      </Icon>
    </div>
  );
}
