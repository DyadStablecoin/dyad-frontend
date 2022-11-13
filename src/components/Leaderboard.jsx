import LeaderboardRow from "./LeaderboardRow";

const TABLE_HEADER = (
  <tr className="text-[#737E76]">
    <th></th>
    <th>Rank</th>
    <th>XP</th>
    <th>value</th>
    <th>D</th>
    <th>W</th>
    <th>M</th>
    <th>Address</th>
  </tr>
);

export default function Leaderboard() {
  return (
    <table className="leaderboard">
      {TABLE_HEADER}
      <LeaderboardRow />
      <LeaderboardRow />
      <LeaderboardRow />
      <LeaderboardRow />
      <LeaderboardRow />
      <LeaderboardRow />
      <LeaderboardRow />
    </table>
  );
}
