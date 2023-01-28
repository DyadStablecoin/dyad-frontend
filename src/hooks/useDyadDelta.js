import { CONTRACT_dNFT } from "../consts/contract";
import dNFTABI from "../abi/dNFT.json";
import { useContractRead } from "wagmi";
import { useState } from "react";

export default function useDyadDelta() {
  const [dyadDelta, setDyadDelta] = useState(0);

  useContractRead({
    addressOrName: CONTRACT_dNFT,
    contractInterface: dNFTABI["abi"],
    functionName: "dyadDelta",
    onSuccess: (data) => {
      console.log("dyadDelta", data);
      setDyadDelta(parseInt(data._hex));
    },
  });

  return { dyadDelta };
}
