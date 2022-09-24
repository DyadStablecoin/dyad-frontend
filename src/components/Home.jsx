import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useAverageXD } from "../utils/stats";
import Claim from "./Claim";
import NFTs from "./NFTs";

export default function Home() {
  const { address, isConnected } = useAccount();

  const [reload, setReload] = useState(false);
  const [ETH2USD, setETH2USD] = useState(0);

  const xp = useAverageXD(40);
  console.log("xp", xp);

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
    <>
      {isConnected ? (
        <div className="mt-8">
          <Claim
            address={address}
            reload={reload}
            setReload={setReload}
            ETH2USD={ETH2USD}
          />
          <div className="mt-[10rem]">
            <NFTs reload={reload} address={address} ETH2USD={ETH2USD} />
          </div>
        </div>
      ) : (
        <div className="mt-10">Connect your wallet!</div>
      )}
    </>
  );
}
