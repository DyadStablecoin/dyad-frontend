import { LEADERBOARD_FILTER_OPTIONS } from "../consts/leaderboard";
import Dropdown from "./Dropdown";

export default function LeaderboardFilter({ setOption, resetRange }) {
  return (
    <div className="w-[20rem]">
      <Dropdown
        options={LEADERBOARD_FILTER_OPTIONS}
        defaultValue={LEADERBOARD_FILTER_OPTIONS[0]}
        onChange={(v) => {
          resetRange();
          setOption(v);
        }}
      />
    </div>
  );
}
