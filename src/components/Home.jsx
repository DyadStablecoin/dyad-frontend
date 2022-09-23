import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Claim from "./Claim";
import NFTs from "./NFTs";
import NFTsHeader from "./NFTsHeader";

export default function Home() {
  const { address, isConnected } = useAccount();

  const [reload, setReload] = useState(false);

  useEffect(() => {}, [reload]);

  return (
    <div className="mt-8">
      <Claim address={address} reload={reload} setReload={setReload} />
      <div className="mt-20">
        <NFTsHeader />
        <NFTs reload={reload} address={address} />
      </div>
    </div>
  );
}
