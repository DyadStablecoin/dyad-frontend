export function calcPerformance() {}

export function calcdNFTAvg() {
  return 0;
}

export function calcXpAvg() {
  return 0;
}

export function dyadMultiplier(P, dNFT, dNFTAvg, xp, xpAvg) {
  // TODO: 1 is hardcoded and should be f(E) -> see equations
  return 0.625 * (P * (dNFT / dNFTAvg) * (xp / xpAvg) * 1);
}

export function xpCurve(pL) {
  return Math.log(-pL + 1.002494) / 6 + 1;
}
