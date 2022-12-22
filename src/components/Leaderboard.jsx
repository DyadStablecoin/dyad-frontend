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
import { ROWS_PER_LEADERBOARD_PAGE } from "../consts/consts";
import LeaderboardFilter from "./LeaderboardFilter";

export default function Leaderboard() {
  const [range, setRange] = useState({
    start: 0,
    end: ROWS_PER_LEADERBOARD_PAGE,
  });
  const [owner, setOwner] = useState("");
  const [option, setOption] = useState("Leaderboard");

  const { nfts, isLoading, refetch } = useNftsFromIndexer(range, owner);
  const { count } = useNftsCountFromIndexer(owner, [nfts]);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="md:w-[80rem]">
        <LoadingGlobal isLoading={isLoading} />
        <LeaderboardHeader refetch={refetch} />
        <div className="flex justify-between">
          <LeaderboardFilter />
          <LeaderboardSearch
            owner={owner}
            setOwner={setOwner}
            refetch={refetch}
          />
        </div>
        {nfts && (
          <div>
            <table className="leaderboard">
              {nfts.length > 0 && <LeaderboardTableHeader />}
              {nfts.map((nft, i) => {
                return (
                  <LeaderboardTableRow
                    id={nft.id}
                    ensName={nft.ensName}
                    ownerAddress={nft.owner}
                    rank={range.start + i + 1}
                    refetch={refetch}
                  />
                );
              })}
            </table>
            {count > ROWS_PER_LEADERBOARD_PAGE && (
              <div className="mb-4 mt-8 flex justify-center">
                <Pagination
                  totalRows={count}
                  rowsPerPage={ROWS_PER_LEADERBOARD_PAGE}
                  setRange={setRange}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
