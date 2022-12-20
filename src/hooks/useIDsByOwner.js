import { useContractReads } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useEffect, useState } from "react";
import useNftBalance from "./useNftBalance";

export default function useIDsByOwner(owner) {
  const [tokenIds, setTokenIds] = useState([]);
  const { nftBalance } = useNftBalance(owner);

  let calls = [];
  for (let i = 0; i < nftBalance; i++) {
    calls.push({
      addressOrName: CONTRACT_dNFT,
      contractInterface: dNFTABI["abi"],
      functionName: "tokenOfOwnerByIndex",
      args: [owner, i],
    });
  }

  const { refetch } = useContractReads({
    contracts: calls,
    onSuccess: (data) => {
      console.log("useIDsByOwner: Fetching ids for", owner);
      setTokenIds(data);
    },
  });

  useEffect(() => {
    refetch();
  }, [nftBalance, owner]);

  return { tokenIds };
}
