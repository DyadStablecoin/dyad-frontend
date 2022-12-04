import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useContractReads } from "wagmi";
import useIDs from "./useIDs";
import { useState } from "react";

export default function useNfts() {
  const [nfts, setNfts] = useState();
  const { ids } = useIDs(); // token id

  const [nftsList, setNftsList] = useState();

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
      let _nftsList = [];
      data.map((d, i) => {
        const nftObject = {
          withdrawn: parseInt(d[0]._hex),
          deposit: parseInt(d[1]._hex),
          xp: parseInt(d[2]._hex),
        };
        _nfts[ids[i]] = nftObject;
        _nftsList.push({
          tokenId: ids[i],
          ...nftObject,
        });
      });
      setNfts(_nfts);
      setNftsList(_nftsList);
    },
  });

  return { refetch, nfts, nftsList };
}
