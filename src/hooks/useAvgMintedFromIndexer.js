import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { CONTRACT_dNFT } from "../consts/contract";
import useLastSyncVersion from "./useLastSyncVersion";

export default function useAvgMintedFromIndexer() {
  const [avgMinted, setAvgMinted] = useState(1);
  const { lastSyncVersion } = useLastSyncVersion();

  useEffect(() => {
    supabase
      .from("nfts")
      .select("deposit, withdrawn")
      .eq("contractAddress", CONTRACT_dNFT)
      .eq("version", lastSyncVersion)
      .then((res) => {
        let minted = [];
        res.data.forEach((nft) => {
          minted.push(parseInt(nft.deposit) + parseInt(nft.withdrawn));
        });
        setAvgMinted(minted.reduce((a, b) => a + b, 0) / minted.length);
      });
  }, [lastSyncVersion]);

  return { avgMinted };
}
