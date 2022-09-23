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
      <div className="flex flex-col gap-2 mt-24">
        <div className="flex gap-4 mb-2">
          <div className="ml-6 text-sm">rank</div>
          <div className="ml-10 text-sm">value</div>
          <div className="ml-5 text-sm">performance</div>
          <div className="ml-2 text-sm">minted DYAD</div>
          <div className="ml-[8rem] text-sm">invested DYAD</div>
          <div className="ml-[22rem] text-sm">XP</div>
        </div>
        <Row address={address} tokenId={"0"} />
        <Row address={address} tokenId={"1"} />
        <Row address={address} tokenId={"2"} />
      </div>
    </div>
  );
}
