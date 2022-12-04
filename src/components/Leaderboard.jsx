import useNfts from "../hooks/useNfts";
import useSortByXp from "../hooks/useSortByXp";
import LeaderboardRow from "./LeaderboardRow";
import LeaderboardScrollbar from "./LeaderboardScrollbar";

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
  const { nftsList } = useNfts();
  const { sortedNfts } = useSortByXp(nftsList);

  console.log("test", sortedNfts);

  return (
    <div className="flex">
      <div className="w-[80rem]">
        {sortedNfts && (
          <table className="leaderboard">
            {TABLE_HEADER}
            {sortedNfts.map((nft, i) => {
              return <LeaderboardRow nft={nft} rank={i} />;
            })}
          </table>
        )}
      </div>
      {/* <LeaderboardScrollbar /> */}
    </div>
  );
}
