import { useState } from "react";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useContractRead } from "wagmi";

export default function useNft(tokenId) {
  const [nft, setNft] = useState({
    withdrawn: 0,
    deposit: 0,
    xp: 0,
    tokenId: tokenId,
    isLiquidatable: false,
  });

  const { refetch, isLoading, isFetching } = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "idToNft",
    args: [String(tokenId)],
    onSuccess: (data) => {
      setNft({
        xp: parseInt(data[0]._hex),
        deposit: parseInt(data[1]._hex),
        withdrawn: parseInt(data[2]._hex),
        // isActive: data[4],
        tokenId: tokenId,
      });
    },
  });

  return { refetch, nft, isLoading, isFetching };
}
