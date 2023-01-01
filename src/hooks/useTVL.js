import { useEffect, useState } from "react";
import { CONTRACT_DYAD, CONTRACT_dNFT } from "../consts/contract";
import dyadABI from "../abi/DYAD.json";
import { useContractRead } from "wagmi";

export default function useTVL(newAmountAddedToPool = 0) {
  const [tvl, setTVL] = useState(0);

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_DYAD,
    contractInterface: dyadABI["abi"],
    functionName: "balanceOf",
    args: [CONTRACT_dNFT],
    onSuccess: (data) => {
      let _tvl = parseInt(data._hex) / 10 ** 18;
      if (newAmountAddedToPool) {
        _tvl += parseInt(newAmountAddedToPool);
      }
      setTVL(_tvl);
    },
  });

  useEffect(() => {
    refetch();
  }, [newAmountAddedToPool]);

  return { refetch, tvl };
}
