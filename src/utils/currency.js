import { useEffect, useState } from "react";
import { ethers } from "ethers";

export function formatUSD(amount, removeDollarSign = false) {
  // format with commas
  amount = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (removeDollarSign) {
    amount = amount.slice(1);
  }
  return amount.slice(0, -3);
}

export function useEthPrice() {
  const [ethPrice, setEthPrice] = useState(0);

  useEffect(() => {
    async function _ETH2USD() {
      const res = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR"
      );
      const data = await res.json();
      setEthPrice(data.USD);
    }

    _ETH2USD();
  });

  return ethPrice;
}

export function round2(value) {
  return Math.round(value * 100) / 100;
}

// thin wrapper around `ethers.utils.parseEther`
export function parseEther(eth) {
  return ethers.utils.parseEther(eth ? String(parseFloat(eth)) : "0");
}
