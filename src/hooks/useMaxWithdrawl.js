import { useEffect, useState } from "react";
import useAverageTVL from "./useAverageTVL";
import { normalize } from "../utils/currency";

export default function useMaxWithdrawl(nft) {
  const [maxWithdrawl, setMaxWithdrawl] = useState(0);
  const { averageTVL } = useAverageTVL();

  useEffect(() => {
    normalize(nft.deposit) > averageTVL
      ? setMaxWithdrawl(averageTVL)
      : setMaxWithdrawl(normalize(nft.deposit));
  }, [averageTVL, nft.deposit]);

  return { maxWithdrawl };
}
