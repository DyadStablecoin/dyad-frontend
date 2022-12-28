import { useEffect, useState } from "react";
import { SAFETY_MODE_THRESHOLD } from "../consts/consts";

export const STATUS = {
  RISK_FREE: "RISK_FREE",
  AT_LIQUIDATION_RISK: "AT_LIQUIDATION_RISK",
  LIQUIDATABLE: "LIQUIDATABLE",
};

export default function useNftStatus(nft) {
  const [status, setStatus] = useState(STATUS.RISK_FREE);

  useEffect(() => {
    if (nft.withdrawn === 0) {
      setStatus(STATUS.RISK_FREE);
      return;
    }

    if (nft.isLiquidatable) {
      setStatus(STATUS.LIQUIDATABLE);
      return;
    }

    if (nft.deposit / nft.withdrawn < SAFETY_MODE_THRESHOLD) {
      setStatus(STATUS.AT_LIQUIDATION_RISK);
      return;
    }
  }, [nft]);

  return { status };
}
