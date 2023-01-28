import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useContractRead } from "wagmi";
import { useEffect, useState } from "react";
import usePrevSyncedBlock from "./usePrevSyncedBlock";

export default function useIsSnipable(tokenId) {
  const [isSnipable, setIsSnipable] = useState(false);
  const { prevSyncedBlock } = usePrevSyncedBlock();
  console.log("prevSyncedBlock", prevSyncedBlock);

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "idToClaimed",
    args: [String(tokenId), prevSyncedBlock],
    onSuccess: (data) => {
      console.log("snipe", data);
      setIsSnipable(!data);
    },
  });

  useEffect(() => {
    refetch();
  }, [prevSyncedBlock]);

  return { isSnipable };
}
