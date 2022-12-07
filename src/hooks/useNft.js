import { useState } from "react";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useContractRead } from "wagmi";

export default function useNft(id) {
  const [nft, setNft] = useState({
    withdrawn: 0,
    deposit: 0,
    xp: 0,
  });

  const { refetch, isLoading, isFetching } = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "idToNft",
    args: [String(id)],
    onSuccess: (data) => {
      setNft({
        withdrawn: parseInt(data[0]._hex),
        deposit: parseInt(data[1]._hex),
        xp: parseInt(data[2]._hex),
      });
    },
  });

  return { refetch, nft, isLoading, isFetching };
}
