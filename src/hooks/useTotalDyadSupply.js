import { useContractRead } from "wagmi";
import { CONTRACT_DYAD } from "../consts/contract";
import dyadABI from "../abi/DYAD.json";
import { useState } from "react";

export default function useTotalDyadSupply() {
  const [totalDyadSupply, setTotalDyadSupply] = useState(0);

  useContractRead({
    addressOrName: CONTRACT_DYAD,
    contractInterface: dyadABI["abi"],
    functionName: "totalSupply",
    onSuccess: (data) => {
      setTotalDyadSupply(parseInt(data._hex));
    },
  });

  return { totalDyadSupply };
}
