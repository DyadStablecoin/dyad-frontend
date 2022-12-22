import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useLastSyncVersion() {
  const [lastSyncVersion, setLastSyncVersion] = useState();

  useEffect(() => {
    supabase
      .from("versions")
      .select("version")
      .order("version", {
        ascending: false,
      })
      .limit(1)
      .then((res) => {
        setLastSyncVersion(res.data[0].version);
      });
  });

  return { lastSyncVersion };
}
