import { useState } from "react";

export default function useFilterNfts(nfts, filter) {
  const [filteredNfts, setFilteredNfts] = useState(nfts);

  return { filteredNfts };
}
