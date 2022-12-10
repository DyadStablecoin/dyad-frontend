import { useState } from "react";
import useNfts from "../hooks/useNfts";
import useSortByXp from "../hooks/useSortByXp";
import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardRow from "./LeaderboardRow";
import LeaderboardSearch from "./LeaderboardSearch";
import Loading from "./Loading";

const TABLE_HEADER = (
  <tr className="text-[#737E76]">
    <th></th>
    <th>Rank</th>
    <th>XP</th>
    <th>value</th>
    {/* <th className="hidden md:table-cell">D</th> */}
    {/* <th className="hidden md:table-cell">W</th> */}
    {/* <th className="hidden md:table-cell">M</th> */}
    <th className="hidden md:table-cell">Withdrawn</th>
    <th className="hidden md:table-cell">Deposited</th>
    <th className="hidden md:table-cell">Deposit Ratio</th>
    <th>Address</th>
  </tr>
);

export default function Leaderboard() {
  const { nfts, isFetching } = useNfts();
  const { sortedNfts } = useSortByXp(nfts);
  const [filter, setFilter] = useState("");

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="md:w-[80rem]">
        <Loading isLoading={isFetching} />
        <LeaderboardHeader />
        <div className="hidden md:block">
          <LeaderboardSearch filter={filter} setFilter={setFilter} />
        </div>
        {sortedNfts && (
          <table className="leaderboard">
            {sortedNfts.map((nft, i) => {
              /**
               * we have to to render TABLE_HEADER like this unfortunately,
               * otherwise it will be rendere too soon. I can not figure out to
               * fix it in a cleaner way.
               */
              return (
                <>
                  {i === 0 && TABLE_HEADER}
                  <LeaderboardRow nft={nft} rank={i + 1} filter={filter} />
                </>
              );
            })}
          </table>
        )}
      </div>
    </div>
  );
}
