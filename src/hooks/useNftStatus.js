import { useEffect, useState } from "react";
import { LIQUIDATION_RISK_THRESHOLD } from "../consts/consts";

export const STATUS = {
  RISK_FREE: "RISK_FREE",
  AT_LIQUIDATION_RISK: "AT_LIQUIDATION_RISK",
  LIQUIDATABLE: "LIQUIDATABLE",
};

export default function useNftStatus(nft) {
  const [status, setStatus] = useState(STATUS.RISK_FREE);

  useEffect(() => {
    if (nft.isLiquidatable) {
      setStatus(STATUS.LIQUIDATABLE);
      return;
    }

    if (nft.withdrawn === 0) {
      setStatus(STATUS.RISK_FREE);
      return;
    }

    if (
      nft.deposit / (nft.deposit + nft.withdrawn) <
      LIQUIDATION_RISK_THRESHOLD
    ) {
      setStatus(STATUS.AT_LIQUIDATION_RISK);
      return;
    }
  }, [nft]);

  return { status };
}
