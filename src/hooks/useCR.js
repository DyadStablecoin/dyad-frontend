import { useEffect, useState } from "react";
import { useBalances } from "./useBalances";

// return the current collatorization ration of the protocol
export default function useCR() {
  const { balances } = useBalances();
  const [cr, setCR] = useState(0);

  useEffect(() => {
    const _cr =
      (balances.poolBalanceOfDyad /
        (balances.totalSupplyOfDyad - balances.poolBalanceOfDyad)) *
      100;

    setCR(_cr);
  }, [balances]);

  return { cr };
}
