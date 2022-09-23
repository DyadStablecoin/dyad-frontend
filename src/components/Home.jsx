import { useAccount } from "wagmi";
import Claim from "./Claim";
import NFTs from "./NFTs";
import NFTsHeader from "./NFTsHeader";
import Row from "./Row";
import TextInput from "./TextInput";

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <div className="mt-8">
      <Claim address={address} />
      <div className="mt-20">
        <NFTsHeader />
        <NFTs address={address} />
      </div>
    </div>
  );
}
