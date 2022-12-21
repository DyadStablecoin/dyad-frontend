import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { CONTRACT_dNFT, CONTRACT_DYAD } from "../consts/contract";
import dyadABI from "../abi/DYAD.json";
import { ethers } from "ethers";

export default function useApprove(onSuccess) {
  const { config, isLoading } = usePrepareContractWrite({
    addressOrName: CONTRACT_DYAD,
    contractInterface: dyadABI["abi"],
    functionName: "approve",
    args: [CONTRACT_dNFT, ethers.constants.MaxUint256._hex],
    onError: (error) => {
      console.log("useApprove: Error", error);
    },
  });

  const { write, data } = useContractWrite({
    ...config,
  });

  const { isFetching } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
  });

  return { write, isLoading, isFetching };
}
