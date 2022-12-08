import { useEffect, useState } from "react";

export default function useRank(xps, xp) {
  const [rank, setRank] = useState(0);

  useEffect(() => {
    if (xps && xp) {
      const _rank = xps.reverse().filter((x) => x > xp).length + 1;
      setRank(_rank);
    }
  }, [xps, xp]);

  return { rank };
}
