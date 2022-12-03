import { useState } from "react";
import { useAccount, useBalance, useContractReads } from "wagmi";
import { CONTRACT_dNFT, CONTRACT_DYAD } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import dyadABI from "../abi/DYAD.json";

export function useBalances() {
  const { address } = useAccount();

  const [balances, setBalances] = useState({
    totalSupplyOfNfts: 0,
    balanceOfdNFT: 0,
    balanceOfDyad: 0,
    balanceOfEth: 0,
  });

  const { refetch } = useContractReads({
    contracts: [
      {
        addressOrName: CONTRACT_dNFT,
        contractInterface: dNFTABI["abi"],
        functionName: "totalSupply",
      },
      {
        addressOrName: CONTRACT_dNFT,
        contractInterface: dNFTABI["abi"],
        functionName: "balanceOf",
        args: [address],
      },
      {
        addressOrName: CONTRACT_DYAD,
        contractInterface: dyadABI["abi"],
        functionName: "balanceOf",
        args: [address],
      },
    ],
    onSuccess: (data) => {
      if (data && data[0]) {
        setBalances({
          ...balances,
          totalSupplyOfNfts: parseInt(data[0]._hex),
          balanceOfdNFT: parseInt(data[1]._hex),
          balanceOfDyad: parseInt(data[2]._hex),
        });
      }
    },
  });

  useBalance({
    addressOrName: address,
    onSuccess(data) {
      setBalances({
        ...balances,
        balanceOfEth: parseFloat(data.formatted),
      });
    },
  });

  return { refetch, balances };
}
