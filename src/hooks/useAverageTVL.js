import { useEffect, useState } from "react";
import useTotalNftSupply from "./useTotalNftSupply";
import useEthInPool from "./useEthInPool";
import useEthPrice from "./useEthPrice";

export default function useAverageTVL(newAmountAddedToPool = 0) {
  const [averageTVL, setAverageTVL] = useState(1);
  const { totalNftSupply } = useTotalNftSupply();

  const { ethInPool } = useEthInPool();
  const { ethPrice } = useEthPrice();

  useEffect(() => {
    if (totalNftSupply) {
      setAverageTVL(
        (ethInPool * ethPrice + newAmountAddedToPool) / totalNftSupply
      );
    }
  }, [totalNftSupply, newAmountAddedToPool]);

  return { averageTVL };
}
