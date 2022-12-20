import { useAccount } from "wagmi";
import useIDsByOwner from "../hooks/useIDsByOwner";
import useTokenOfOwnerByIndex from "../hooks/useTokenOfOwnerByIndex";
import Claim from "./Claim";
import NFTs from "./NFTs";

export default function Home() {
  const { address } = useAccount();
  useIDsByOwner(address);
  return (
    <>
      <Claim />
      <div className="mt-[1rem] flex justify-center items-center w-full">
        <NFTs />
      </div>
    </>
  );
}
