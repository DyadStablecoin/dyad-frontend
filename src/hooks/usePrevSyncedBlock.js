import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useContractRead } from "wagmi";
import { useState } from "react";

export default function usePrevSyncedBlock() {
  const [prevSyncedBlock, setPrevSyncedBlock] = useState(0);

  useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "prevSyncedBlock",
    onSuccess: (data) => {
      setPrevSyncedBlock(parseInt(data._hex));
    },
  });

  return { prevSyncedBlock };
}
