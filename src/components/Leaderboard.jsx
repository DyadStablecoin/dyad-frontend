import { useState } from "react";
import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardTableRow from "./LeaderboardTableRow";
import LeaderboardTableHeader from "./LeaderboardTableHeader";
import LoadingGlobal from "./LoadingGlobal";
import {
  useNftsCountFromIndexer,
  useNftsFromIndexer,
} from "../hooks/useNftsFromIndexer";
import Pagination from "./Pagination";
import LeaderboardSearch from "./LeaderboardSearch";

const ROWS_PER_PAGE = 20;

export default function Leaderboard() {
  const [range, setRange] = useState({
    start: 0,
    end: ROWS_PER_PAGE,
  });
  const [owner, setOwner] = useState("");

  const { count } = useNftsCountFromIndexer();
  const { nfts, isLoading, refetch } = useNftsFromIndexer(range, owner);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="md:w-[80rem]">
        <LoadingGlobal isLoading={isLoading} />
        <LeaderboardHeader refetch={refetch} />
        <LeaderboardSearch filter={owner} setFilter={setOwner} />
        {nfts && (
          <div>
            <div className="mb-4 mt-8 flex justify-center">
              <Pagination
                totalRows={count}
                rowsPerPage={ROWS_PER_PAGE}
                range={range}
                setRange={setRange}
              />
            </div>
            <table className="leaderboard">
              <LeaderboardTableHeader />
              {nfts.map((nft, i) => {
                return (
                  <LeaderboardTableRow
                    id={nft.id}
                    ownerAddress={nft.owner}
                    rank={range.start + i}
                    refetch={refetch}
                  />
                );
              })}
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
