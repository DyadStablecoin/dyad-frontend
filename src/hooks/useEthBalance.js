import { useState } from "react";
import { useAccount, useBalance } from "wagmi";

export default function useEthBalance() {
  const { address } = useAccount();
  const [ethBalance, setEthBalance] = useState(0);

  useBalance({
    addressOrName: address,
    onSuccess(data) {
      setEthBalance(parseFloat(data.formatted));
    },
  });

  return { ethBalance };
}
