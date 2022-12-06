import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { CONTRACT_DYAD } from "../consts/contract";
import dyadABI from "../abi/DYAD.json";

export default function useIsApproved(owner, spender, amount) {
  const [isApproved, setIsApproved] = useState(false);

  const { refetch } = useContractRead({
    addressOrName: CONTRACT_DYAD,
    contractInterface: dyadABI["abi"],
    functionName: "allowance",
    args: [owner, spender],
    onSuccess: (data) => {
      const allowance = parseInt(data._hex);
      setIsApproved(allowance / 10 ** 18 >= parseFloat(amount));
    },
  });

  useEffect(() => {
    refetch();
  }, [amount]);

  return { refetch, isApproved };
}
