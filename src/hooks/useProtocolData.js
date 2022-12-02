import { useState } from "react";
import { useAccount, useContractReads } from "wagmi";
import { CONTRACT_dNFT, CONTRACT_DYAD } from "../consts/contract";
import abi from "../consts/abi/dNFTABI.json";
import dyadABI from "../consts/abi/dNFTABI.json";
import { useTVL, useXPs } from "../utils/stats";

export function useProtocolData() {
  const { address } = useAccount();

  const [protocolData, setProtocolData] = useState({
    totalSupply: 0,
    balanceOfdNFT: 0,
    balanceOfDyad: 0,
  });

  // const tvl = useTVL(protocolData.totalSupply);
  // const xps = useXPs(protocolData.totalSupply);

  const { refetch } = useContractReads({
    contracts: [
      {
        addressOrName: CONTRACT_dNFT,
        contractInterface: abi,
        functionName: "totalSupply",
      },
      {
        addressOrName: CONTRACT_dNFT,
        contractInterface: abi,
        functionName: "balanceOf",
        args: [address],
      },
      {
        addressOrName: CONTRACT_DYAD,
        contractInterface: dyadABI,
        functionName: "balanceOf",
        args: [address],
      },
    ],
    onSuccess: (data) => {
      if (data && data[0]) {
        setProtocolData({
          totalSupply: parseInt(data[0]._hex),
          balanceOfdNFT: parseInt(data[1]._hex),
          balanceOfDyad: parseInt(data[2]._hex),
        });
      }
    },
  });

  return { refetch, protocolData };
}
