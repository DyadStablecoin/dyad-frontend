import { useContractReads } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useEffect, useState } from "react";
import useNftBalance from "./useNftBalance";

export default function useIDsByOwner(owner) {
  const [tokenIds, setTokenIds] = useState([]);
  const { nftBalance } = useNftBalance(owner);
  const [calls, setCalls] = useState([]);

  const { refetch } = useContractReads({
    contracts: calls,
    enabled: false,
    onSuccess: (data) => {
      console.log("useIDsByOwner: Fetching ids for", owner, data);
      setTokenIds(data);
    },
  });

  useEffect(() => {
    let _calls = [];
    for (let i = 0; i < nftBalance; i++) {
      _calls.push({
        addressOrName: CONTRACT_dNFT,
        contractInterface: dNFTABI["abi"],
        functionName: "tokenOfOwnerByIndex",
        args: [owner, i],
      });
    }
    setCalls(_calls);
  }, [nftBalance]);

  useEffect(() => {
    calls.length > 0 ? refetch() : setTokenIds([]);
  }, [calls]);

  return { tokenIds };
}
