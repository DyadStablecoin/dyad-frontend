import { useState, useEffect } from "react";

export default function useEthPrice() {
  const [ethPrice, setEthPrice] = useState(0);

  useEffect(() => {
    async function _ETH2USD() {
      const res = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR"
      );
      const data = await res.json();
      console.log("data", data);
      setEthPrice(data.USD);
    }

    _ETH2USD();
  });

  return { ethPrice };
}
