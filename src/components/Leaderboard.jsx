import useNfts from "../hooks/useNfts";
import useSortByXp from "../hooks/useSortByXp";
import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardRow from "./LeaderboardRow";
import Loading from "./Loading";

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
  const { nfts, isFetching } = useNfts();
  const { sortedNfts } = useSortByXp(nfts);

  return (
    <div className="flex items-center justify-center flex-col">
      <Loading isLoading={isFetching} />
      <LeaderboardHeader />
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
    </div>
  );
}
