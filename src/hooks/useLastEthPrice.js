import { useState } from "react";
import { useContractRead } from "wagmi";
import { CONTRACT_POOL } from "../consts/contract";
import poolABI from "../abi/Pool.json";

export default function useLastEthPrice() {
  const [lastEthPrice, setLastEthPrice] = useState(0);

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_POOL,
    contractInterface: poolABI["abi"],
    functionName: "lastEthPrice",
    onSuccess: (data) => {
      setLastEthPrice(parseInt(data._hex) / 10 ** 8);
    },
  });

  return { refetch, lastEthPrice };
}
