import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import useLastSyncVersion from "./useLastSyncVersion";
import { CONTRACT_dNFT } from "../consts/contract";

export default function useXpMinFromIndexer() {
  const [minXp, setMinXp] = useState(1);
  const { lastSyncVersion } = useLastSyncVersion();

  useEffect(() => {
    supabase
      .from("nfts")
      .select("xp")
      .eq("contractAddress", CONTRACT_dNFT)
      .eq("version_id", lastSyncVersion)
      .order("xp", {
        ascending: true,
      })
      .limit(1)
      .then((res) => {
        setMinXp(res?.data?.[0]?.xp);
      });
  }, [lastSyncVersion]);

  return { minXp };
}
