import { useEffect, useState } from "react";
import useIdToDyad from "./useIdToDyad";
import useIdToEth from "./useIdToEth";
import useEthPrice from "./useEthPrice";
import { normalize } from "../utils/currency";

export default function useIdToCR(tokenId, newDyad = 0, newEth = 0) {
  const [cr, setCR] = useState(0);

  const { dyad } = useIdToDyad(tokenId);
  const { eth } = useIdToEth(tokenId);
  const { ethPrice } = useEthPrice();

  useEffect(() => {
    let collat = normalize(eth, 18) * ethPrice + newEth;

    if (dyad === 0 && newDyad === 0) {
      setCR(9999999999);
      return;
    }

    const _cr = (collat / (normalize(dyad, 18) + newDyad)) * 100;
    setCR(isNaN(_cr) ? 0 : _cr);
  }, [dyad, eth, newDyad]);

  return { cr };
}
