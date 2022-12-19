import { useEffect, useState } from "react";

export default function useIsOneNftLiquidatable(nfts) {
  const [isOneLiquidatable, setIsOneLiquidatable] = useState(false);

  useEffect(() => {
    setIsOneLiquidatable(false);

    if (nfts) {
      nfts.map((nft) => {
        if (nft.deposit < 0) {
          setIsOneLiquidatable(true);
          return;
        }
      });
    }
  }, [nfts]);

  return { isOneLiquidatable };
}
