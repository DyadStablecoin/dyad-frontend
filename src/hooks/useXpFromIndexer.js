import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useXpFromIndexer(nft) {
  const [xps, setXps] = useState([]);

  useEffect(() => {
    supabase
      .from("nfts")
      .select("xp, created_at")
      .eq("tokenId", 30)
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
        } else {
          setXps(data);
        }
      });
  }, []);

  return { xps };
}
