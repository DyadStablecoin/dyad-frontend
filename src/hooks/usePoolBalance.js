import { useContractRead } from "wagmi";
import { CONTRACT_dNFT, CONTRACT_DYAD } from "../consts/contract";
import dyadABI from "../abi/DYAD.json";
import { useState } from "react";

export default function usePoolBalance() {
  const [poolBalance, setPoolBalance] = useState(0);

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_DYAD,
    contractInterface: dyadABI["abi"],
    functionName: "balanceOf",
    args: [CONTRACT_dNFT],
    onSuccess: (data) => {
      console.log("usePoolBalance: Fetching pool balance");
      setPoolBalance(parseInt(data._hex));
    },
  });

  return { poolBalance, refetch };
}
