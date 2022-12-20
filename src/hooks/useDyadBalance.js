import { useContractRead } from "wagmi";
import { CONTRACT_DYAD } from "../consts/contract";
import dyadABI from "../abi/DYAD.json";
import { useState } from "react";

export default function useDyadBalance(address) {
  const [dyadBalance, setDyadBalance] = useState(0);

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_DYAD,
    contractInterface: dyadABI["abi"],
    functionName: "balanceOf",
    args: [address],
    onSuccess: (data) => {
      console.log("useDyadBalance: Fetching DYAD balance for: ", address);
      setDyadBalance(parseInt(data._hex));
    },
  });

  return { dyadBalance, refetch };
}
