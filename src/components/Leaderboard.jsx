import { useState } from "react";
import useNfts from "../hooks/useNfts";
import useSortByXp from "../hooks/useSortByXp";
import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardTableRow from "./LeaderboardTableRow";
import LeaderboardSearch from "./LeaderboardSearch";
import LeaderboardTableHeader from "./LeaderboardTableHeader";
import LoadingGlobal from "./LoadingGlobal";

export default function Leaderboard() {
  const { nfts, isFetching } = useNfts();
  const { sortedNfts } = useSortByXp(nfts);
  const [filter, setFilter] = useState("");

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="md:w-[80rem]">
        <LoadingGlobal isLoading={isFetching} />
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
                  {i === 0 && <LeaderboardTableHeader nfts={sortedNfts} />}
                  <LeaderboardTableRow nft={nft} rank={i + 1} filter={filter} />
                </>
              );
            })}
          </table>
        )}
      </div>
    </div>
  );
}
