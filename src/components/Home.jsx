import { useAccount } from "wagmi";
import Claim from "./Claim";
import NFTs from "./NFTs";

export default function Home({ totalSupply, reload, setReload, averageXP }) {
  const { isConnected } = useAccount();

  return (
    <>
      {isConnected ? (
        <div className="mt-8">
          <Claim
            reload={reload}
            setReload={setReload}
            totalSupply={totalSupply}
          />
          <div className="mt-[5rem]">
            <NFTs reload={reload} averageXP={averageXP} />
          </div>
        </div>
      ) : (
        <div className="mt-10">Connect your wallet!</div>
      )}
    </>
  );
}
