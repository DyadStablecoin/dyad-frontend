import Dropdown from "./Dropdown";

export default function LeaderboardFilter({}) {
  return (
    <div className="w-[20rem]">
      <Dropdown options={["Leaderboard", "My dNFTs", "Liquidatable dNFTs"]} />
    </div>
  );
}
