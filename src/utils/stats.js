import { useContractReads } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import abi from "../consts/abi/dyadABI.json";

export function calcPerformance() {}

export function calcdNFTAvg() {
  return 0;
}

export function dyadMultiplier(P, dNFT, dNFTAvg, xp, xpAvg) {
  // TODO: 1 is hardcoded and should be f(E) -> see equations
  return 0.625 * (P * (dNFT / dNFTAvg) * (xp / xpAvg) * 1);
}

export function xpCurve(pL) {
  return Math.log(-pL + 1.002494) / 6 + 1;
}

export function getTVL() {
  return 50000000;
}

export function dNFTfloor() {
  return 15000;
}

export function useAverageXP(nDNFTs) {
  nDNFTs = parseInt(nDNFTs);

  let aa = [];
  for (let i = 0; i < nDNFTs; i++) {
    aa.push({
      addressOrName: CONTRACT_dNFT,
      contractInterface: abi,
      functionName: "xp",
      args: [i],
    });
  }

  const { data } = useContractReads({
    contracts: aa,
  });

  var sum = 0;
  console.log(data);

  if (data) {
    data.map((d) => {
      if (d) {
        sum += parseInt(d._hex);
      }
    });
  }

  return sum / nDNFTs;
}
