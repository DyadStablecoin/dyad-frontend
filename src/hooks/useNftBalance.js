import { useContractRead } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useState } from "react";

export default function useNftBalance(address) {
  const [nftBalance, setNftBalance] = useState(0);

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "balanceOf",
    args: [address],
    onSuccess: (data) => {
      setNftBalance(parseInt(data._hex));
    },
  });

  return { nftBalance, refetch };
}
