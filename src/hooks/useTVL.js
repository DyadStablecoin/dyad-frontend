import { useState } from "react";
import { CONTRACT_DYAD, CONTRACT_POOL } from "../consts/contract";
import DYAD from "../abi/DYAD.json";
import { useContractRead } from "wagmi";

export default function useTVL() {
  const [tvl, setTVL] = useState(0);

  const {} = useContractRead({
    addressOrName: CONTRACT_DYAD,
    contractInterface: DYAD["abi"],
    functionName: "balanceOf",
    args: [CONTRACT_POOL],
    onSuccess: (data) => {
      setTVL(parseInt(data._hex) / 10 ** 18);
    },
  });

  return { tvl };
}
