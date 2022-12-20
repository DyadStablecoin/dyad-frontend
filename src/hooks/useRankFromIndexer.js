import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useRankFromIndexer(tokenId) {
  const [rank, setRank] = useState("Syncing...");

  useEffect(() => {
    console.log("useRankFromIndexer: Fetching rank for", tokenId);
    supabase
      .rpc("get_rank", {
        token_id: tokenId,
      })
      .then((data) => {
        setRank(data.data);
      })
      .catch((error) => {
        console.log("useRankFromIndexer:", error);
      });
  }, [tokenId]);

  return { rank };
}
