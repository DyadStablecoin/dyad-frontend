import { useProtocolData } from "./useProtocolData";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFT from "../abi/dNFT.json";
import { useContractReads } from "wagmi";
import useIDs from "./useIDs";
import abi from "../consts/abi/dNFTABI.json";
import { useEffect, useState } from "react";

export default function useNfts(id, dependencies) {
  const [nfts, setNfts] = useState([]);
  const { ids } = useIDs();

  let calls = [];
  for (let i = 0; i < ids.length; i++) {
    calls.push({
      addressOrName: CONTRACT_dNFT,
      contractInterface: dNFT["abi"],
      functionName: "idToNft",
      args: ["0"],
    });
  }

  useContractReads({
    contracts: calls,
    onSuccess: (data) => {
      setNfts(data);
    },
  });

  return { nfts };
}
