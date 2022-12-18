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

const ROWS_PER_PAGE = 25;

export default function Leaderboard() {
  const { count } = useNftsCountFromIndexer();
  const [range, setRange] = useState({
    start: 0,
    end: ROWS_PER_PAGE,
  });
  const { nfts, isOneLiquidatable, isLoading, refetch } =
    useNftsFromIndexer(range);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="md:w-[80rem]">
        <LoadingGlobal isLoading={isLoading} />
        <LeaderboardHeader refetch={refetch} />
        {nfts && (
          <div>
            <div className="mb-4 mt-4 flex justify-center">
              <Pagination
                totalRows={count}
                rowsPerPage={ROWS_PER_PAGE}
                range={range}
                setRange={setRange}
              />
            </div>
            <table className="leaderboard">
              <LeaderboardTableHeader isOneLiquidatable={isOneLiquidatable} />
              {nfts.map((nft, i) => {
                return (
                  <LeaderboardTableRow
                    nft={nft}
                    rank={range.start + i}
                    isOneLiquidatable={isOneLiquidatable}
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
