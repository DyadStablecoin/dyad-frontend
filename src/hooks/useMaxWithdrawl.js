import { useEffect, useState } from "react";
import useAverageTVL from "./useAverageTVL";
import { normalize } from "../utils/currency";

export default function useMaxWithdrawl(nft) {
  const [maxWithdrawl, setMaxWithdrawl] = useState(0);
  const { averageTVL } = useAverageTVL();

  useEffect(() => {
    const deposit = normalize(nft.deposit);

    deposit > averageTVL
      ? setMaxWithdrawl(averageTVL)
      : setMaxWithdrawl(deposit);
  }, [averageTVL, nft.deposit]);

  return { maxWithdrawl };
}
