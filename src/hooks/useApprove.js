import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CONTRACT_dNFT, CONTRACT_DYAD } from "../consts/contract";
import dyadABI from "../abi/DYAD.json";

export default function useApprove(amount) {
  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_DYAD,
    contractInterface: dyadABI["abi"],
    functionName: "approve",
    args: [CONTRACT_dNFT, amount],
  });

  const { write } = useContractWrite(config);

  return { write };
}
