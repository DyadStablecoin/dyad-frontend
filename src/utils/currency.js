import { useEffect, useState } from "react";

export function formatUSD(amount, removeDollarSign = false) {
  // format with commas
  amount = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (removeDollarSign) {
    amount = amount.slice(1);
  }
  return amount;
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
