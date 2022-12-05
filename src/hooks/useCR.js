import { useBalances } from "./useBalances";

// return the current collatorization ration of the protocol
export default function useCR() {
  const { balances } = useBalances();

  const cr = (balances.poolBalanceOfDyad / balances.totalSupplyOfDyad) * 100;

  return { cr };
}
