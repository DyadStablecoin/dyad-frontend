import { useEffect, useState } from "react";
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
  const { totalDyadSupply, refetch: refetchTotalDyadSupply } =
    useTotalDyadSupply();

  function refetch() {
    refetchTotalDyadSupply();
  }

  useEffect(() => {
    if (totalDyadSupply) {
      let totalWithdrawn = totalDyadSupply;
      let collatVault = ethInPool * ethPrice + newAmountAddedToPool;

      if (totalWithdrawn === 0) {
        totalWithdrawn = 1;
      }

      const _cr = (collatVault / normalize(totalWithdrawn, 18)) * 100;
      setCR(isNaN(_cr) ? 0 : _cr);
    }
  }, [totalDyadSupply, newAmountAddedToPool]);

  return { cr, refetch };
}
