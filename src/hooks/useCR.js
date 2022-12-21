import { useEffect, useState } from "react";
import usePoolBalance from "./usePoolBalance";
import useTotalDyadSupply from "./useTotalDyadSupply";
import { SAFETY_MODE_THRESHOLD } from "../consts/consts";

// return the current collatorization ration of the protocol
export default function useCR() {
  const [cr, setCR] = useState(SAFETY_MODE_THRESHOLD);

  const { poolBalance } = usePoolBalance();
  const { totalDyadSupply } = useTotalDyadSupply();

  useEffect(() => {
    const _cr = (poolBalance / (totalDyadSupply - poolBalance)) * 100;
    setCR(isNaN(_cr) ? 0 : _cr);
  }, [poolBalance, totalDyadSupply]);

  return { cr };
}
