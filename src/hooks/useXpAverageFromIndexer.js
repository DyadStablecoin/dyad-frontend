import { useEffect, useState } from "react";
import { CONTRACT_dNFT } from "../consts/contract";
import { supabase } from "../utils/supabase";
import useLastSyncVersion from "./useLastSyncVersion";

export default function useXpAverageFromIndexer() {
  const [xpAverage, setXpAverage] = useState(1);
  const { lastSyncVersion } = useLastSyncVersion();

  useEffect(() => {
    console.log("useXpAverageFromIndexer: Fetching xp average");
    supabase
      .from("nfts")
      .select("*")
      .eq("contractAddress", CONTRACT_dNFT)
      .eq("version", lastSyncVersion)
      .then((data) => {
        setXpAverage(data.data[0].xp_average);
      });
  }, [tokenId]);

  return { xpAverage };
}
