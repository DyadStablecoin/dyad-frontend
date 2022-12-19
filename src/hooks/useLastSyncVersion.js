import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useLastSyncVersion() {
  const [lastSyncVersion, setLastSyncVersion] = useState();

  useEffect(() => {
    supabase
      .from("nfts")
      .select("version")
      .limit(1)
      .order("version", {
        ascending: false,
      })
      .then((res) => {
        setLastSyncVersion(res.data[0].version);
      });
  });

  return { lastSyncVersion };
}
