import { useState } from "react";
import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardTableRow from "./LeaderboardTableRow";
import LeaderboardTableHeader from "./LeaderboardTableHeader";
import LoadingGlobal from "./LoadingGlobal";
import {
  useNftsCountFromIndexer,
  useNftsFromIndexer,
} from "../hooks/useNftsFromIndexer";
import LeaderboardSearch from "./LeaderboardSearch";
import { DEFAULT_ROWS_PER_PAGE } from "../consts/consts";
import LeaderboardFilter from "./LeaderboardFilter";
import useLastSyncVersion from "../hooks/useLastSyncVersion";
import LeaderboardTableFooter from "./LeaderboardTableFooter";

export default function Leaderboard() {
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [range, setRange] = useState({
    start: 0,
    end: rowsPerPage - 1,
  });
  const [owner, setOwner] = useState("");
  const [option, setOption] = useState();

  const [sortBy, setSortBy] = useState({
    name: "xp",
    asc: { xp: false, deposit: true, withdrawn: true },
  });

  const { lastSyncVersion } = useLastSyncVersion();
  const { nfts, isLoading, refetch } = useNftsFromIndexer(
    range,
    owner,
    option,
    sortBy
  );
  const { count } = useNftsCountFromIndexer(owner, option, [nfts, option]);

  function resetRange() {
    setRange({
      start: 0,
      end: rowsPerPage - 1,
    });
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="md:w-[80rem]">
        <LoadingGlobal isLoading={isLoading} />
        <LeaderboardHeader refetch={refetch} />
        <div className="flex justify-between">
          <LeaderboardFilter setOption={setOption} resetRange={resetRange} />
          <LeaderboardSearch
            owner={owner}
            setOwner={setOwner}
            refetch={refetch}
            resetRange={resetRange}
          />
        </div>
        {nfts && (
          <div>
            {nfts.length === 0 && (
              <div className="flex justify-center text-gray-600 text-xl mt-[8rem]">
                Wow, such empty...
              </div>
            )}
            <table className="leaderboard">
              {nfts.length > 0 && (
                <LeaderboardTableHeader sortBy={sortBy} setSortBy={setSortBy} />
              )}
              {nfts.map((nft) => {
                return (
                  <LeaderboardTableRow
                    nft={nft}
                    ensName={nft.ensName}
                    version={lastSyncVersion}
                    ownerAddress={nft.owner}
                    refetch={refetch}
                  />
                );
              })}
            </table>
            {count > DEFAULT_ROWS_PER_PAGE && (
              <LeaderboardTableFooter
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                setRange={setRange}
                count={count}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
