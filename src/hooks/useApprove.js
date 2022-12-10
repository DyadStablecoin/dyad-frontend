import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { CONTRACT_dNFT, CONTRACT_DYAD } from "../consts/contract";
import dyadABI from "../abi/DYAD.json";

export default function useApprove(amount, onSuccess) {
  const { config, isLoading } = usePrepareContractWrite({
    addressOrName: CONTRACT_DYAD,
    contractInterface: dyadABI["abi"],
    functionName: "approve",
    args: [CONTRACT_dNFT, amount],
  });

  const { write, data } = useContractWrite({
    ...config,
  });

  const { isFetching } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      onSuccess();
    },
  });

  return { write, isLoading, isFetching };
}
