import { useEffect, useState } from "react";
import { CONTRACT_dNFT } from "../consts/contract";
import { supabase } from "../utils/supabase";
import useLastSyncVersion from "./useLastSyncVersion";

export default function useXpMaxFromIndexer() {
  const [maxXp, setMaxXp] = useState(1);
  const { lastSyncVersion } = useLastSyncVersion();

  useEffect(() => {
    if (lastSyncVersion) {
      supabase
        .from("nfts")
        .select("xp")
        .eq("contractAddress", CONTRACT_dNFT)
        .eq("version", lastSyncVersion)
        .order("xp", {
          ascending: false,
        })
        .limit(1)
        .then((res) => {
          setMaxXp(res.data[0].xp);
        });
    }
  }, [lastSyncVersion]);

  return { maxXp };
}
