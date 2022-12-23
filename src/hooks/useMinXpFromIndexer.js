import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useXpMinFromIndexer() {
  const [minXp, setMinXp] = useState(1);

  useEffect(() => {
    supabase
      .from("nfts")
      .select("xp")
      .order("xp", {
        ascending: true,
      })
      .limit(1)
      .then((res) => {
        setMinXp(res.data[0].xp);
      });
  }, []);

  return { minXp };
}
