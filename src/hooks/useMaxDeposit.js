import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import useDyadBalance from "./useDyadBalance";

export default function useMaxDeposit(nft) {
  const { address } = useAccount();
  const { dyadBalance } = useDyadBalance(address);

  const [maxDeposit, setMaxDeposit] = useState(0);

  useEffect(() => {
    dyadBalance > nft.withdrawn
      ? setMaxDeposit(nft.withdrawn)
      : setMaxDeposit(dyadBalance);
  }, [dyadBalance]);

  return { maxDeposit };
}
