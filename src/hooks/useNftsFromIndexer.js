import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { CONTRACT_dNFT } from "../consts/contract";
import useRefetch from "./useRefetch";
import useIsOneNftLiquidatable from "./useIsOneNftLiquidatable";
import useLastSyncVersion from "./useLastSyncVersion";

/**
 * return the nfts from the indexer, sorted by xp in descending order
 */
export function useNftsFromIndexer(range, owner = "") {
  const [nfts, setNfts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { isOneLiquidatable } = useIsOneNftLiquidatable(nfts);
  const { lastSyncVersion } = useLastSyncVersion();
  console.log("lastSyncVersion", lastSyncVersion);

  const { refetch, trigger } = useRefetch();

  useEffect(() => {
    if (lastSyncVersion) {
      setIsLoading(true);
      supabase
        .from("nfts")
        .select("*")
        .eq("contractAddress", CONTRACT_dNFT)
        .eq("version", lastSyncVersion)
        .ilike("owner", `%${owner}%`) // filter by owner
        .order("xp", { ascending: false })
        .range(range.start, range.end)
        .then((res) => {
          setNfts(res.data);
          setIsLoading(false);
        })
        .catch((_) => {
          setIsLoading(false);
        });
    }
  }, [range, lastSyncVersion, trigger]);

  return { nfts, isOneLiquidatable, isLoading, refetch };
}

// return the number of nfts in the nfts table
export function useNftsCountFromIndexer(owner = "", dependencies) {
  const [count, setCount] = useState();
  const { lastSyncVersion } = useLastSyncVersion();

  useEffect(() => {
    if (lastSyncVersion) {
      supabase
        .from("nfts")
        .select("*", { count: "exact", head: true })
        .eq("contractAddress", CONTRACT_dNFT)
        .eq("version", lastSyncVersion)
        .ilike("owner", `%${owner}%`) // filter by owner
        .then((res) => {
          setCount(res.count);
        });
    }
  }, dependencies);

  return { count };
}
