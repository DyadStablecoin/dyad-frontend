import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { CONTRACT_dNFT } from "../consts/contract";
import useRefetch from "./useRefetch";
import useIsOneNftLiquidatable from "./useIsOneNftLiquidatable";
import useLastSyncVersion from "./useLastSyncVersion";
import { useAccount } from "wagmi";

/**
 * return the nfts from the indexer, sorted by xp in descending order
 */
export function useNftsFromIndexer(range, owner = "", option = "Leaderboard") {
  const [nfts, setNfts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { isOneLiquidatable } = useIsOneNftLiquidatable(nfts);
  const { lastSyncVersion } = useLastSyncVersion();
  const { address } = useAccount();

  const { refetch, trigger } = useRefetch();

  useEffect(() => {
    if (option === "My dNFTs") {
      owner = address;
    }
    let deposit = Number.MAX_SAFE_INTEGER;
    if (option === "Liquidatable dNFTs") {
      deposit = 0;
    }

    if (lastSyncVersion) {
      setIsLoading(true);
      supabase
        .from("nfts")
        .select("*")
        .eq("contractAddress", CONTRACT_dNFT)
        .eq("version", lastSyncVersion)
        .ilike("owner", `%${owner}%`) // filter by owner
        .lt("deposit", deposit)
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
  }, [range, lastSyncVersion, option, trigger]);

  return { nfts, isOneLiquidatable, isLoading, refetch };
}

// return the number of nfts in the nfts table
export function useNftsCountFromIndexer(
  owner = "",
  option = "Leaderboard",
  dependencies
) {
  const [count, setCount] = useState();
  const { lastSyncVersion } = useLastSyncVersion();
  const { address } = useAccount();

  useEffect(() => {
    if (option === "My dNFTs") {
      owner = address;
    }

    let deposit = Number.MAX_SAFE_INTEGER;
    if (option === "Liquidatable dNFTs") {
      deposit = 0;
    }

    if (lastSyncVersion) {
      supabase
        .from("nfts")
        .select("*", { count: "exact", head: true })
        .eq("contractAddress", CONTRACT_dNFT)
        .eq("version", lastSyncVersion)
        .ilike("owner", `%${owner}%`) // filter by owner
        .lt("deposit", deposit)
        .then((res) => {
          setCount(res.count);
        });
    }
  }, dependencies);

  return { count };
}
