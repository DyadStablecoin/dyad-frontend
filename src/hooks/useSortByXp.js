import { useEffect, useState } from "react";

// sort list of nfts by xp (larger first)
export default function useSortByXp(nfts) {
  const [sortedNfts, setSortedNfts] = useState();

  useEffect(() => {
    if (nfts) {
      // conver to a list
      let _nfts = [];
      for (const [_, value] of Object.entries(nfts)) {
        _nfts.push(value);
      }

      // sort list
      let _sortedNfts = _nfts.sort(function (a, b) {
        return a.xp < b.xp ? 1 : b.xp < a.xp ? -1 : 0;
      });

      setSortedNfts(_sortedNfts);
    }
  }, [nfts]);

  return { sortedNfts };
}
