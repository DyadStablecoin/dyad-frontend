import { useEffect, useState } from "react";
import { normalize } from "../utils/currency";
import useLastEthPrice from "./useLastEthPrice";
import useOraclePrice from "./useOraclePrice";

// usd delta between the last eth price from the last sync and the current oracle price
export default function useEthDelta() {
  const [ethDelta, setEthDelta] = useState(0);

  const { lastEthPrice } = useLastEthPrice();
  const { oraclePrice } = useOraclePrice();

  useEffect(() => {
    setEthDelta(normalize(oraclePrice, 8) - lastEthPrice);
  }, [lastEthPrice, oraclePrice]);

  return { ethDelta };
}
