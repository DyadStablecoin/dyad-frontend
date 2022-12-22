import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { CONTRACT_dNFT } from "../consts/contract";
import useRefetch from "./useRefetch";
import useIsOneNftLiquidatable from "./useIsOneNftLiquidatable";
import useLastSyncVersion from "./useLastSyncVersion";
import { useAccount } from "wagmi";
import { LIQUIDATABLE_OPTION, MY_DNFTS_OPTION } from "../consts/leaderboard";
import { ROWS_PER_LEADERBOARD_PAGE } from "../consts/consts";

function resetRange() {
  return {
    start: 0,
    end: ROWS_PER_LEADERBOARD_PAGE,
  };
}

function setFilters(option, owner, address, range) {
  let _range = range;

  let _owner = owner;
  if (option === MY_DNFTS_OPTION) {
    _owner = address;
    _range = resetRange();
  }

  let _deposit = 9000;
  if (option === LIQUIDATABLE_OPTION) {
    _deposit = 0;
    _range = resetRange();
  }

  return { _owner, _deposit, _range };
}

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
    let { _owner, _deposit, _range } = setFilters(
      option,
      owner,
      address,
      range
    );

    if (lastSyncVersion) {
      setIsLoading(true);
      supabase
        .from("nfts")
        .select("*")
        .eq("contractAddress", CONTRACT_dNFT)
        .eq("version", lastSyncVersion)
        .ilike("owner", `%${_owner}%`) // filter by owner
        // .lt("deposit", _deposit)
        .order("xp", { ascending: false })
        .range(_range.start, _range.end)
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
    let { _owner, _deposit } = setFilters(option, owner, address);

    if (lastSyncVersion) {
      supabase
        .from("nfts")
        .select("*", { count: "exact", head: true })
        .eq("contractAddress", CONTRACT_dNFT)
        .eq("version", lastSyncVersion)
        .ilike("owner", `%${_owner}%`) // filter by owner
        // .lt("deposit", _deposit)
        .then((res) => {
          setCount(res.count);
        });
    }
  }, dependencies);

  return { count };
}
