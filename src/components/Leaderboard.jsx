import { useState } from "react";
import Header from "./LeaderboardHeader";
import Row from "./LeaderboardTableRow";
import TableHeader from "./LeaderboardTableHeader";
import Loading from "./LoadingGlobal";
import {
  useNftsCountFromIndexer,
  useNftsFromIndexer,
} from "../hooks/useNftsFromIndexer";
import Search from "./LeaderboardSearch";
import { DEFAULT_ROWS_PER_PAGE } from "../consts/consts";
import Filter from "./LeaderboardFilter";
import useLastSyncVersion from "../hooks/useLastSyncVersion";
import Footer from "./LeaderboardTableFooter";

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
    <div className="flex flex-col items-center justify-center">
      <div className="w-full md:w-[80rem] md:p-0 p-2">
        <Loading isLoading={isLoading} />
        <Header refetch={refetch} />
        <div className="flex items-center justify-between">
          <Filter setOption={setOption} resetRange={resetRange} />
          <Search
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
                <TableHeader sortBy={sortBy} setSortBy={setSortBy} />
              )}
              {nfts.map((nft) => {
                return (
                  <Row
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
              <Footer
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
