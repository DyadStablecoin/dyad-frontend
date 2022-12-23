import { useEffect, useState } from "react";
import useXpMaxFromIndexer from "./useMaxXpFromIndexer";
import useXpMinFromIndexer from "./useMinXpFromIndexer";

export default function useMintAllocation(xp) {
  const [mintAllocation, setMintAllocation] = useState(0);

  const { minXp } = useXpMinFromIndexer();
  const { maxXp } = useXpMaxFromIndexer();

  useEffect(() => {
    let _xp = (xp - minXp) / (maxXp - minXp);
    let _mintAllocation = 1.5 + Math.tanh(11.0 * (_xp - 0.85));
    setMintAllocation(_mintAllocation);
  }, [xp, minXp, maxXp]);

  return { mintAllocation };
}
