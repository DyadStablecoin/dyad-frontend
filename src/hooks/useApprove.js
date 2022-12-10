import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { CONTRACT_dNFT, CONTRACT_DYAD } from "../consts/contract";
import dyadABI from "../abi/DYAD.json";

export default function useApprove(amount) {
  const { config, isLoading } = usePrepareContractWrite({
    addressOrName: CONTRACT_DYAD,
    contractInterface: dyadABI["abi"],
    functionName: "approve",
    args: [CONTRACT_dNFT, amount],
  });

  const { write, data } = useContractWrite({
    ...config,
  });
  console.log("useApprove", data);

  const { isFetching } = useWaitForTransaction({ hash: data?.hash });

  return { write, isLoading, isFetching };
}
