import { useEffect, useState } from "react";
import useIdToEth from "../hooks/useIdToEth";
import useIdToDyad from "../hooks/useIdToDyad";
import useEthPrice from "../hooks/useEthPrice";

export default function useIdToDepositRatio(tokenId) {
  const [depositRatio, setDepositRatio] = useState(0);
  const { ethPrice } = useEthPrice();

  const { eth } = useIdToEth(tokenId);
  const { dyad } = useIdToDyad(tokenId);

  useEffect(() => {
    const dr = parseInt(((eth * ethPrice) / (eth * ethPrice + dyad)) * 100);
    if (isNaN(dr)) {
      setDepositRatio(0);
    } else {
      setDepositRatio(dr);
    }
  }, [eth, dyad]);

  return { depositRatio };
}
