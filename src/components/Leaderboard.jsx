import useNfts from "../hooks/useNfts";
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

  return (
    <div className="flex">
      <div className="w-[80rem]">
        {nftsList && (
          <table className="leaderboard">
            {TABLE_HEADER}
            {nftsList.map((nft, i) => {
              return <LeaderboardRow nft={nft} rank={i} />;
            })}
          </table>
        )}
      </div>
      {/* <LeaderboardScrollbar /> */}
    </div>
  );
}
