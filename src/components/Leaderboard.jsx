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

export default function Leaderboard() {
  // const { nfts, isFetching } = useNfts();
  // const { sortedNfts } = useSortByXp(nfts);
  const [filter, setFilter] = useState("");
  // const { isOneLiquidatable } = useIsOneNftLiquidatable(sortedNfts);
  const [nfts, setNfts] = useState();

  useEffect(() => {
    supabase
      .from("nfts")
      .select("*")
      .eq("contractAddress", CONTRACT_dNFT)
      .order("xp", { ascending: false })
      .limit(20)
      .then((res) => {
        setNfts(res.data);
      });
  }, []);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="md:w-[80rem]">
        <LoadingGlobal isLoading={false} />
        {/* <LeaderboardHeader /> */}
        {/* <div className="hidden md:block"> */}
        {/*   <LeaderboardSearch filter={filter} setFilter={setFilter} /> */}
        {/* </div> */}
        {nfts && (
          <table className="leaderboard">
            {nfts.map((nft, i) => {
              /**
               * we have to to render TABLE_HEADER like this unfortunately,
               * otherwise it will be rendere too soon. I can not figure out to
               * fix it in a cleaner way.
               */
              return (
                <>
                  {i === 0 && (
                    <LeaderboardTableHeader
                      // {/* isOneLiquidatable={isOneLiquidatable} */}
                      isOneLiquidatable={false}
                    />
                  )}
                  <LeaderboardTableRow
                    nft={nft}
                    rank={i + 1}
                    // filter={filter}
                    // {/* isOneLiquidatable={isOneLiquidatable} */}
                    isOneLiquidatable={false}
                  />
                </>
              );
            })}
          </table>
        )}
      </div>
    </div>
  );
}
