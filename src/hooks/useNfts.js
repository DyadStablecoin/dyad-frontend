import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useContractReads } from "wagmi";
import useIDs from "./useIDs";
import { useEffect, useState } from "react";

export default function useNfts(dependencies = []) {
  const [nfts, setNfts] = useState();
  const { ids } = useIDs(); // token id

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
      data.map((d, i) => {
        _nfts[ids[i]] = {
          id: parseInt(ids[i]._hex),
          withdrawn: parseInt(d[0]._hex),
          deposit: parseInt(d[1]._hex),
          xp: parseInt(d[2]._hex),
        };
      });
      setNfts(_nfts);
    },
  });

  useEffect(() => {
    refetch();
  }, dependencies);

  return { refetch, nfts };
}
