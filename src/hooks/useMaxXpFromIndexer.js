import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useXpMaxFromIndexer() {
  const [maxXp, setMaxXp] = useState(1);

  useEffect(() => {
    supabase
      .from("nfts")
      .select("xp")
      .order("xp", {
        ascending: false,
      })
      .limit(1)
      .then((res) => {
        setMaxXp(res.data[0].xp);
      });
  }, []);

  return { maxXp };
}
