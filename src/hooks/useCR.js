import { useEffect, useState } from "react";
import usePoolBalance from "./usePoolBalance";
import useTotalDyadSupply from "./useTotalDyadSupply";
import { SAFETY_MODE_THRESHOLD } from "../consts/consts";
import useEthInPool from "./useEthInPool";
import useEthPrice from "./useEthPrice";
import { normalize } from "../utils/currency";

// return the current collatorization ration of the protocol
//
// `newAmountAddedToPool`: sometimes we want so simulate how CR changes when a
// new amount is added to the pool.
export default function useCR(newAmountAddedToPool = 0) {
  const [cr, setCR] = useState(SAFETY_MODE_THRESHOLD);

  const { ethInPool } = useEthInPool();
  const { ethPrice } = useEthPrice();
  const { poolBalance, refetch: refetchPoolBalance } = usePoolBalance();
  const { totalDyadSupply, refetch: refetchTotalDyadSupply } =
    useTotalDyadSupply();

  function refetch() {
    refetchPoolBalance();
    refetchTotalDyadSupply();
  }

  useEffect(() => {
    let totalWithdrawn = totalDyadSupply - (poolBalance + newAmountAddedToPool);
    let collatVault = ethInPool * ethPrice;

    if (totalWithdrawn === 0) {
      totalWithdrawn = 1;
    }

    const _cr = (collatVault / normalize(totalWithdrawn, 18)) * 100;
    setCR(isNaN(_cr) ? 0 : _cr);
  }, [poolBalance, totalDyadSupply, newAmountAddedToPool]);

  return { cr, refetch };
}
