import { useState, useEffect } from "react";
import useNfts from "../hooks/useNfts";
import useSortByXp from "../hooks/useSortByXp";
import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardTableRow from "./LeaderboardTableRow";
import LeaderboardSearch from "./LeaderboardSearch";
import LeaderboardTableHeader from "./LeaderboardTableHeader";
import LoadingGlobal from "./LoadingGlobal";
import useIsOneNftLiquidatable from "../hooks/useIsOneNftLiquidatable";
import { supabase } from "../utils/supabase";
import { CONTRACT_dNFT } from "../consts/contract";
import {
  useCountNftsFromIndexer,
  useNftsCountFromIndexer,
  useNftsFromIndexer,
} from "../hooks/useNftsFromIndexer";
import Pagination from "./Pagination";

export default function Leaderboard() {
  const [filter, setFilter] = useState("");
  // const { isOneLiquidatable } = useIsOneNftLiquidatable(sortedNfts);

  const { count } = useNftsCountFromIndexer();
  const [index, setIndex] = useState([0, 25]);
  const { nfts, isLoading, refetch } = useNftsFromIndexer(index[0], index[1]);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="md:w-[80rem]">
        <LoadingGlobal isLoading={isLoading} />
        <LeaderboardHeader refetch={refetch} />
        {nfts && (
          <table className="leaderboard">
            <LeaderboardTableHeader isOneLiquidatable={false} />
            {nfts.map((nft, i) => {
              return (
                <>
                  <LeaderboardTableRow
                    nft={nft}
                    rank={index[0] + i}
                    isOneLiquidatable={false}
                  />
                </>
              );
            })}
          </table>
        )}
      </div>
      {nfts && (
        <div className="mt-4">
          <Pagination
            totalRows={count}
            rowsPerPage={25}
            index={index}
            setIndex={setIndex}
          />
        </div>
      )}
    </div>
  );
}
