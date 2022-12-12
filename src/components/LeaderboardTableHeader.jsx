import useIsOneNftLiquidatable from "../hooks/useIsOneNftLiquidatable";

export default function LeaderboardTableHeader({ nfts }) {
  const { isOneLiquidatable } = useIsOneNftLiquidatable(nfts);

  return (
    <tr className="text-[#737E76]">
      <th></th>
      <th>Rank</th>
      <th>XP</th>
      <th>value</th>
      <th className="hidden md:table-cell">Withdrawn</th>
      <th className="hidden md:table-cell">Deposited</th>
      {isOneLiquidatable && <th></th>}
      <th className="hidden md:table-cell">Deposit Ratio</th>
      <th>Address</th>
    </tr>
  );
}
