import { useAccount } from "wagmi";
import Claim from "./Claim";
import NFTs from "./NFTs";
import Row from "./Row";
import TextInput from "./TextInput";

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <div className="mt-8">
      <Claim address={address} />
      {/* <NFTs address={address} /> */}
      <div className="flex flex-col gap-2 mt-32">
        <Row address={address} tokenId={"0"} />
        <Row address={address} tokenId={"1"} />
        <Row address={address} tokenId={"2"} />
      </div>
    </div>
  );
}
