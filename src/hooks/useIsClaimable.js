import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useContractRead } from "wagmi";
import { useEffect, useState } from "react";
import useSyncedBlock from "./useSyncedBlock";

export default function useIsClaimable(tokenId) {
  const [isClaimable, setIsClaimable] = useState(false);
  const { syncedBlock } = useSyncedBlock();

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "idToClaimed",
    args: [String(tokenId), syncedBlock],
    onSuccess: (data) => {
      setIsClaimable(!data);
    },
  });

  useEffect(() => {
    refetch();
  }, [syncedBlock]);

  return { isClaimable };
}
