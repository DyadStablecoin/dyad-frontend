import { useState } from "react";
import { useBalance } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";

export default function useEthInPool() {
  const [ethInPool, setEthInPool] = useState(0);

  useBalance({
    addressOrName: CONTRACT_dNFT,
    onSuccess: (data) => {
      console.log("data", data);
      setEthInPool(parseFloat(data.formatted));
    },
  });

  return { ethInPool };
}
