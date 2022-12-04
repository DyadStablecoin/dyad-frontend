import { useEffect, useState } from "react";

// sort list of nfts by xp (larger first)
export default function useSortByXp(nfts) {
  const [sortedNfts, setSortedNfts] = useState();

  useEffect(() => {
    if (nfts) {
      setSortedNfts(
        nfts.sort(function (a, b) {
          return a.xp < b.xp ? 1 : b.xp > a.xp ? -1 : 0;
        })
      );
    }
  }, [nfts]);

  return { sortedNfts };
}
