import { useEffect, useState } from "react";
import { useAccount, useBalance, useContractReads } from "wagmi";
import {
  CONTRACT_dNFT,
  CONTRACT_DYAD,
  CONTRACT_POOL,
} from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import dyadABI from "../abi/DYAD.json";

export function useBalances(dependencies = []) {
  const { address } = useAccount();

  const [balances, setBalances] = useState({
    // global balances
    totalSupplyOfNfts: 0,

    // balances of address
    balanceOfdNFT: 0,
    balanceOfDyad: 0,
    balanceOfEth: 0,

    // pool balances
    totalSupplyOfDyad: 0,
    poolBalanceOfDyad: 0, // this gives us the amount deposited in the pool
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
      {
        addressOrName: CONTRACT_DYAD,
        contractInterface: dyadABI["abi"],
        functionName: "totalSupply",
      },
      {
        addressOrName: CONTRACT_DYAD,
        contractInterface: dyadABI["abi"],
        functionName: "balanceOf",
        args: [CONTRACT_POOL],
      },
    ],
    onSuccess: (data) => {
      if (data && data[0]) {
        setBalances({
          ...balances,
          totalSupplyOfNfts: parseInt(data[0]._hex),
          balanceOfdNFT: parseInt(data[1]._hex),
          balanceOfDyad: parseInt(data[2]._hex),
          totalSupplyOfDyad: parseInt(data[3]._hex),
          poolBalanceOfDyad: parseInt(data[4]._hex),
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

  useEffect(() => {
    refetch();
  }, dependencies);

  return { refetch, balances };
}
