import { round } from "./currency";

export function calcdNFTAvg() {
  return 0;
}

// the higher the better
export function depositRatio(withdrawn, deposit) {
  if (deposit === 0) return 0;
  return round((withdrawn / deposit) * 100, 2);
}

export function dyadMintAllocation(mintAllocation, nft) {
  if (nft.deposit <= 0) {
    return 0;
  }
  return mintAllocation * (nft.deposit / (nft.deposit + nft.withdrawn));
}

export function dyadBurnLiability(mintAllocation, nft, avgMinted, limit) {
  const mintedOverAvMinted = (nft.deposit + nft.withdrawn) / avgMinted;
  const xpMulti = 3.0 - mintAllocation;

  if (mintedOverAvMinted >= limit) {
    return xpMulti * limit;
  } else {
    return xpMulti * mintedOverAvMinted;
  }
}

export function accrueXP(mintAllocation) {
  return 1.0 / mintAllocation;
}
