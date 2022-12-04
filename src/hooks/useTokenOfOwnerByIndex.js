import { useAccount, useContractReads } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useState } from "react";

export default function useTokenOfOwnerByIndex(index) {
  const [tokenId, setTokenId] = useState();
  const { address } = useAccount();

  useContractReads({
    contracts: [
      {
        addressOrName: CONTRACT_dNFT,
        contractInterface: dNFTABI["abi"],
        functionName: "tokenOfOwnerByIndex",
        args: [address, index],
      },
    ],
    onSuccess: (data) => {
      setTokenId(parseInt(data[0]._hex));
    },
  });

  return { tokenId };
}
