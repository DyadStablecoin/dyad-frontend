import { useState } from "react";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useContractRead } from "wagmi";

export default function useNft(tokenId) {
  const [nft, setNft] = useState({
    xp: 0,
    deposit: 0,
    withdrawn: 0,
    lastOwnershipChange: 0,
    isActive: false,
    tokenId: tokenId,
  });

  const { refetch, isLoading, isFetching } = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "id2Nft",
    args: [String(tokenId)],
    onSuccess: (data) => {
      setNft({
        tokenId: tokenId,
      });
    },
  });

  return { refetch, nft, isLoading, isFetching };
}
