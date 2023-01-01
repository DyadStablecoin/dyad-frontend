import { useEffect, useState } from "react";
import useTotalNftSupply from "./useTotalNftSupply";
import useTVL from "./useTVL";

export default function useAverageTVL(newAmountAddedToPool = 0) {
  const [averageTVL, setAverageTVL] = useState(1);
  const { tvl } = useTVL(newAmountAddedToPool);
  const { totalNftSupply } = useTotalNftSupply();

  useEffect(() => {
    setAverageTVL(tvl / totalNftSupply);
  }, [tvl, totalNftSupply]);

  return { averageTVL };
}
