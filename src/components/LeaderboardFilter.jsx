import Dropdown from "./Dropdown";

export default function LeaderboardFilter({ setOption, refetch }) {
  return (
    <div className="w-[20rem]">
      <Dropdown
        options={["Leaderboard", "My dNFTs", "Liquidatable dNFTs"]}
        onChange={setOption}
      />
    </div>
  );
}
