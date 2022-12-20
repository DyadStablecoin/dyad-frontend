import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useXpAverageFromIndexer() {
  const [xpAverage, setXpAverage] = useState(1);

  useEffect(() => {
    console.log("useXpAverageFromIndexer: Fetching xp average");
    supabase
      .from("nfts")
      .select("*")
      .then((data) => {
        console.log(data);
        // setXpAverage(data.data[0].xp_average);
      });
  }, [tokenId]);

  return { xpAverage };
}
