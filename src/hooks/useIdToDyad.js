import { useState } from "react";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useContractRead } from "wagmi";

export default function useIdToDyad(tokenId) {
  const [dyad, setDyad] = useState(0);

  const { refetch, isLoading, isFetching } = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "id2dyad",
    args: [String(tokenId)],
    onSuccess: (data) => {
      console.log("id2eth", data);
      setDyad(parseInt(data._hex));
    },
  });

  return { refetch, dyad, isLoading, isFetching };
}
