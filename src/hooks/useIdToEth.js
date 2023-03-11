import { useState } from "react";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useContractRead } from "wagmi";

export default function useIdToEth(tokenId) {
  const [eth, setEth] = useState(0);

  const { refetch, isLoading, isFetching } = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "id2eth",
    args: [String(tokenId)],
    onSuccess: (data) => {
      setEth(parseInt(data._hex));
    },
  });

  return { refetch, eth, isLoading, isFetching };
}
