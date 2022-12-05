import { useEffect, useState } from "react";

/**
 * Returns a list with all xps
 */
export default function useXP(nfts) {
  const [xps, setXPs] = useState();

  useEffect(() => {
    if (nfts) {
      let _xps = [];
      for (const [_, value] of Object.entries(nfts)) {
        _xps.push(value.xp);
      }
      setXPs(_xps);
    }
  }, [nfts]);

  return { xps };
}
