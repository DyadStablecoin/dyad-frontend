import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useContractReads } from "wagmi";
import useIDs from "./useIDs";
import { useState } from "react";

export default function useNfts() {
  const [nfts, setNfts] = useState();
  const { ids } = useIDs();

  let calls = [];
  for (let i = 0; i < ids.length; i++) {
    calls.push({
      addressOrName: CONTRACT_dNFT,
      contractInterface: dNFTABI["abi"],
      functionName: "idToNft",
      args: [String(ids[i])],
    });
  }

  const { refetch } = useContractReads({
    contracts: calls,
    onSuccess: (data) => {
      let _nfts = {};
      console.log("data", data);
      data.map((d, i) => {
        _nfts[ids[i]] = {
          withdrawn: parseInt(d[0]._hex),
          deposit: parseInt(d[1]._hex),
          xp: parseInt(d[2]._hex),
        };
      });
      setNfts(_nfts);
    },
  });

  return { refetch, nfts };
}
