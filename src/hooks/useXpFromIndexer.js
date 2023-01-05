import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import useLoading from "./useLoading";

export default function useXpFromIndexer(nft) {
  const [xps, setXps] = useState([]);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);
    supabase
      .from("nfts")
      .select("xp, created_at")
      // .eq("tokenId", nft.tokenId)
      .eq("tokenId", 30)
      .order("created_at", { ascending: true })
      .limit(30)
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
        } else {
          setXps(data);
        }
        setIsLoading(false);
      });
  }, []);

  return { xps, isLoading };
}
