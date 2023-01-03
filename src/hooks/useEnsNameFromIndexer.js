import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useEnsNameFromIndexer(address) {
  const [ensName, setEnsName] = useState();

  useEffect(() => {
    supabase
      .from("ens")
      .select("ens")
      .eq("address", address)
      .then(({ data, error }) => {
        console.log("useEns", data, error);
        if (error || data.length === 0) {
          return;
        }
        setEnsName(data[0].ens);
      });
  }, [address]);

  return { ensName };
}
