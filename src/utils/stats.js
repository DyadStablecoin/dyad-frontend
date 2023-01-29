import { round } from "./currency";
import { toNumber } from "lodash";

export function calcdNFTAvg() {
  return 0;
}

// the higher the better
export function depositRatio(nft) {
  if (toNumber(nft.deposit) === 0) return 100;
  if (toNumber(nft.withdrawn) === 0) return 0;
  return round((nft.withdrawn / nft.deposit) * 100, 2);
}

export function dyadMintAllocation(mintAllocation, nft) {
  if (nft.deposit <= 0) {
    return 0;
  }
  return mintAllocation * (nft.deposit / (nft.deposit + nft.withdrawn));
}

export function dyadBurnLiability(mintAllocation, nft, avgMinted) {
  const limit = 2.0;
  const mintedOverAvMinted = (nft.deposit + nft.withdrawn) / avgMinted;
  const xpMulti = 3.0 - mintAllocation;
  const factor = mintedOverAvMinted >= limit ? limit : mintedOverAvMinted;
  return xpMulti * factor;
}

export function accrueXP(mintAllocation) {
  return 1.0 / mintAllocation;
}
