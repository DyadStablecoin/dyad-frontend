import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useContractReads } from "wagmi";
import { useState } from "react";
import { useBalances } from "./useBalances";

export default function useIDs() {
  const { balances } = useBalances();
  const [ids, setIds] = useState([]);

  let calls = [];
  for (let i = 0; i < balances.totalSupplyOfNfts; i++) {
    calls.push({
      addressOrName: CONTRACT_dNFT,
      contractInterface: dNFTABI["abi"],
      functionName: "tokenByIndex",
      args: [i],
    });
  }

  useContractReads({
    contracts: calls,
    onSuccess: (data) => {
      console.log("useIDs: Fetched tokenIDs", data);
      setIds(data);
    },
  });

  return { ids };
}
