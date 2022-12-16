import { useEffect, useState } from "react";
import { useBalances } from "./useBalances";

// return the current collatorization ration of the protocol
export default function useCR() {
  const { balances } = useBalances();
  const [cr, setCR] = useState(0);

  useEffect(() => {
    const _cr =
      ((balances.totalSupplyOfDyad - balances.poolBalanceOfDyad) /
        balances.poolBalanceOfDyad) *
      100;
    setCR(isNaN(_cr) ? 0 : _cr);
  }, [balances]);

  return { cr };
}
