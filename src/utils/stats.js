import { round } from "./currency";

export function calcdNFTAvg() {
  return 0;
}

// the higher the better
export function depositRatio(withdrawn, deposit) {
  if (deposit === 0) return 0;
  return round((withdrawn / deposit) * 100, 2);
}

export function dyadMultiplier(dNFT, dNFTAvg, xp, xpAvg) {
  // TODO: 1 is hardcoded and should be f(E) -> see equations
  let multi = (dNFT / dNFTAvg) * (xp / xpAvg) * 1;
  return round(multi, 5);
}

export function xpCurve(pL) {
  return Math.log(-pL + 1.002494) / 6 + 1;
}
