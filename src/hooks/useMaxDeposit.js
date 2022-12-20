import { useEffect, useState } from "react";

export default function useMaxDeposit(nft, dyadBalance) {
  const [maxDeposit, setMaxDeposit] = useState(0);

  useEffect(() => {
    dyadBalance > nft.withdrawn
      ? setMaxDeposit(nft.withdrawn)
      : setMaxDeposit(dyadBalance);
  }, [dyadBalance]);

  return { maxDeposit };
}
