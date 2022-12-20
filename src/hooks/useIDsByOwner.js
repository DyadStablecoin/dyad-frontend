import { useAccount, useContractReads } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useState } from "react";
import useNftBalance from "./useNftBalance";

export default function useIDsByOwner(owner) {
  const [ids, setIds] = useState([]);

  const { nftBalance } = useNftBalance();

  let calls = [];
  for (let i = 0; i < nftBalance; i++) {
    calls.push({
      addressOrName: CONTRACT_dNFT,
      contractInterface: dNFTABI["abi"],
      functionName: "tokenOfOwnerByIndex",
      args: [owner, i],
    });
  }

  useContractReads({
    contracts: calls,
    onSuccess: (data) => {
      console.log(data);
      setIds(data);
      // setTokenId(parseInt(data[0]._hex));
    },
  });

  return { ids };
}
