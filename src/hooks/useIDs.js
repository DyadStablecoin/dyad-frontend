import { useProtocolData } from "./useProtocolData";
import { CONTRACT_dNFT } from "../consts/contract";
import abi from "../consts/abi/dNFTABI.json";
import { useContractReads } from "wagmi";
import { useState } from "react";

export default function useIDs() {
  const { protocolData } = useProtocolData();
  const [ids, setIds] = useState([]);

  let calls = [];
  for (let i = 0; i < protocolData.totalSupplyOfNfts; i++) {
    calls.push({
      addressOrName: CONTRACT_dNFT,
      contractInterface: abi,
      functionName: "tokenByIndex",
      args: [i],
    });
  }

  useContractReads({
    contracts: calls,
    onSuccess: (data) => {
      setIds(data);
    },
  });

  return { ids };
}
