import { useContractRead } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useState } from "react";

export default function useTotalNftSupply() {
  const [totalNftSupply, setTotalNftSupply] = useState(0);

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "totalSupply",
    onSuccess: (data) => {
      console.log("useTotalNftSupply: Fetching total NFT supply");
      setTotalNftSupply(parseInt(data._hex));
    },
  });

  return { totalNftSupply, refetch };
}
