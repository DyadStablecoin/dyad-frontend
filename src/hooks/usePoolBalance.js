import { useContractRead } from "wagmi";
import { CONTRACT_DYAD, CONTRACT_POOL } from "../consts/contract";
import dyadABI from "../abi/DYAD.json";
import { useState } from "react";

export default function usePoolBalance() {
  const [poolBalance, setPoolBalance] = useState(0);

  useContractRead({
    addressOrName: CONTRACT_DYAD,
    contractInterface: dyadABI["abi"],
    functionName: "balanceOf",
    args: [CONTRACT_POOL],
    onSuccess: (data) => {
      setPoolBalance(parseInt(data._hex));
    },
  });

  return { poolBalance };
}
