import { useBalances } from "./useBalances";

// return the current collatorization ration of the protocol
export default function useCR() {
  const { balances } = useBalances();

  const cr =
    ((balances.totalSupplyOfDyad - balances.poolBalanceOfDyad) /
      balances.poolBalanceOfDyad) *
    100;

  return { cr };
}
