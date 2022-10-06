import { useContractReads } from "wagmi";
import { CONTRACT_dNFT } from "../consts/contract";
import abi from "../consts/abi/dNFTABI.json";
import { dNFT_PRICE } from "../consts/consts";

export function calcPerformance() {}

export function calcdNFTAvg() {
  return 0;
}

export function dyadMultiplier(dNFT, dNFTAvg, xp, xpAvg) {
  // TODO: 1 is hardcoded and should be f(E) -> see equations
  return (dNFT / dNFTAvg) * (xp / xpAvg) * 1;
}

export function xpCurve(pL) {
  return Math.log(-pL + 1.002494) / 6 + 1;
}

// calculate rank
export function useRank(nDNFTs) {
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

  // map index to rank
  var xp = [];

  if (data) {
    data.map((d, i) => {
      if (d) {
        xp.push(parseInt(d._hex));
      }
    });
  }
  console.log("xp", xp);

  return xp;
}

// get TVL
export function useTVL(nDNFTs) {
  nDNFTs = parseInt(nDNFTs);

  let aa = [];
  for (let i = 0; i < nDNFTs; i++) {
    aa.push({
      addressOrName: CONTRACT_dNFT,
      contractInterface: abi,
      functionName: "dyadMinted",
      args: [i],
    });
  }

  const { data } = useContractReads({
    contracts: aa,
  });

  var sum = 0;

  if (data) {
    data.map((d) => {
      if (d) {
        sum += parseInt(d._hex);
      }
    });
  }

  return sum / 10 ** 18;
}

export function dNFTfloor() {
  return dNFT_PRICE;
}

// get average XP
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

  if (data) {
    data.map((d) => {
      if (d) {
        sum += parseInt(d._hex);
      }
    });
  }

  return sum / nDNFTs;
}
