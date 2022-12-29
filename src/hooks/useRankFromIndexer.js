import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useRankFromIndexer(tokenId, version) {
  const [rank, setRank] = useState(0);

  useEffect(() => {
    if (tokenId && version) {
      console.log("useRankFromIndexer: Fetching rank for", tokenId);
      supabase
        .rpc("get_rank", {
          token_id: tokenId,
          version_: version,
        })
        .then((data) => {
          console.log("useRankFromIndexer: Got rank", data);
          setRank(data.data);
        })
        .catch((error) => {
          console.log("useRankFromIndexer:", error);
        });
    }
  }, [tokenId, version]);

  return { rank };
}
