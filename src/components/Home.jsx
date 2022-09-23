import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Claim from "./Claim";
import NFTs from "./NFTs";
import NFTsHeader from "./NFTsHeader";

export default function Home() {
  const { address, isConnected } = useAccount();

  const [reload, setReload] = useState(false);
  const [ETH2USD, setETH2USD] = useState(0);

  useEffect(() => {
    async function _ETH2USD() {
      const res = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR"
      );
      const data = await res.json();
      setETH2USD(data.USD);
    }

    _ETH2USD();
  }, [reload]);

  return (
    <div className="mt-8">
      <Claim
        address={address}
        reload={reload}
        setReload={setReload}
        ETH2USD={ETH2USD}
      />
      {isConnected && (
        <div className="mt-20">
          <NFTsHeader />
          <NFTs reload={reload} address={address} ETH2USD={ETH2USD} />
        </div>
      )}
    </div>
  );
}
