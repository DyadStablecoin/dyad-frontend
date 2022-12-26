import { useContractRead } from "wagmi";
import { CONTRACT_DYAD } from "../consts/contract";
import dyadABI from "../abi/DYAD.json";
import { useState } from "react";

export default function useTotalDyadSupply() {
  const [totalDyadSupply, setTotalDyadSupply] = useState(0);

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_DYAD,
    contractInterface: dyadABI["abi"],
    functionName: "totalSupply",
    onSuccess: (data) => {
      console.log("useTotalDyadSupply: Fetching total DYAD supply");
      setTotalDyadSupply(parseInt(data._hex));
    },
  });

  return { totalDyadSupply, refetch };
}
