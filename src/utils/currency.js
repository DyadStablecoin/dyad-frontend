import { useEffect, useState } from "react";

export function formatUSD(amount) {
  // format with commas
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
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
