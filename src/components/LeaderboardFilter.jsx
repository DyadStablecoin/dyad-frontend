import { LEADERBOARD_FILTER_OPTIONS } from "../consts/leaderboard";
import Dropdown from "./Dropdown";

export default function LeaderboardFilter({ setOption }) {
  return (
    <div className="w-[20rem]">
      <Dropdown options={LEADERBOARD_FILTER_OPTIONS} onChange={setOption} />
    </div>
  );
}
