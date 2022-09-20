import { useAccount } from "wagmi";
import Claim from "./Claim";
import NFTs from "./NFTs";
import Row from "./Row";
import TextInput from "./TextInput";

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <div className="mt-8">
      <Claim />
      {/* <NFTs address={address} /> */}
      <div className="flex flex-col gap-2 mt-32">
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  );
}
