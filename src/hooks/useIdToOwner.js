import { useState } from "react";
import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useContractRead } from "wagmi";

export default function useIdToOwner(id) {
  const [owner, setOwner] = useState();

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "ownerOf",
    args: [String(id)],
    onSuccess: (data) => {
      setOwner(data);
    },
  });

  return { owner };
}
