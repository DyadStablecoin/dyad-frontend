export default function LeaderboardTableHeader({ isOneLiquidatable }) {
  return (
    <tr className="text-[#737E76]">
      <th></th>
      <th>Rank</th>
      <th>XP</th>
      <th>value</th>
      <th className="hidden md:table-cell">Withdrawn</th>
      <th className="hidden md:table-cell">Deposited</th>
      {isOneLiquidatable && <th>Liquidate</th>}
      <th className="hidden md:table-cell">Deposit Ratio</th>
      <th>Address</th>
    </tr>
  );
}
