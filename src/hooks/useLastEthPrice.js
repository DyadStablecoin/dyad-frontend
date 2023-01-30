import { useState } from "react";
import { useContractRead } from "wagmi";
import dNFTABI from "../abi/dNFT.json";
import { CONTRACT_dNFT } from "../consts/contract";

export default function useLastEthPrice() {
  const [lastEthPrice, setLastEthPrice] = useState(0);

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "ethPrice",
    onSuccess: (data) => {
      setLastEthPrice(parseInt(data._hex) / 10 ** 8);
    },
  });

  return { refetch, lastEthPrice };
}
