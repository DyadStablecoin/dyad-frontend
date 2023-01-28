import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useContractRead } from "wagmi";
import { useState } from "react";

export default function useSyncedBlock() {
  const [syncedBlock, setSyncedBlock] = useState(0);

  useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "syncedBlock",
    onSuccess: (data) => {
      setSyncedBlock(parseInt(data._hex));
    },
  });

  return { syncedBlock };
}
